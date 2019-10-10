# Introduction

<img src="./images/denim-compute.png" style="border: 0px"/> The goal of *Denim Compute* is to provide a reference implementation for a *Digital Business Automation* (DBA) solution on Kubernetes application platforms.

Denim Compute relies on the automobile insurance claim processing use case, a poster child of business automation applications, and focuses on the capabilities available in the [IBM Cloud Pak for Automation](https://www.ibm.com/cloud/cloud-pak-for-automation) to implement it. As of [version 19.0.1](https://www-01.ibm.com/support/docview.wss?uid=ibm10878709) of the Cloud Pak, these capabilities are:

- *Workflow*, with the Business Automation Workflow (BAW) component.
- *Content Management*, with the FileNet Content Manager component.
- *Decisions*, with the Operational Decision Manager (ODM) component.
- *Operational Intelligence*, with the Business Automation Insights (BAI) component.
- *Capture*, with the Business Automation Content Analyzer (BACA) component.

With this reference implementation, we intend to illustrate how the different capabilities of the platform come together through the sample use case to create a holistic automation solution. This includes demonstrating:

- How to install the different components of the Cloud Pak for Automation on a private cloud environment.
- When to use a mix of ad-hoc (Case Management) and sequential activities (BPMN).
- How to implement the hand-shake between Case and BPMN, and the exchange of data elements.
- How a machine learning model can be used in conjunction with ODM to render decisions.
- How to use BAI to monitor business events from decisions and process execution.
- How to use BACA to capture data from unstructured documents.

Since the Cloud Pak for Automation is on a continuous release schedule, the architecture and implementation of Denim Compute will be aligned with the new features and capabilities of the pak as they become available. So check back often for improvements and extensions in the [What's new](#whats-new) section below.

---

## What's new <a name="whats-new"></a>

### On 08/30/19
The following features have been added:

- [BACA integration scenario](./usecase/baca-scenario-walkthrough.md): The Denim Compute implementation now demonstrates automatic detection of an uploaded repair shop estimate and extraction of data from it using BACA.

### On 08/08/19
The following features have been added:

- [Cloud Pak deployment on managed OpenShift](./environment/rhos-intro.md): The Denim Compute has been ported and tested on a managed OpenShift cluster on IBM Cloud, and installation of the different components on OpenShift is documented.

- [BAI dashboards for BPMN](./usecase/bai-scenario-walkthrough.md): The Denim Compute implementation now demonstrates the monitoring of BPM business events with complex BAI dashboards.

### On 07/12/19
- Published the initial release.


---

## Documentation
This documentation is built and published MkDocs. To publish the doc locally, you can install [MkDocs](https://www.mkdocs.org/#installation) and the [Material](https://squidfunk.github.io/mkdocs-material/) theme, then follow these steps:

1. Clone this repository: `git clone git@github.com:ibm-cloud-architecture/denim-compute.git`
2. Go to the documentation folder: `cd book`
3. Build and deploy the documentation: `mkdocs serve`
4. View the published documentation in your browser at `http://127.0.0.1:8000/`
