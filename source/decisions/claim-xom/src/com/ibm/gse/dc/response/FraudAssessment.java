package com.ibm.gse.dc.response;

import java.util.ArrayList;
import java.util.List;

/**
 * This class is used to return the response from the fraud assessment decision.
 * 
 * @author PIERREBerlandier
 *
 */
public class FraudAssessment {
	private double score;
	private List<String> reasons = new ArrayList<String>();

	public void addReason(String reason) {
		this.reasons.add(reason);
	}

	public List<String> getReasons() {
		return reasons;
	}

	public double getScore() {
		return score;
	}

	public void setReasons(List<String> reasons) {
		this.reasons = reasons;
	}

	public void setScore(double score) {
		this.score = score;
	}
}
