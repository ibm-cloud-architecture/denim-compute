# Introduction

<img src="./images/denim-compute.png"/>The goal of *Denim Compute* is to provide a reference implementation for a *Digital Business Automation* (DBA) solution on Kubernetes application platforms.

Denim Compute uses a poster child of business automation, the automobile insurance claim processing, and focuses on the capabilities available in the IBM Cloud Pak for Automation to implement it. As of [version 19.0.1](https://www-01.ibm.com/support/docview.wss?uid=ibm10878709) of the Cloud Pak, these capabilities are:

- Workflow, with the Business Automation Workflow (BAW) on CAM component.
- Content Management, with the FileNet Content Manager component.
- Decisions, with the Operational Decision Manager (ODM) component
- Operational Intelligence, with the Business Automation Insights (BAI) component
- Capture, with the Business Automation Content Analyzer (BACA) component

With this reference implementation, we intend to illustrate how the different capabilities of the platform come together through the sample use case to create a holistic automation solution. This includes demonstrating:

- How to install the different components of the Cloud Pak for Automation on a private cloud environment.
- When to use a mix of ad-hoc (Case Management) and sequential activities (BPMN)
- How to implement the hand-shake between Case and BPMN, and the exchange of data elements.
- How a machine learning model can be used in conjunction with ODM to render decisions.
- How to use BAI to monitor business events from decisions and process execution.

Since the Cloud Pak for Automation is on a continuous release schedule, the architecture and implementation of Denim Compute will be aligned with the new features and capabilities of the pak as they become available. So check back often for improvements and extensions in the [What's new](#whats-new) section below.

---

## What's new <a name="whats-new"></a>

### As of 07/12/19
This is the initial release!