package com.example.employee;

import com.fasterxml.jackson.annotation.JsonValue;

public enum tof {
	
	HALFDAYLEAVE ("Half-Day Leave"), 
	ONEDAYLEAVE ("One-Day Leave"),
	PRIVILEGELEAVE ("Privilege Leave"),
	SICKLEAVE ("Sick Leave"), 
	MATERNITYLEAVE ("Maternity Leave"),
	PATERNITYLEAVE ("Paternity Leave"),
	SABBATICALLEAVE ("Sabbatical Leave"),
	BEREAVEMENTLEAVE ("Bereavement Leave"),
	MARRIAGELEAVE ("Marriage Leave");
	
	private final String leaveName;
	

	tof(String leaveName){
		this.leaveName=leaveName;
	}
	
	@JsonValue
	public String getLeaveName() {
		return leaveName;
	}
}
