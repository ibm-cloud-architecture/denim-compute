package com.ibm.gse.dc;

/**
 * Policy holder personal information.
 * 
 * @author PIERREBerlandier
 *
 */
public class PolicyHolder {
	private String firstName; // BPM -> Insured FName
	private String lastName; // BPM -> Insured LName
	private Location address; // BPM -> Insured Street, City, State, Zip
	private int monthlyIncome; // BPM -> Insured Monthly Income
	private String education; // BPM -> Insured Education
	private String maritalStatus; // BPM -> Insured Marital Status
	private String employmentStatus; // BPM -> Insured Employment Status

	public Location getAddress() {
		return address;
	}

	public String getEducation() {
		return education;
	}

	public String getEmploymentStatus() {
		return employmentStatus;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public int getMonthlyIncome() {
		return monthlyIncome;
	}

	public void setAddress(Location address) {
		this.address = address;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public void setEmploymentStatus(String employmentStatus) {
		this.employmentStatus = employmentStatus;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public void setMonthlyIncome(int monthlyIncome) {
		this.monthlyIncome = monthlyIncome;
	}
}
