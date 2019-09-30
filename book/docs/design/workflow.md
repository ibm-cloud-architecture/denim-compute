# Workflow design  

This section covers the design of the Denim Compute workflow using the Business Automation Workflow (BAW) platform. It is recommended to be familiar with [Scenario walkthrough](../usecase/resources/denim-compute-scenario-walkthrough.pdf) in conjunction with this section.

## Case and Process collaboration  
Denim Compute uses the combined capabilities of Case Management and Process flow from Business Automation Workflow in the solution scenario. Case-oriented workflows are typically modeled in [CMMN](https://www.omg.org/spec/CMMN/About-CMMN/) notation while Process-oriented ones use [BPMN](http://www.bpmn.org/) notation.

In order to show the collaboration between the Case and Process aspects we show a BPMN collaboration diagram as a close approximation of how the separation of focus is achieved.

The following two figures show the high level workflow as a BPMN Collaboration with Case ad-hoc activities in one pool and Process directed acyclic graph in the other pool and message exchanges between both as control passes back and forth.

![](images/workflow-design1.png)

![](images/workflow-design2.png)

Within the Case activities there is one special one (highlighted in the image below) that has scope for the duration of the Process it invokes. This is because the manner in which other Case activities are invoked is via property updates that in turn trigger pre-conditions on the activities. In order to update a Case property the Process must be able to reference its parent Case activity which remains in scope.

![](images/workflow-design3.png)

If we look at the Case Builder part of Business Automation Workflow, the highlighted activities match the earlier depiction whereby *Gather Accident Information* is a P8 Process implementation that updates a case property that then triggers the *Initiate Claims Processing* activity which is a BPM Process implementation.

![](images/workflow-design4.png)

The *Initiate Claims Processing* Process shown below is then responsible for co-ordinating both Process steps and communication back to Case to request further ad-hoc activities. Highlighted shows an example of the earlier model's message exchange. In the outbound message it is achieved by using the Javascript API to update a Case property which then triggers the pre-condition of a Case activity. The intermediate receiving message event then represents the return inbound message signaling the ad-hoc activity has finished.

![](images/workflow-design5.png)

Here in Case Builder again are the relevant activities with the first one (*Create Adjuster Report*) implemented as a P8 Process which then triggers the *Signal Adjuster Report Created* implemented as a BPM Process which will then send the message event to the main awaiting process.

Note this was a design decision to use the message pair capabilities in BPM, an alternative would be to implement a step in *Create Adjuster Report* P8 that would need to make a REST call to send the message event.

![](images/workflow-design6.png)

This is the BPM Process implementation of *Signal Adjuster Report Created* with the message send event highlighted.

![](images/workflow-design7.png)

## Mediated BACA integration
A [side scenario](/usecase/baca-scenario-walkthrough/) of the main scenario involves integration with Business Automation Content Analyzer (BACA) in order to automatically detect an uploaded document representing a vehicle repair estimate provided by a repair shop. The document is parsed by BACA and the data extracted to build up an estimate data structure that includes the set of vehicle parts needed to repair the damaged vehicle. In the Case, a case activity named `Process Repair Estimate` is configured to be triggered by the precondition of a document of class `Auto Repair Estimate` being added to the case.
![](images/workflow-design8.png)

The case activity implementation shown below involves integrating to BACA and deciding whether the resulting parsed data is a valid estimate or not. If valid it is then sent as a message event using a publish-subscribe paradigm for interested subscribers to react to the newly available repair estimate.
![](images/workflow-design9.png)

The integration to BACA has to be mediated because BACA provides a generic interface and the captured data contains a lot of details that our BAW business scenario is not interested in.

A typical pattern for implementing a mediation between such business and technical concerns would be to use features of API Connect (APIC) and Application Connect Enterprise (ACE) from the [IBM Cloud Pak for Integration](https://www.ibm.com/cloud/cloud-pak-for-integration). In this scenario, we have opted to use a different approach to the mediation for two reasons:

 - To avoid readers having to obtain licencing for and install another IBM Cloud Pak.
 
 - To illustrate how to develop and deploy a cloud native micro-service to the Red Hat OpenShift Container Platform and then integrate that with components from IBM Cloud Pak for Automation.

After the message is published the subscriber is an in-flight instance of the `Provide Estimates Per Repairer`  process. In that the `user task` has an `interrupting boundary message event` configured with correlation details set (such as the specific `Auto Claim` and the `Vehicle VIN`) so that the specific instance of this process can be identified and the message delivered to it.
![](images/workflow-design10.png)
