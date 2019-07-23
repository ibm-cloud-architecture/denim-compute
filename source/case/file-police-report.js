var self = this;
 
require(["ecm/model/Teamspace", "ecm/widget/dialog/AddContentItemDialog", "dojo/aspect", "dojo/_base/array", "dojo/_base/lang", "icm/model/properties/controller/ControllerManager"],
  function(Teamspace, AddContentItemDialog, aspect, array, lang, ControllerManager) {
	var caseEdt = self.getActionContext("Case")[0];
	var parentFolder = self.getActionContext("CurrentFolder")[0];
	
	var caseObj = self.getActionContext("Case")[0].caseObject;
    var theCaseTitle = caseObj.caseTitle;
	var theCaseIdentifier = caseObj.caseIdentifier;
	var theCaseObjectId = caseObj.id;
	theCaseObjectId = "{"+theCaseObjectId+"}";
	//alert(" ClaimCaseId: " + theCaseObjectId);
	
    var caseFolder = caseObj.caseFolder;
	// alert("caseFolder:" + caseFolder + " caseObjectId:" + theCaseObjectId);
 
	// Create the add document dialog
 	var addContentItemDialog = new AddContentItemDialog();
	
	var _propagateCaseProps = function() {
		var contentItemPropertiesPane = addContentItemDialog.addContentItemPropertiesPane;

		// Fetch the properties from document properties pane
		var allProps = contentItemPropertiesPane.getPropertiesJSON();
		// alert("allProps: " + allProps);
		// console.log("allProps: " + allProps);

		// Match the doc propertis with case properties, and set value
		var propsCtrl = ControllerManager.bind(caseEdt);
		
		// "allProps" JSON contain properties of document pane, loop each one of them and find corresponding case property
		array.forEach(allProps, function(entry, i) {
    	var propName = entry.name;
		var propValue = entry.value;
		// alert("propName: " + propName + " === propValue: " + propValue);  
		var propCtrl = propsCtrl.getPropertyController(propName);
    	if (propCtrl) {
			var casePropValue = propCtrl.get("value");
			// Convert the case property control's value to case document property control's value
			if (entry.dataType === "xs:boolean") {
				casePropValue = (casePropValue == true) ? 1 : 0;
				} else if (entry.dataType === "xs:timestamp") {
					casePropValue = casePropValue.valueOf();
					}
					if (propName == "DENI1_PolicyNumber") contentItemPropertiesPane.setPropertyValue(propName, casePropValue);
					if (propName == "DENI1_ClaimNumber") contentItemPropertiesPane.setPropertyValue(propName, casePropValue);
			}
		});
		ControllerManager.unbind(caseEdt);
		contentItemPropertiesPane.setPropertyValue("DENI1_ClaimCaseId", theCaseObjectId);
		};
	
	var widgetAttrs = null;
	var widget = self.getWidget();	
	if (widget.parentWidget && widget.parentWidget.getWidgetAttributes) {
   	widgetAttrs = widget.parentWidget.getWidgetAttributes();
	}else {
   	widgetAttrs = widget.getWidgetAttributes();
	}
 
	// Hook to the complete rendering document properties
 	
	aspect.after(addContentItemDialog.addContentItemPropertiesPane, "onCompleteRendering", _propagateCaseProps);
	// console.log("XX");
    addContentItemDialog.show(parentFolder.repository,parentFolder,true,false, null, null, false, null);
	//alert("after aspect.after");
  });
