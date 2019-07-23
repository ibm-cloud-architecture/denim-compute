package com.ibm.gse.dc;

/**
 * Location (for accident, etc...) Use geo-coding to retrieve information about
 * the location.
 * 
 * Note: LocationType (urban, suburban, rural) can be obtained using the
 * location's county in the Rural Urban Continuum codes table (see
 * https://www.ers.usda.gov/data-products/rural-urban-continuum-codes.aspx#.UYJuVEpZRvY)
 * 
 * @author PIERREBerlandier
 */
public class Location {
	private String street;
	private String zip;
	private String city;
	private String state;

	private float latitude;
	private float longitude;

	public String getCity() {
		return city;
	}

	public float getLatitude() {
		return latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public String getState() {
		return state;
	}

	public String getStreet() {
		return street;
	}

	public String getZip() {
		return zip;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

}
