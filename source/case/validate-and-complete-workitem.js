/*
	Case Details Page - Script Action button on Case toolbar
	Validates "prop1" and saves
*/
self = this;

require(["icm/base/Constants","icm/action/Action",
		 "dojo/_base/lang","dojo/string","ecm/widget/dialog/ConfirmationDialog",
		 "icm/model/properties/controller/ControllerManager",
		 "ecm/model/Message",
		 "icm/util/WorkItemHandler"],
	
	function(Constants, Action, lang, stringPkg, Dialog, ControllerManager, EcmMessage, WorkItemHandler){
		
		var coord = self.getActionContext("Coordination")[0];
		console.log(">>> coord self");
		console.dir(coord);
		
		var caseEditable = self.getActionContext("Case")[0];
		var WorkItemEditable = self.getActionContext("WorkItemPage");
				
		console.log(">>> caseEditable");
		console.dir(caseEditable);
		
		var collectionController = ControllerManager.bind(WorkItemEditable[0]);
		// alert("after collectionController");
		collectionController.beginChangeSet();
		
		var prefix = caseEditable.getCaseType().solution.prefix;

		// disable action during execution
		self.executing = true;
		self.setEnabled(false);
		
		
		var today = new Date();
		var todayTimestamp = today.getTime();
						
		var propertyName = prefix + "_DateTimeofLoss";
		var propertyController = collectionController.getPropertyController(propertyName);
		var propertyValue = propertyController.get("value");
		console.log(">>> DateTimeofLoss");
		console.dir(propertyValue);
		var lossTimestamp = Date.parse(String(propertyValue).replace(/[ap]m$/i, ''));
						
		var propertyName2 = prefix + "_DateReported";
		var propertyController2 = collectionController.getPropertyController(propertyName2);
		var propertyValue2 = propertyController2.get("value");
		console.log(">>> DateReported");
		console.dir(propertyValue);
		var reportTimestamp = Date.parse(String(propertyValue2).replace(/[ap]m$/i, ''));
		// unbind caseEditable
		collectionController.endChangeSet();
		ControllerManager.unbind(WorkItemEditable[0]);
			
		coord.step(self.icmBaseConst.COMMIT, 
	        		lang.hitch(self, function(results, next, skip){
	        			self.logInfo("execute", "in commit step callback, results");
	        			self.logInfo("execute", results);
	        			next();
	        		}),
	        		lang.hitch(self, function(errors, next, skip){
	        			self.logInfo("execute", "in commit step errback, errors");
	        			self.logInfo("execute", errors);
						self.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						self.executing = false;
						self.setEnabled(true);
    			        skip();
	        		})
	        	).step(self.icmBaseConst.VALIDATE,
					lang.hitch(self, function (results, next, skip){
						console.log(">>> Validation started");
						// alert("Validation started");

						if (lossTimestamp > todayTimestamp || reportTimestamp > todayTimestamp) {
							if (lossTimestamp > todayTimestamp){
								alert("Invalid Accident Date");
								propertyController.set("invalidMessage", "Accident Date Invalid");
								skip();
							}
							
							if (reportTimestamp > todayTimestamp){
								alert("Invalid Accident Report Date");
								propertyController2.set("invalidMessage", "Report Date Invalid");
								skip();
							}
							
							skip();
							}else{
								next();
								}

	        		}),
	        		lang.hitch(self, function(errors, next, skip){
	        			self.logInfo("execute", "in validate step errback, errors");
	        			self.logInfo("execute", errors);
						self.showErrDialog("actionExecutedFailureVailidate", errors);
						// enable action if failed
						self.executing = false;
						self.setEnabled(true);
    			        skip();
	        		})

	).step(self.icmBaseConst.BEFORECOMPLETE,
	        		lang.hitch(self, function(results, next, skip){
	        			self.logInfo("execute", "in beforeSave step callback, results");
	        			self.logInfo("execute", results);
	        			next();
	        		}),
	        		lang.hitch(self, function(errors, next, skip){
	        			self.logInfo("execute", "in beforeSave step errback, errors");
	        			self.logInfo("execute", errors);
						self.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						self.executing = false;
						self.setEnabled(true);
    			        skip();
	        		})

	        	).step(self.icmBaseConst.COMPLETE,
	        	    lang.hitch(self, function(results, next, skip){
					    //TODO:collect the modified properties and attachments from other page widgets to stored as properties for completeStep.
						// Other page widgets should set these modified properties and attachments in somewhere 
		                //now we change to use work item model to save the modification on work item
	        	    	//WorkItemEditable[0].setSelectedResponse(self.getArgument('item').id);
						
				        WorkItemEditable[0].completeStep(
				        	lang.hitch(self, function(response, fieldErrors) {
								
								//self.logInfo("execute", "Launch work item response:'" + self.getArgument('item').title + "'");
								
								self.publishEvent(
										"icm.WorkItemDispatched",
										{'workItemEditable': WorkItemEditable[0]}
								);
								next();
							}),
							lang.hitch(self, function(response, fieldErrors) {
								// enable action if failed
								self.executing = false;
								self.setEnabled(true);
								skip();
							})
						);
                    }), 
                    lang.hitch(self, function(errors, next, skip){
						self.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						self.executing = false;
						self.setEnabled(true);
    			        skip();
	        		})
	        	).step(self.icmBaseConst.AFTERCOMPLETE,
	        		lang.hitch(self, function(results, next, skip){
	        			self.logInfo("execute", "in afterSave step callback, results");
	        			self.logInfo("execute", results);
						
                        next();
						
						self.broadcastEvent("icm.ClosePage");
	        		}),
	        		lang.hitch(self, function(errors, next, skip){
	        			self.logInfo("execute", "in afterSave step errback, errors");
	        			self.logInfo("execute", errors);
						self.showErrDialog("actionExecutedErr", errors);
						// enable action if failed
						self.executing = false;
						self.setEnabled(true);
    			        skip();
	        		})

	        	).start(context);

	    /**
	     * Helper function to build an appropriate EcmMessage object for the successful work item complete event.
	     */
	    _getEcmMessage = function(msgType, workItemName, stepName) {			
			var ecmMessage = new EcmMessage();
			ecmMessage.number = null;
			ecmMessage.level = 0;//0=info, 2=error
			//get message string from resource bundle
			var s = icm.util.Util.getResourceBundle("StatusBarMessages").completeWorkItemSuccess;
			//substitute variables with actual case values
			var parms = [workItemName, stepName];
			if (s) {
				if (parms && parms.length > 0) {
					s = stringPkg.substitute(s, parms);
				}
			}

			ecmMessage.text = s;
			ecmMessage.explanation = null;
			ecmMessage.userResponse = null;
			ecmMessage.adminResponse = null;
			ecmMessage.messageProductId = "CDEWG"; //icm.util.Util.getResourceBundle("message").MSGPREFIX; // see message.js, key MSGPREFIX
			ecmMessage.backgroundRequest = true;
			return ecmMessage;
		}
	});