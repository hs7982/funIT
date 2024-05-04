package com.funit.backend.utils.exception;

public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException(String msg) {
        super(msg);
    }
}
