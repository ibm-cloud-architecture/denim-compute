This chapter details the install activities for the BAW component.

## Software download

- Download **BAW 18.0.0.1** (part number CNTA0ML, CNTA1ML, and CNTA2ML).
- Download the **BAW 19.0.0.1** delta.
- Download the **WAS 8.5.5.15** fixpack.

## Installation

The IBM Knowledge Center BAW install documentation can be found [here](https://www.ibm.com/support/knowledgecenter/SS8JB4/com.ibm.wbpm.imuc.doc/topics/inst_nd_cust_lin.html).

### Linux settings

- Add the following content in the file `/etc/security/limits.conf` on all servers:
```
# - stack - maximum stack size (KB)
root soft stack 32768
root hard stack 32768
# - nofile - maximum number of open files
root soft nofile 65536
root hard nofile 65536
# - nproc - maximum number of processes
root soft nproc 16384
root hard nproc 16384
# - fsize - maximum file size
root soft fsize 6291453
root hard fsize 6291453
```

- Execute the following commands on all the servers:
```
echo 3000 > /proc/sys/net/core/netdev_max_backlog
echo 3000 > /proc/sys/net/core/somaxconn
echo 15 > /proc/sys/net/ipv4/tcp_keepalive_intvl
echo 5  > /proc/sys/net/ipv4/tcp_keepalive_probes
```

### Install software

- Unpack the installation files:
```
gunzip BAW_18_0_0_1_Linux_x86_1_of_3.tar.gz  
gunzip BAW_18_0_0_1_Linux_x86_2_of_3.tar.gz  
gunzip BAW_18_0_0_1_Linux_x86_3_of_3.tar.gz  

tar xvf BAW_18_0_0_1_Linux_x86_1_of_3.tar  
tar xvf BAW_18_0_0_1_Linux_x86_2_of_3.tar  
tar xvf BAW_18_0_0_1_Linux_x86_3_of_3.tar  

unzip 8.5.5-WS-WAS-FP015-part1.zip  
unzip 8.5.5-WS-WAS-FP015-part2.zip  
unzip 8.5.5-WS-WAS-FP015-part3.zip  
```

- Install the Installation Manager:
```
cd /downloads/BAW18001/IM64/tools

./imcl install com.ibm.cic.agent -repositories /downloads/BAW18001/IM64/repository.config -installationDirectory /opt/ibm/IM/eclipse -showVerboseProgress -log IM_Installation.log -acceptLicense
```

- Install BAW
```
cd /opt/ibm/IM/eclipse/tools/

# Install BAW 18.0.0.1
./imcl install com.ibm.bpm.ADV.v85,WorkflowEnterprise.NonProduction com.ibm.websphere.ND.v85,core.feature,ejbdeploy,thinclient,embeddablecontainer,samples,com.ibm.sdk.6_64bit -acceptLicense -installationDirectory /opt/IBM/BPM -repositories /downloads/BAW18001/repository/repos_64bit -properties user.wasjava=java8 -showVerboseProgress -log silentinstall.log

# Install BAW 19.0.0.1 and WAS 8.5.5.15 fix pack
./imcl install com.ibm.websphere.ND.v85 com.ibm.bpm.ADV.v85,WorkflowEnterprise.NonProduction -acceptLicense -installationDirectory /opt/IBM/BPM -repositories /downloads/WAS85515/repository.config,/downloads/BAW19001/workflow.19001.delta.repository.zip -properties user.wasjava=java8 -showVerboseProgress -log silent_update.txt
```

- Verify installation
```
/opt/IBM/BPM/bin/versionInfo.sh -maintenancePackages
```

### Create shared folder

- Create a shared folder for Case Management on the NFS server (shared services VM):
```
mkdir -p /data/casemanagement
```

- Mount the shared folder on all the servers:
```
mount {shared_services_host}:/data/casemanagement /data/casemanagement
```

### Create profiles
Make sure the property `bpm.de.caseManager.networkSharedDirectory` has been set to the shared folder `/data/casemanagement`

```
# Login to the DE server
cd /opt/IBM/BPM/bin
./BPMConfig.sh -create -de Advanced-PC-ThreeClusters-DB2.properties 
/opt/IBM/BPM/profiles/DmgrProfile/bin/startManager.sh

# Login to the node servers
cd /opt/IBM/BPM/bin
./BPMConfig.sh -create -de Advanced-PC-ThreeClusters-DB2.properties 
/opt/IBM/BPM/profiles/Node1Profile/bin/startNode.sh
/opt/IBM/BPM/profiles/Node2Profile/bin/startNode.sh
```

### Create the database
The database scripts can be found in `/opt/IBM/BPM/profiles/DmgrProfile/dbscripts`.

```
db2 -stf CMNDB-Cell/createDatabase.sql  

db2 connect to CMNDB  
db2 -tvf CMNDB-Cell/createSchema_Advanced.sql  
db2 -tvf CMNDB/createSchema_Advanced.sql  
db2 -tvf CMNDB/createSchema_Messaging.sql  
db2 connect reset  

db2 -stf BPMDB/createDatabase.sql  
db2 connect to BPMDB  
db2 -tvf BPMDB/createSchema_Advanced.sql  
db2 -tdGO -vf BPMDB/createProcedure_Advanced.sql  
db2 connect reset  

db2 -stf PDWDB/createDatabase.sql  
db2 connect to PDWDB  
db2 -tvf PDWDB/createSchema_Advanced.sql  
db2 connect reset  

mkdir -p /home/db2inst1/db2inst1/CPEDB/DOSSA/datafs1  
mkdir -p /home/db2inst1/db2inst1/CPEDB/DOSSA/datafs2  
mkdir -p /home/db2inst1/db2inst1/CPEDB/DOSSA/datafs3  
mkdir -p /home/db2inst1/db2inst1/CPEDB/DOSSA/indexfs1  
mkdir -p /home/db2inst1/db2inst1/CPEDB/DOSSA/indexfs2  
mkdir -p /home/db2inst1/db2inst1/CPEDB/DOSSA/lobfs1  
mkdir -p /home/db2inst1/db2inst1/CPEDB/TOSSA/datafs1  
mkdir -p /home/db2inst1/db2inst1/CPEDB/TOSSA/datafs2  
mkdir -p /home/db2inst1/db2inst1/CPEDB/TOSSA/datafs3  
mkdir -p /home/db2inst1/db2inst1/CPEDB/TOSSA/indexfs1  
mkdir -p /home/db2inst1/db2inst1/CPEDB/TOSSA/indexfs2  
mkdir -p /home/db2inst1/db2inst1/CPEDB/TOSSA/lobfs1  
mkdir -p /home/db2inst1/db2inst1/CPEDB/sys  
mkdir -p /home/db2inst1/db2inst1/CPEDB/systmp  
mkdir -p /home/db2inst1/db2inst1/CPEDB/usr  
mkdir -p /home/db2inst1/db2inst1/CPEDB/log  

chmod -R 777 /home/db2inst1/db2inst1/CPEDB  

# replace @DB_DIR@ with /home/db2inst1/db2inst1 in CPEDB/createDatabase_ECM.sql and CPEDB/createTablespace_Advanced.sql
db2 -stf CPEDB/createDatabase_ECM.sql  
db2 connect to CPEDB  
db2 -tvf CPEDB/createTablespace_Advanced.sql  
db2 connect reset  
db2 connect to CPEDB
db2 -tvf CPEDB/createSchema_Advanced.sql  
db2 connect reset  
```

### Bootstrap process server data

```
/opt/IBM/BPM/profiles/DmgrProfile/bin/bootstrapProcessServerData.sh -clusterName AppCluster
```

### Create CM object store
Create a group named `caseAdmin` in the WAS console, and assign `deadmin` to the group, then execute the following script: 
```
/opt/IBM/BPM/profiles/DmgrProfile/bin/wsadmin.sh -user deadmin -password deadmin -host dbamc-icp-ubuntu-baw3.csplab.local -port 8880 -lang jython
print AdminTask.createObjectStoreForContent(['-clusterName', 'AppCluster', '-PEWorkflowSystemAdminGroup', 'caseAdmin','-creationUser','deadmin','-password','deadmin'])
```

### Case Management configuration

#### Prepare access the Case Config Manager UI
Install `xrdp` to be able remote desktop connection to the DMgr node. Commands for Ubuntu are the following:
```
apt-get install xrdp
apt-get install xfce4
echo xfce4-session >~/.xsession
```
- Remove the line `./etc/X11/Xsession` from file `/etc/xrdp/startwm.sh`
- Add the line `startxfce4` in file `/etc/xrdp/startwm.sh`
- Restart the `xrdp` service: `service xrdp restart`


#### Update timeouts
Update the timeout settings to at least 600 seconds:

- Servers > Server Types > WebSphere application servers > Configuration tab > Container Settings > Container Services > Transaction service > Total transaction lifetime timeout
- Servers > Server Types > WebSphere application servers > Configuration tab > Container Settings > Container Services > Transaction service > Maximum transaction lifetime timeout
- Servers > Server Types > WebSphere application servers > Configuration tab > Container Settings > Container Services > ORB service > Request timeout
- Servers > Server Types > WebSphere application servers > Configuration tab > Container Settings > Container Services > ORB service > Locate request timeout
- Resources > JDBC > Data sources > [Content Engine or Case Manager data source name] > Connection Pool properties > Connection timeout
- Resources > JDBC > Data sources > [Content Engine or Case Manager XA data source name] > Connection Pool properties > Connection timeout

#### Run the Case ConfigManager

Run `/opt/IBM/BPM/CaseManagement/configure/configmgr` through the remote desktop connection, then run all tasks in sequence according to [this document](https://www.ibm.com/support/knowledgecenter/SS8JB4/com.ibm.wbpm.imuc.doc/topics/acmin123.html):

- Register the Administration Console for Content Platform Engine (ACCE) Plug-in
- Configure the Case Management Object Stores
- Define the Default Project Area
- Configure Case Integration with IBM Business Automation Workflow
- Deploy the Content Platform Engine Workflow Service
- Register the IBM Business Automation Workflow Plug-in
- Register the Case Management Services Plug-in
- Register the Case Widgets Package
- Register the IBM Business Automation Workflow Case Administration Client Plug-in
- Register Project Area
- Configure Business Rules
- Register the Case Monitor Widgets Package

## Uninstall

### Drop databases
```
su - db2inst1
db2 drop database CMNDB;
db2 drop database BPMDB;
db2 drop database PDWDB;
rm -rf /home/db2inst1/db2inst1/CPEDB
db2 drop database CPEDB;
```

### Stop DE and nodes
```
/opt/IBM/BPM/profiles/Node1Profile/bin/stopNode.sh -username deadmin -password deadmin
/opt/IBM/BPM/profiles/Node2Profile/bin/stopNode.sh -username deadmin -password deadmin
/opt/IBM/BPM/profiles/DmgrProfile/bin/stopManager.sh -username deadmin -password deadmin
```

### Delete profiles on all servers
```
cd /opt/IBM/BPM/bin  
./BPMConfig.sh -delete -profiles Advanced-PC-ThreeClusters-DB2.properties  
rm -rf /opt/IBM/BPM/profiles  
```

## Troubleshooting
The error "The plug-in JAR file was not found at the specified location" occurs when the case management folder is not set to the network directory. To fix the issue, modify the configuration using the following commands (see [this support document](https://www.ibm.com/support/knowledgecenter/SS8JB4/com.ibm.casemgmt.design.doc/acmta062.html)).

```
cd /opt/IBM/BPM/bin  
./BPMConfig.sh -export -profile DmgrProfile -de De1 -outputDir bawconfig/  
./BPMConfig.sh -update -profile DmgrProfile -de De1 -component ContentNavigator -networkDirectory /data/casemanagement  
./BPMConfig.sh -update -profile DmgrProfile -de De1 -component CaseManager -networkDirectory /data/casemanagement
```