package com.ibm.gse.dc;

import java.util.Date;

public class Policy {
	private String number; // BPM -> Policy Number
	private Date effective; // BPM -> Policy Effective Date
	private Date expiration; // BPM -> Policy Expiration Date
	private Date dateOfLastClaim; // BPM -> Date of Last Claim
	private int monthlyPremium; // BPM -> Monthly Premium
	private String vehicleMake; // BPM -> Vehicle Make
	private String vehicleModel; // BPM -> Vehicle Model
	private String vehicleYear; // BPM -> Vehicle Year
	private String salesChannel; // BPM -> Sales Channel
	private String coverage; // BPM -> Coverage
	//
	// Primary policy holder
	//
	private PolicyHolder policyHolder;

	public String getCoverage() {
		return coverage;
	}

	public Date getDateOfLastClaim() {
		return dateOfLastClaim;
	}

	public Date getEffective() {
		return effective;
	}

	public Date getExpiration() {
		return expiration;
	}

	public int getMonthlyPremium() {
		return monthlyPremium;
	}

	public String getNumber() {
		return number;
	}

	public PolicyHolder getPolicyHolder() {
		return policyHolder;
	}

	public String getSalesChannel() {
		return salesChannel;
	}

	public String getVehicleMake() {
		return vehicleMake;
	}

	public String getVehicleModel() {
		return vehicleModel;
	}

	public String getVehicleYear() {
		return vehicleYear;
	}

	public void setCoverage(String coverage) {
		this.coverage = coverage;
	}

	public void setDateOfLastClaim(Date dateOfLastClaim) {
		this.dateOfLastClaim = dateOfLastClaim;
	}

	public void setEffective(Date effective) {
		this.effective = effective;
	}

	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}

	public void setMonthlyPremium(int monthlyPremium) {
		this.monthlyPremium = monthlyPremium;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public void setPolicyHolder(PolicyHolder policyHolder) {
		this.policyHolder = policyHolder;
	}

	public void setSalesChannel(String salesChannel) {
		this.salesChannel = salesChannel;
	}

	public void setVehicleMake(String vehicleMake) {
		this.vehicleMake = vehicleMake;
	}

	public void setVehicleModel(String vehicleModel) {
		this.vehicleModel = vehicleModel;
	}

	public void setVehicleYear(String vehicleYear) {
		this.vehicleYear = vehicleYear;
	}
}
