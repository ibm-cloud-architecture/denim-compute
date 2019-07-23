package com.ibm.gse.dc;

/**
 * Record of an injured person who is part of the accident (see Involvement
 * enum).
 * 
 * @author PIERREBerlandier
 */
public class BodilyInjury {
	private String involvement; // BPM -> Injured Involvement
	private String extent; // BPM -> N/A

	public String getExtent() {
		return extent;
	}

	public String getInvolvement() {
		return involvement;
	}

	public void setExtent(String extent) {
		this.extent = extent;
	}

	public void setInvolvement(String involvement) {
		this.involvement = involvement;
	}
}
