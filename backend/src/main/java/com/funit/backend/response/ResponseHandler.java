package com.funit.backend.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;

public class ResponseHandler {
    public static ResponseEntity<Object> responseBuilder(HttpStatus httpStatus, String message, Object responseObject) {
        LinkedHashMap<String, Object> response = new LinkedHashMap<>();
        response.put("httpStatus", httpStatus);
        response.put("message", message);
        response.put("data", responseObject);
        return ResponseEntity.status(httpStatus).body(response);
    }
}
