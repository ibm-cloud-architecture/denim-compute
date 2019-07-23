# Miscellaneous notes and findings
Below are a list of random notes (recommendations, gotchas, etc.) regarding the setup of the environment and deployment of the IBM Cloud Pak for Automation.

---

## About VMs

### Nodes IP address range allocation
When assigning IP addresses to the nodes in your cluster, double-check that the range you are using does not overlap with an range that is already allocated to another cluster. It seems obvious, but nothing usually prevents from using an IP that is already used by another VM. So, when that happens, the issue may be difficult to detect as the cluster will seem to operate off and on, in an erratic fashion.

---

## About ICP

### CIDR overlap
The ICP configuration allows the specification of the cluster CIDR range. The lines below show the default definition in the `config.yaml` file.
```
## Network in IPv4 CIDR format
network_cidr: 10.1.0.0/16
```
You must ensure that the CIDR range is not already used by the virtualization manager. Using the same CIDR will likely not cause any issue as long as you don't communicate back to the virtualization manager. However, this is exactly what CAM needs to do to support the provisioning of the BAW VMs.

Note that once ICP has been installed, you will not be able to dynamically change the CIDR (at least in an easy way). You will thus have to re-install ICP with the updated CIDR.

---

## About CAM

Even after BAW is containerized, CAM will still strategic for any VM based offering and will also support OpenShift.

And as long as clients have WAS-ND based offerings, they will need CAM.

Even after Workflow containers are available, customers will still want to or need to use VM (WAS-ND) based versions if they:

* Are using IID/BPEL content [almost 50% of Workflow customers] or 
* They are dependent upon deprecated code which will be removed in the Container version of Workflow and can't yet refactor their apps. 

---

## About BAW

### Installing through CAM (Cloud Pak 19.0.1 and before)

The install of BAW  involves the use of the IBM Cloud Automation Manager (CAM).
While BAW can be installed on manually provisioned VMs, the use of CAM brings the following benefits:

- It facilitates the replication of the install process to multiple environments (e.g. DEV, TEST, PROD, etc.)
- It allows to have the same metering in ICP that the Docker containers use and go to the same dashboard. This means that VPC usage can be tracked for all Docker and non-Docker based offerings within the Cloud Pak.

### BAW/CPE compatibility (BAW 19.0.02 and before)

On-prem BAW is not compatible with the containerized Content Platform Engine (CPE) for various reasons linked to transactionality (e.g. use of Web Service Reliable Messaging). On-prem BAW workflows should thus use the on-prem CPE.

---


