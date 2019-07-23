package com.ibm.gse.dc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Information about the loss, captured during the FNOL
 * 
 * @author PIERREBerlandier
 */
public class Loss {
	//
	// Common loss information
	//
	private Date occuredDateTime; // BPM -> Date-Time of Loss
	private Date reportedDateTime; // BPM -> Date Reported
	private String description; // BPM -> Description Loss/Damage
	private boolean onPrivateProperty; // BPM -> On Private Property
	private Location location; // BPM -> Loss Street/City/State/Zip
	private String weatherCondition; // BPM -> Weather Condition
	//
	// Parties involved (otherParty can be null if the accident only involves the
	// claimant)
	//
	private Party reportingParty;
	private Party otherParty = null;
	//
	// Injuries and property damages
	//
	private List<BodilyInjury> injuries = new ArrayList<BodilyInjury>();
	private List<PropertyDamage> damages = new ArrayList<PropertyDamage>();
	//
	// Witnesses
	//
	private int numberOfWitnesses; // BPM -> derive from "Witness Name"

	public List<PropertyDamage> getDamages() {
		return damages;
	}

	public String getDescription() {
		return description;
	}

	public List<BodilyInjury> getInjuries() {
		return injuries;
	}

	public Location getLocation() {
		return location;
	}

	public int getNumberOfWitnesses() {
		return numberOfWitnesses;
	}

	public Date getOccuredDateTime() {
		return occuredDateTime;
	}

	public Party getOtherParty() {
		return otherParty;
	}

	public Date getReportedDateTime() {
		return reportedDateTime;
	}

	public Party getReportingParty() {
		return reportingParty;
	}

	public String getWeatherCondition() {
		return weatherCondition;
	}

	public boolean isOnPrivateProperty() {
		return onPrivateProperty;
	}

	public void setDamages(List<PropertyDamage> damages) {
		this.damages = damages;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setInjuries(List<BodilyInjury> injuries) {
		this.injuries = injuries;
	}

	public void setLocation(Location accidentLocation) {
		this.location = accidentLocation;
	}

	public void setNumberOfWitnesses(int numberOfWitnesses) {
		this.numberOfWitnesses = numberOfWitnesses;
	}

	public void setOccuredDateTime(Date accidentDateTime) {
		this.occuredDateTime = accidentDateTime;
	}

	public void setOnPrivateProperty(boolean onPrivateProperty) {
		this.onPrivateProperty = onPrivateProperty;
	}

	public void setOtherParty(Party otherParty) {
		this.otherParty = otherParty;
	}

	public void setReportedDateTime(Date reportedDateTime) {
		this.reportedDateTime = reportedDateTime;
	}

	public void setReportingParty(Party reportingParty) {
		this.reportingParty = reportingParty;
	}

	public void setWeatherCondition(String weatherCondition) {
		this.weatherCondition = weatherCondition;
	}
}
