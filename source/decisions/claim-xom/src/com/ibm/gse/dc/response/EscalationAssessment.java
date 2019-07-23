package com.ibm.gse.dc.response;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is used to return the response from the escalation condition
 * review decision.
 * 
 * @author PIERREBerlandier
 *
 */
public class EscalationAssessment {
	private boolean required;
	private List<String> reasons = new ArrayList<String>();

	public void addReason(String reason) {
		this.reasons.add(reason);
	}

	public List<String> getReasons() {
		return reasons;
	}

	public boolean isRequired() {
		return required;
	}

	public void setReasons(List<String> reasons) {
		this.reasons = reasons;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}
}
