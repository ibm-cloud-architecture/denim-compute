package com.ibm.gse.dc.util;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * Code below provide rough approximations. It needs to be updated to use Java 8 java.time package.
 * @author PIERREBerlandier
 *
 */
public class DateUtil {

	public static Date today() {
		return new Date();
	}

	public static int yearToday()
	{
		Calendar cal = new GregorianCalendar();
		cal.setTime(new Date());
		return cal.get(Calendar.YEAR);
	}
	
	public static int getDaysBetween(Date date1, Date date2) {
		long diffInMillies = date2.getTime() - date1.getTime();
		return (int) java.util.concurrent.TimeUnit.DAYS.convert(diffInMillies,
				java.util.concurrent.TimeUnit.MILLISECONDS);
	}

	public static int getMonthsBetween(Date date1, Date date2) {
		Calendar cal1 = new GregorianCalendar();
		Calendar cal2 = new GregorianCalendar();
		cal1.setTime(date1);
		cal2.setTime(date2);
		int yearsInBetween = cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR);
		int monthsDiff = cal2.get(Calendar.MONTH) - cal1.get(Calendar.MONTH);
		return yearsInBetween * 12 + monthsDiff;

	}

	public static int getYearsBetween(Date date1, Date date2) {
		Calendar cal1 = new GregorianCalendar();
		Calendar cal2 = new GregorianCalendar();
		cal1.setTime(date1);
		cal2.setTime(date2);

		return (cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR));
	}
}
