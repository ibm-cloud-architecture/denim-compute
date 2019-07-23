# <img src="./book/docs/images/denim-compute.png" width="90"/>Denim Compute - a Digital Business Automation reference implementation on the IBM Cloud Pak for Automation

This reference implementation uses the IBM Cloud Pak for Automation to exemplify how the different capabilities of the IBM Digital Business Automation platform come together on a container-centric management environment to support the execution of a complex business process. 

You will find the details about the environment, architecture, design and implementation of this end-to-end use case in the [documentation pages](https://ibm-cloud-architecture.github.io/denim-compute/).


---

## Platform install
Cloud Pak for Automation platform install scripts are available in the [ibm-cloud-architecture/icp4a-deployment](https://github.com/ibm-cloud-architecture/icp4a-deployment) GitHub repo.

---

## Documentation
The documentation resides in the [book](https://github.ibm.com/CASE/denim-compute/tree/master/book) folder is published with MkDocs. To publish the doc locally, install [MkDocs](https://www.mkdocs.org/#installation) and the [Material](https://squidfunk.github.io/mkdocs-material/) theme, then follow these steps:

1. Clone this repository: `git clone git@github.ibm.com:CASE/denim-compute.git`
2. Go to the documentation folder: `cd book`
3. Build and deploy the documentation: `mkdocs serve`
4. View the published documentation in your browser at `http://127.0.0.1:8000/`

