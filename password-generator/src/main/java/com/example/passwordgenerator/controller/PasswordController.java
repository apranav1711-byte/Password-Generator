package com.example.passwordgenerator.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.passwordgenerator.model.PasswordRequest;
import com.example.passwordgenerator.service.PasswordService;

@RestController
@CrossOrigin(origins = "*")
public class PasswordController {

    private final PasswordService service = new PasswordService();

    @PostMapping("/generate")
    public String generate(@RequestBody PasswordRequest request) {
        return service.generatePassword(
                request.length,
                request.lowercase,
                request.uppercase,
                request.numbers,
                request.special,
                request.customWord
        );
    }
}
