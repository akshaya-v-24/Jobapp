//package com.capgemini.JobBoard.dto;
//
//
//
//import lombok.*;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class AuthResponse {
//    private String token;
//
//	public AuthResponse() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//	public AuthResponse(String token) {
//		super();
//		this.token = token;
//	}
//
//	public String getToken() {
//		return token;
//	}
//
//	public void setToken(String token) {
//		this.token = token;
//	}
//    
//    
//}

package com.capgemini.JobBoard.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long userId;  // Add this field
	public AuthResponse(String token, Long userId) {
		super();
		this.token = token;
		this.userId = userId;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
    
    
}

