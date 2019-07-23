# Running the solution

## Deploy the case solution in Workflow Center
- Login to Workflow Center and open the Case Solution named `Denim Compute Auto Claims`:

![Open Case solution](images/open-case-solution.png "Open Case solution")

- Click the deploy icon in the upper-right corner of the Case Builder:

![Deploy Case solution](images/deploy-case-solution.png "Deploy Case solution")

##Create Case security configuration

- In the `Workflow Center`select the solution and click the contextual menu and then `Advanced`.

![](images/case-security1.png)

- With the `Denim Compute` solution selected click `Actions`, then `Manage` and then `Security Configuration`.

![](images/case-security2.png)

- Select the option to `Create a security configuration` and click `Next`.

![](images/case-security3.png)

- Provide a `Security manifest name` and click `Next`.

![](images/case-security4.png)

- Set permissions against the security `Roles` (in this example all permissions are assigned to each `Role`) and click `Next`.

![](images/case-security5.png)

- You can then set the adminstrators, if you want you can `Add` others.

![](images/case-security6.png)

- In the `Add Users and Groups` modal dialogue you can add users or groups. You start typing partial names and then click the magnifying glass icon to find matching users that appear in the `Available` section. You can then use the arrows to move between `Available` and `Selected` and when done you click `Add` to complete. When done with this section click `Next` to continue.

![](images/case-security7.png)

- Next you map groups and users to the Case `Roles`. Select each `Role` and click `Add` then follow the earlier instructions for how to find and assign users and groups.

![](images/case-security8.png)

- In this example we have just added a default user to the `Claim Intake Services` `Role`. You repeat these steps for the other `Roles`.

![](images/case-security9.png)

- Here is the final situation were example users are added to each `Role` (if you want a more realistic scenario you should setup different users and groups and assign them to the `Roles`). Click `Next` when done with this section.

![](images/case-security10.png)

- Now you can check the box next to `Apply the security configuration` and click `Apply`.

![](images/case-security11.png)

- You should get confirmation that the security configuration was successfully applied (you can then `Close` this dialog).

![](images/case-security12.png)

- Note if you ever need to review or change the security configuration settings you can launch it again and choose the `Edit a security configuration` option as shown here.

![](images/case-security13.png)

##Create BPM user groups

- The solution has a number of BPM `Teams` defined that need to map to users and groups. To do that launch the `Process Admin Console` and then select `Server Admin` section. Within that select `User Management` and `Group Management` and type `denim` in `Select Group to Modify` and you should see the groups that have been created as a result of the `Team` definitions.

![](images/bpm-user-groups1.png)

- You then need to assign users and groups for your environment against those pre-defined groups. Here is an example were we have assigned a number of users to the `denim-adjusters` group.

![](images/bpm-user-groups2.png)

##Configure servers 

- The solution integrates to ODM and ECM by using defined `Servers`. By default these are mapped to the environment the IBM team used in testing. You have to now re-map these to your own environment based on how you configured it in the [Environment](../../environment/intro) section. To do this you must first ensure the deployed BAW solition is activated. Select it in `Workflow Center` and click the `View Details` icon in the lower left corner of the tile.

![](images/config-servers1.png)

- Next choose the `Snapshots` section, select your snapshot and from the contextual menu you `Activate` it.

![](images/config-servers2.png)

- After this you can now go to the `Process Admin Console` and you should see the snapshot in the list of `Installed Apps`.

![](images/config-servers3.png)

- You click on the snapshot and then select the `Servers` section and you should see the two server definitions used (`DenimODMServer` for the referenced ODM Sever and `IBMBAW` for the referenced ECM server).

![](images/config-servers4.png)

- You should change the settings for the respective servers to match how you installed your environment (the `Hostname`, `Port` and user credentials need to be configured).

![](images/config-servers5.png)