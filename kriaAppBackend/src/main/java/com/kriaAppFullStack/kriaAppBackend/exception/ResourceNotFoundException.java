package com.kriaAppFullStack.kriaAppBackend.exception;

import com.kriaAppFullStack.kriaAppBackend.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResponseEntity<ErrorResponse> getErrorResponse() {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setMessage(this.getMessage());

        // Get current timestamp in the desired format
        LocalDateTime timestamp = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedTimestamp = timestamp.format(formatter);
        errorResponse.setTimestamp(formattedTimestamp);

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}