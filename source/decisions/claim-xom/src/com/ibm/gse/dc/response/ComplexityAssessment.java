package com.ibm.gse.dc.response;

/**
 * This class is used to return the response from the segmentation decision.
 * 
 * @author PIERREBerlandier
 *
 */
public class ComplexityAssessment {
	public static enum Complexity {
		Low, Medium, High
	}

	private int injuryComponent = 0;
	private int damageComponent = 0;

	private int othersComponent = 0;
	private int rawScore;

	private int normalizedScore;

	private Complexity complexity;

	public void addToDamageComponent(int value) {
		damageComponent += value;
	}

	public void addToInjuryComponent(int value) {
		injuryComponent += value;
	}

	public void addToOthersComponent(int value) {
		othersComponent += value;
	}

	public Complexity getComplexity() {
		return complexity;
	}

	public int getDamageComponent() {
		return damageComponent;
	}

	public int getInjuryComponent() {
		return injuryComponent;
	}

	public int getNormalizedScore() {
		return normalizedScore;
	}

	public int getOthersComponent() {
		return othersComponent;
	}

	public int getRawScore() {
		return rawScore;
	}

	public void setComplexity(Complexity complexity) {
		this.complexity = complexity;
	}

	public void setDamageComponent(int damageComponent) {
		this.damageComponent = damageComponent;
	}

	public void setInjuryComponent(int value) {
		this.injuryComponent = value;
	}

	// Additional methods

	public void setNormalizedScore(int normalizedScore) {
		this.normalizedScore = normalizedScore;
	}

	public void setOthersComponent(int othersComponent) {
		this.othersComponent = othersComponent;
	}

	public void setRawScore(int rawScore) {
		this.rawScore = rawScore;
	}

}
