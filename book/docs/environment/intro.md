# Solution environment

The target environment for the deployment of Denim Compute is the [IBM Cloud Pak for Automation](https://www.ibm.com/support/knowledgecenter/SSYHZ8_19.0.x/welcome/kc_welcome_dba_distrib.html) on top of a Kubernetes application management platform.
A requirement for the environment is to provide minimum high-availability configuration.

In the next sections, we detail how to:

- Create the required VMs, using VMware vSphere as the virtualization platform.
- Install the Kubernetes application management platform.
- Deploy the IBACC container to manage the installation of the Cloud Pak components.
- Install the individual DBA components (BAW, ODM, BAI, ...).

## Scripted install and deployment
A collection of Ansible scripts to configure and install platforms, and deploy the ICP4A components are available in the [icp4a-deployment](../index.md#icp4a-deployment-repo) GitHub repository.

