package com.ibm.gse.dc;

/**
 * Claim information.
 * 
 * @author PIERREBerlandier
 */
public class Claim {
	private String number; // BPM -> Claim Number
	private int amount; // BPM -> Damages Estimate Amount
	private Loss loss;

	public int getAmount() {
		return amount;
	}

	public Loss getLoss() {
		return loss;
	}

	public String getNumber() {
		return number;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public void setLoss(Loss loss) {
		this.loss = loss;
	}

	public void setNumber(String number) {
		this.number = number;
	}
}
