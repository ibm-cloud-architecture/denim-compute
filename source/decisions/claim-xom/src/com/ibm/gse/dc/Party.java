package com.ibm.gse.dc;

import java.util.Date;

/**
 * Information on vehicle and driver that are party to the accident.
 * 
 * @author PIERREBerlandier
 *
 */
public class Party {
	//
	// Accident information, specific to this party
	//
	private String purpose; // BPM -> Purpose of Use
	private boolean usedWithPermission; // BPM -> Used with Permission
	private String context; // BPM -> Vehicle Context
	private int vehicleDamageEstimate; // BPM -> Vehicle DAmage Estimate
	//
	// Vehicle driver information
	//
	private String firstName; // BPM -> Drivers FName
	private String lastName; // BPM -> Drivers LName
	private Date driverDOB; // BPM -> Drivers DoB
	private Location driverAddress; // BPM -> Drivers Street/City/State/Zip
	//
	// Vehicle insurance information
	//
	private String insuranceCarrier; // BPM -> Other Vehicle Insurance

	public String getContext() {
		return context;
	}

	public Location getDriverAddress() {
		return driverAddress;
	}

	public Date getDriverDOB() {
		return driverDOB;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getInsuranceCarrier() {
		return insuranceCarrier;
	}

	public String getLastName() {
		return lastName;
	}

	public String getPurpose() {
		return purpose;
	}

	public int getVehicleDamageEstimate() {
		return vehicleDamageEstimate;
	}

	public boolean isUsedWithPermission() {
		return usedWithPermission;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public void setDriverAddress(Location driverAddress) {
		this.driverAddress = driverAddress;
	}

	public void setDriverDOB(Date driverDOB) {
		this.driverDOB = driverDOB;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setInsuranceCarrier(String insuranceCarrier) {
		this.insuranceCarrier = insuranceCarrier;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public void setUsedWithPermission(boolean usedWithPermission) {
		this.usedWithPermission = usedWithPermission;
	}

	public void setVehicleDamageEstimate(int damageEstimate) {
		this.vehicleDamageEstimate = damageEstimate;
	}

}
