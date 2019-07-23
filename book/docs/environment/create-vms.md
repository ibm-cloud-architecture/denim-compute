This chapter outlines how to create the private cloud cluster VMs, using VMware vSphere server as the sample virtualization platform.
It covers VM creation for the RHEL and Ubuntu Linux distributions.

## Create RHEL VMs

- Go to the directory where you want your VM and right click to get the action menu. 

![](images/01 Create VM.png)

- Select a creation type.

![](images/02 Create New VM.png)

- Enter the name for the VM.

![](images/03 Enter Name.png)

- Select the folder to use.

![](images/04 Select Folder.png)

- Select a compute resource.

![](images/05 Select Compute Resource.png)

- Select a storage location.

![](images/06 Select Storage.png)

- Select compatibility.

![](images/07 Select Compatibility.png)

- Select a host operating system. You can select many operating systems. Here we are selecting RHEL. But, later you will see the screen shots when we selected Ubuntu for other VMs.

![](images/08 Select Guest OS.png)

- Customize the hardware settings specifically CPU, Memory and Hard Disk size. Also, make sure the New Network is set to csplab.

![](images/09 Customize Hardware.png)

- This shows you that you can select thick provisioning (all of the requested disk size is allocated) or thin provisioning (disk size is allocated when it is required). For ICP, its probably best to use thick provisioning especially for the Master nodes. 

![](images/10 Customize Hardware Disk Provisioning.png)

- Click the `Finish` button to begin VM creation.

![](images/11 Ready to Complete.png)

- View the newly created VM.

![](images/12 View Newly Created VM.png)

### Install RHEL

Once you boot the VM for the first time, you will load the RHEL operating system. Review [this link](https://github.com/ibm-cloud-architecture/refarch-privatecloud/blob/master/icp-on-rhel/rhel7-installation-a-sample.md) for a sample of how to do this.

- Select Redhat.

![](images/13 Install Redhat.png)

- Select the operating system version.

![](images/14 Install Redhat Select Version.png)

- Select the language.

![](images/15 Install Redhat Select Language.png)

- Click on the Installation Destination because you want to make sure that you define the file system sizes recommended for the ICP node you are creating.

![](images/16 Install Redhat Setup Installation Destination.png)

- Select the `I will configure partitioning` radio button and then click the `Done` button.

![](images/17 Installation Destination Configure Partitioning.png)

- Click the `+` button and add each file system individually. Depending on what type of ICP node you are provisionng, you can refer to [this link](https://github.com/ibm-cloud-architecture/refarch-privatecloud/blob/master/icp-on-rhel/icp-system-requirements.md) for file system sizings.

![](images/18 Installation Destination Manual Partitioning.png)

- Once all of the file systems are defined, click the `Done` button.

![](images/19 Installation Destination Manual Partitioning Complete.png)

- Click the `Begin Installation` button.

![](images/20 Install Redhat Begin Installation.png)

- Enter the root password and create an admin account.

![](images/21 Install Redhat Enter Root Password.png)

- Here you should create the admin account.

![](images/22 Install Redhat User Creation.png)

- Once the admin account is entered, click the Done button.

![](images/23 Install Redhat User Creation Complete.png)

- Click the `Reboot` button.

![](images/24 Install Redhat Reboot.png)

- Once the VM is rebooted, you can log into it using the IP address shown in the Summary page. Check the filesystem sizes with the df -h command.

![](images/25 Login and Verify File Systems.png)


## Create Ubuntu VMs

![](images/30 Ubuntu vSphere Select Creation Type.png)

![](images/31 Ubuntu vSphere Select a Name and Folder.png)

![](images/32 Ubuntu vSphere Select Compute Resource.png)

![](images/33 Ubuntu vSphere Select Storage.png)

![](images/34 Ubuntu vSphere Select Compatibility.png)

![](images/35 Ubuntu vSphere Select Guest OS.png)

![](images/36 Ubuntu vSphere Customize Hardware.png)

![](images/37 Ubuntu vSphere Ready to Complete.png)

- Now that the VM is created, you can start it.

![](images/40 Ubuntu Start VM.png)

- Once the VM is started, you should open the VM. This will allow you to finish installing the operating system.

![](images/41 Ubuntu Open VM Console.png)

![](images/42 Ubuntu Install Ubuntu 1.png)

![](images/43 Ubuntu Install Ubuntu 2.png)

![](images/48 Ubuntu Select Language.png)

![](images/49 Ubuntu Select Location.png)

![](images/50 Ubuntu Configure the Keyboard 1.png)

![](images/51 Ubuntu Configure the Keyboard 2.png)

![](images/52 Ubuntu Configure the Keyboard 3.png)

![](images/53 Ubuntu Configure the Network.png)

![](images/54 Ubuntu Choose a Mirror 1.png)

![](images/55 Ubuntu Choose a Mirror 2.png)

![](images/56 Ubuntu Choose a Mirror 3.png)

![](images/57 Ubuntu Setup Users and Passwords 1.png)

![](images/58 Ubuntu Setup Users and Passwords 2.png)

![](images/59 Ubuntu Setup Users and Passwords 3.png)

![](images/60 Ubuntu Setup Users and Passwords 4.png)

![](images/61 Ubuntu Configure the Clock.png)

![](images/62 Ubuntu Partition Disks 1.png)

![](images/63 Ubuntu Partition Disks 2.png)

![](images/64 Ubuntu Partition Disks 3.png)

![](images/65 Ubuntu Partition Disks 4.png)

![](images/67 Ubuntu Partition Disks 5.png)

![](images/68 Ubuntu PAM Configuration.png)

![](images/69 Ubuntu Software Selection.png)

![](images/70 Ubuntu GRUB Boot Loader.png)

![](images/71 Ubuntu System Clock Setting.png)

![](images/72 Ubuntu Finish the Install.png)

## Create VM from template

You can convert a VM (if it stopped) to a template. If you are creating multiple Worker nodes for instance, its best to convert one VM to a template and clone all of your VMs from the template. To make a template, right click the VM to get the action menu where you can do this.

Once you have a template, you can clone a VM with it. You right click the template definition and clone to do this.

- Enter the VM name and select a location for the VM.

![](images/86 Template Deploy.png)

- Select a compute resource.

![](images/87 Template Deploy Select Compute Resource.png)

- Select the storage location.

![](images/88 Template Deploy Select Storage.png)

- On the Select Clone Options just click the Next button.

![](images/89 Template Deploy Select Clone Options.png)

- Click the Finish button.

![](images/90 Template Deploy Ready to Complete.png)

## Change the network type

You can view your newly created VM. Notice that the network is still set to VM Network and not csplab.

![](images/91 VM Summary Change Network to CSPLAB.png)

- Right click the VM definition to get the `Action` menu. Select Edit Settings.

![](images/92 VM Edit Settings.png)

- Change Network Adapter 1 to csplab.
 
![](images/93 VM Edit Settings Change Network Adapter.png)

## Post-install

### Change hostname

This command works for RHEL and Ubuntu:

```
hostnamectl set-hostname name
hostnamectl set-hostname dbamc-icp-proxy1.csplab.local
```

### Edit the hosts file

Modify `/etc/hosts` so that the new hostname is added.

### Switch to static IP address

#### On RHEL

- Determine which `ifcfg` configuration file to edit by running the command `ip addr`.
- Look for the entry that matches the current IP address, in this case, it's `ens192`.
- Edit `/etc/sysconfig/network-scripts/ifcfg-ens192` file to change these lines as follows:
```
IPV6INIT=no
BOOTPROTO=static
```
- Append these lines making sure you set IPADDR to the static IP address. 
```
PROXY_METHOD=none
BROWSER_ONLY=no
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6_AUTOCONF=no
IPV6_DEFROUTE=no
IPV6_FAILURE_FATAL=no
IPADDR="static IP Address"
PREFIX=16
GATEWAY=172.16.255.250
DNS1=172.16.0.11
DNS2=172.16.0.17
DOMAIN=csplab.local
```

#### On Ubuntu

Edit `/etc/network/interfaces` and replace line (your iface value may be different):
```
iface ens160 inet dhcp
```
with the following lines, making sure the parameters (address, broadcast, gateway, etc.) match your own system value:

```
iface ens160 inet static
address 172.16.52.220
netmask 255.255.0.0
broadcast 172.16.255.255
gateway 172.16.255.250
dns-nameservers 172.16.0.11 172.16.0.17
dns-search csplab.local
```



