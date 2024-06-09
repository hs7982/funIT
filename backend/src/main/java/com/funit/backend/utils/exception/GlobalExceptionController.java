package com.funit.backend.utils.exception;

import com.funit.backend.utils.response.ResponseHandler;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@RestControllerAdvice
public class GlobalExceptionController extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        BindingResult bindingResult = ex.getBindingResult();
        Map<String, String> errors = new HashMap<>();
        bindingResult.getAllErrors().forEach(c -> errors.put(((FieldError) c).getField(), c.getDefaultMessage()));
        return ResponseHandler.responseBuilder(
                HttpStatus.BAD_REQUEST,
                "유효성 검사 오류가 발생하였습니다.",
                errors);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleBadRequest(IllegalArgumentException exception) {
        return ResponseHandler.responseBuilder(
                HttpStatus.BAD_REQUEST,
                exception.getMessage(),
                exception.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException exception) {
        return ResponseHandler.responseBuilder(
                HttpStatus.BAD_REQUEST,
                exception.getMessage(),
                null
        );
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<Object> handleUnauthorizedAccessException(UnauthorizedAccessException exception) {
        return ResponseHandler.responseBuilder(
                HttpStatus.UNAUTHORIZED,
                exception.getMessage(),
                null
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException exception) {
        return ResponseHandler.responseBuilder(
                HttpStatus.FORBIDDEN,
                exception.getMessage(),
                null
        );
    }

    @Override
    protected ResponseEntity<Object> handleNoResourceFoundException(NoResourceFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return ResponseHandler.responseBuilder(
                HttpStatus.NOT_FOUND,
                "😶 FunIT에서 해당하는 리소스를 찾지 못했어요.",
                null
        );
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception e, Object body, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        String uri = ((ServletWebRequest) request).getRequest().getRequestURI().toString();

        if (status.is5xxServerError()) {
            log.error("[Error!] {} at {} user-[ {} ] : {} ", status.toString(), uri, request.getRemoteUser(), e.getMessage());
            log.error("예외 스택 추적:", e);
        } else {
            log.warn("[WARN] {} at {} user-[ {} ] : {} ", status.toString(), uri, request.getRemoteUser(), e.getMessage());
        }
        return ResponseHandler.responseBuilder(
                (HttpStatus) status,
                "😓 FunIT에서 요청을 처리하는 중 예기치 못한 오류가 발생하였어요.",
                null
        );
    }
}
