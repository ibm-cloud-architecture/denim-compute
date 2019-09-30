
## Content Engine

- Create GCD and Object Store databases:
```
mkdir -p /data/db2fs
mkdir -p /data/database/config
## copy the GCDDB.sh and OS1DB.sh into folder /data/database/config

export CUR_COMMIT=ON
su - db2inst1 -c "db2set DB2_WORKLOAD=FILENET_CM"
echo "set CUR_COMMIT=$CUR_COMMIT"

chown db2inst1:db2iadm1 /data/database/config/*.sh
chmod 755 /data/database/config/*.sh
chown -R db2inst1:db2iadm1 /data/db2fs
su - db2inst1 -c "/data/database/config/GCDDB.sh GCDDB"
su - db2inst1 -c "/data/database/config/OS1DB.sh OS1DB"
```

- Create PVs in NFS server:
```
mkdir -p /data/persistentvolumes/cpe/configDropins/overrides
mkdir -p /data/persistentvolumes/cpe/logs
mkdir -p /data/persistentvolumes/cpe/cpefnlogstore
mkdir -p /data/persistentvolumes/cpe/bootstrap
mkdir -p /data/persistentvolumes/cpe/textext
mkdir -p /data/persistentvolumes/cpe/icmrules
mkdir -p /data/persistentvolumes/cpe/asa

chown 50001:50000 /data/persistentvolumes/cpe/configDropins
chown 50001:50000 /data/persistentvolumes/cpe/configDropins/overrides
chown 50001:50000 /data/persistentvolumes/cpe/logs
chown 50001:50000 /data/persistentvolumes/cpe/cpefnlogstore
chown 50001:50000 /data/persistentvolumes/cpe/bootstrap
chown 50001:50000 /data/persistentvolumes/cpe/textext
chown 50001:50000 /data/persistentvolumes/cpe/icmrules
chown 50001:50000 /data/persistentvolumes/cpe/asa

mkdir -p /data/persistentvolumes/css/CSS_Server/data
mkdir -p /data/persistentvolumes/css/CSS_Server/temp
mkdir -p /data/persistentvolumes/css/CSS_Server/log
mkdir -p /data/persistentvolumes/css/CSS_Server/config
mkdir -p /data/persistentvolumes/css/indexareas

chown 50001:50000 /data/persistentvolumes/css/CSS_Server/data
chown 50001:50000 /data/persistentvolumes/css/CSS_Server/temp
chown 50001:50000 /data/persistentvolumes/css/CSS_Server/log
chown 50001:50000 /data/persistentvolumes/css/CSS_Server/config
chown 50001:50000 /data/persistentvolumes/css/indexareas

mkdir -p /data/persistentvolumes/cmis/configDropins/overrides
mkdir -p /data/persistentvolumes/cmis/logs

chown 50001:50000 /data/persistentvolumes/cmis/configDropins/overrides
chown 50001:50000 /data/persistentvolumes/cmis/logs
```

- Copy DB2 driver and ECM configuration files into the PVs:
```
cp /opt/ibm/db2/V11.1/java/db2jcc4.jar /data/persistentvolumes/cpe/configDropins/overrides/
cp /opt/ibm/db2/V11.1/java/db2jcc_license_cu.jar /data/persistentvolumes/cpe/configDropins/overrides/
cp cpe/configDropins/overrides/DB2JCCDriver.xml /data/persistentvolumes/cpe/configDropins/overrides/
cp cpe/configDropins/overrides/GCD.xml /data/persistentvolumes/cpe/configDropins/overrides/
cp cpe/configDropins/overrides/ldap_TDS.xml /data/persistentvolumes/cpe/configDropins/overrides/
cp cpe/configDropins/overrides/OBJSTORE.xml /data/persistentvolumes/cpe/configDropins/overrides/
cp cmis/configDropins/overrides/ldap_TDS.xml /data/persistentvolumes/cmis/configDropins/overrides/
cp cmis/configDropins/overrides/ldap_TDS.xml /data/persistentvolumes/cmis/configDropins/overrides/
cp css/cssSelfsignedServerStore /data/persistentvolumes/css/CSS_Server/data
```

- Create the namespace `ecmproject`:
```
oc new-project ecmproject
oc project ecmproject
## Grant Tiller server edit access to current project
oc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"
```

- Configure SCC:
```
oc adm policy add-scc-to-user privileged -z default
```

- Login to Docker and push the CM images:
```
docker login -u $(oc whoami) -p $(oc whoami -t) docker-registry.default.svc:5000
wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh
chmod +x loadimages.sh
./loadimages.sh -p /data/downloads/icp4a/ICP4A19.0.1-ecm.tgz -r docker-registry.default.svc:5000/ecmproject
```

- Configure Docker secret:
```
kubectl create secret docker-registry admin.registrykey --docker-server=docker-registry.default.svc:5000 --docker-username=$(oc whoami) --docker-password=$(oc whoami -t) -n ecmproject
```

- Create PV:
```
oc apply -f cpe-pv.yaml
oc apply -f css-pv.yaml
oc apply -f cmis-pv.yaml
```

- Install Helm charts:
```
helm install ibm-dba-contentservices-3.0.0.tgz --name cpe-prod-release --namespace ecmproject -f cpe-values.yaml
helm install ibm-dba-contentsearch-3.0.0.tgz --name css-prod-release --namespace ecmproject -f css-values.yaml
helm install ibm-dba-cscmis-1.7.0.tgz --name cmis-prod-release --namespace ecmproject -f cmis-values.yaml
```

- Expose Content Platform Engine service:
```
oc apply -f cpe-route.yaml
```

- Complete the [post-deployment task](https://www.ibm.com/support/knowledgecenter/en/SSYHZ8_19.0.x/com.ibm.dba.install/k8s_topics/tsk_deploy_postecmdeployk8s.html)


## Content Navigator

- Create ICNDB: Download the DB scripts from `https://github.com/ibm-ecm/container-navigator` and put the scripts and sql into the folder `/data/database/config`:
```
chown db2inst1:db2iadm1 /data/database/config
chown db2inst1:db2iadm1 /data/database/config/*.sh
chown db2inst1:db2iadm1 /data/database/config/*.sql
chmod 755 /data/database/config/*.sh

su - db2inst1
cd /data/database/config
./createICNDB.sh -n ICNDB -s ICNSCHEMA -t ICNTS -u db2inst1 -a ceadmin
```

- Create PVs in NFS server:
```
mkdir -p /data/persistentvolumes/icn/configDropins/overrides
mkdir -p /data/persistentvolumes/icn/logs
mkdir -p /data/persistentvolumes/icn/plugins
mkdir -p /data/persistentvolumes/icn/viewerlog
mkdir -p /data/persistentvolumes/icn/viewercache
mkdir -p /data/persistentvolumes/icn/aspera

chown 50001:50000 /data/persistentvolumes/icn/configDropins/overrides
chown 50001:50000 /data/persistentvolumes/icn/logs
chown 50001:50000 /data/persistentvolumes/icn/plugins
chown 50001:50000 /data/persistentvolumes/icn/viewerlog
chown 50001:50000 /data/persistentvolumes/icn/viewercache
chown 50001:50000 /data/persistentvolumes/icn/aspera
```

- Copy DB2 drivers and configuration files into PVs:
```
cp /opt/ibm/db2/V11.1/java/db2jcc4.jar /data/persistentvolumes/icn/configDropins/overrides/
cp /opt/ibm/db2/V11.1/java/db2jcc_license_cu.jar /data/persistentvolumes/icn/configDropins/overrides/
cp configDropins/overrides/DB2JCCDriver.xml /data/persistentvolumes/icn/configDropins/overrides/
cp configDropins/overrides/ICNDS.xml /data/persistentvolumes/icn/configDropins/overrides/
cp configDropins/overrides/ldap_TDS.xml /data/persistentvolumes/icn/configDropins/overrides/
```

- Create the namespace `fncnproject`
```
oc new-project fncnproject
oc project fncnproject
## Grant Tiller server edit access to current project
oc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"
```

- Configure SCC:
```
oc adm policy add-scc-to-user privileged -z default
```

- Login to Docker and push FNCN Images:
```
docker login -u $(oc whoami) -p $(oc whoami -t) docker-registry.default.svc:5000
wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh
chmod +x loadimages.sh
./loadimages.sh -p /data/downloads/icp4a/ICP4A19.0.1-fncn.tgz -r docker-registry.default.svc:5000/fncnproject
```

- Configure Docker secret:
```
kubectl create secret docker-registry admin.registrykey --docker-server=docker-registry.default.svc:5000 --docker-username=$(oc whoami) --docker-password=$(oc whoami -t) -n fncnproject
```

- Create PV:
```
oc apply -f pv.yaml
```

- Download and install the Helm chart:
```
wget https://github.com/icp4a/cert-kubernetes/raw/master/NAVIGATOR/helm-charts/ibm-dba-navigator-3.0.0.tgz
helm install ibm-dba-navigator-3.0.0.tgz --name navigator-prod-release --namespace fncnproject -f values.yaml
```

- Expose ICN console service:
```
oc apply -f route.yaml
```

- Complete the [post-deployment tasks](https://www.ibm.com/support/knowledgecenter/en/SSYHZ8_18.0.x/com.ibm.dba.install/k8s_topics/tsk_ecmconfigbank8s.html)


