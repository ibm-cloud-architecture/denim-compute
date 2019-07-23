# Deploying the solution
This chapter shows you how to deploy the different components artifacts of the Denim Compute solution to the ICP cluster where your DBA components are deployed.

## Scripted deployment
Under the `{denim_compute_repo}/solution/scripts` directory, you can find Ansible scripts that automate the deployment of the different solution artifacts (BAW solution, ODM decision service, BAI dashboards.

- To deploy the decision service, use: `ansible-playbook main.yaml -i inventory --tags "deploy_ds"`
- To load the BPM/Case application, use: `ansible-playbook main.yaml -i inventory --tags "load_case"`
- To import the custom BAI dashboards, use: `ansible-playbook main.yaml -i inventory --tags "import_dashboard"`



