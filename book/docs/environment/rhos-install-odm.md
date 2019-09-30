 
- Create namespace `odmproject`:
```
oc new-project odmproject
oc project odmproject
## Grant the tiller server edit access to current project
oc adm policy add-role-to-user edit "system:serviceaccount:tiller:tiller"
```

- Update SCC user:
```
oc adm policy add-scc-to-user privileged -z default
```

- Login to Docker and push the ODM images:
```
docker login -u $(oc whoami) -p $(oc whoami -t) docker-registry.default.svc:5000
wget https://raw.githubusercontent.com/icp4a/cert-kubernetes/19.0.1/scripts/loadimages.sh
chmod +x loadimages.sh
./loadimages.sh -p /data/downloads/icp4a/ICP4A19.0.1-odm.tgz -r docker-registry.default.svc:5000/odmproject
```

- Create LDAP secret:
```
oc create secret generic odm-prod-release-odm-ldap --from-file=ldap-configurations.xml=ldap-configurations.xml --from-file=webSecurity.xml=webSecurity.xml --type=Opaque
```

- Create BAI Event secret:
```
kubectl create secret generic odm-prod-release-odm-bai-event --from-file=plugin-configuration.properties
```

- Download and install the Helm chart:
```
wget https://github.com/icp4a/cert-kubernetes/raw/19.0.1/ODM/helm-charts/ibm-odm-prod-2.2.0.tgz
helm install ibm-odm-prod-2.2.0.tgz --name odm-prod-release --namespace odmproject -f values.yaml
```

- Expose ODM services:
```
oc create -f route.yaml
```



