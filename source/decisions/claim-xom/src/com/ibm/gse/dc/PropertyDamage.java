package com.ibm.gse.dc;

import java.util.List;

/**
 * Record of collateral property damage resulting the accident, outside of the
 * damage to the vehicles from the parties.
 * 
 * @author PIERREBerlandier
 */
public class PropertyDamage {
	private int estimatedAmount;

	public static int totalEstimatedAmount(List<PropertyDamage> damages) {
		int total = 0;
		if (damages != null) {
			for (PropertyDamage damage : damages) {
				total += damage.estimatedAmount;
			}
		}
		return total;
	}

	public int getEstimatedAmount() {
		return estimatedAmount;
	}

	public void setEstimatedAmount(int estimatedAmount) {
		this.estimatedAmount = estimatedAmount;
	}
}
