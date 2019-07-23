# Denim Compute solution deployment

## Servers
The following server components are involved in the scripted deployment of Denim Compute to your Cloud Pak for Automation environment.
You must update the URLs in the `inventory/group_vars/all.yaml` configuration file to match your cluster deployment. Also make sure that the `ds_file_path` and `app_file_path` are valid and are pointing to the decision and workflow solution artifacts.

### ODM URLs
- ODM Business Console: `{dc_url}/decisioncenter`
- ODM Enterprise Console: `{dc_url}/teamserver`
- ODM Rule Execution Server Console: `{res_url}`
- [ODM Decision Center REST API](https://www.ibm.com/support/knowledgecenter/SSQP76_8.10.x/com.ibm.odm.dcenter.ref.dc/topics/dc-swagger.json)

### BAW URLs
- BAW Workflow Center: `{wc_url}/WorkflowCenter/login.jsp`
- BAW Workflow REST API: `{wc_url}/bpm/explorer/?url=/ops/docs`

### Kibina URLs
- Kibina Console: `{kibana_url}`
- [Kibina REST API](https://www.elastic.co/guide/en/kibana/master/api.html)

## Deploy the decision service
To load the decision service projects to Decision Center and deploy the corresponding RuleApp to the Rule Execution Server, run the following command:
```
ansible-playbook main.yaml -i inventory --tags "deploy_ds"
```

## Load the BPM/Case application
To load the BPM/Case application to the Workflow Center, run the following command:
```
ansible-playbook main.yaml -i inventory --tags "load_case"
```

## Import the BAI dashboards
To import the ODM and BAW dashboard to Kibana, run the following command:
```
ansible-playbook main.yaml -i inventory --tags "import_dashboard"
```