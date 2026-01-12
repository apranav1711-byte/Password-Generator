package com.example.passwordgenerator.service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PasswordService {

    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUM = "0123456789";
    private static final String SPECIAL = "!@#$%^&*()_+-={}[]|:;<>,.?/";

    public String generatePassword(
            int length,
            boolean lowercase,
            boolean uppercase,
            boolean numbers,
            boolean special,
            String customWord
    ) {
        SecureRandom random = new SecureRandom();
        List<Character> password = new ArrayList<>();
        StringBuilder pool = new StringBuilder();

        if (lowercase) {
            pool.append(LOWER);
            password.add(LOWER.charAt(random.nextInt(LOWER.length())));
        }
        if (uppercase) {
            pool.append(UPPER);
            password.add(UPPER.charAt(random.nextInt(UPPER.length())));
        }
        if (numbers) {
            pool.append(NUM);
            password.add(NUM.charAt(random.nextInt(NUM.length())));
        }
        if (special) {
            pool.append(SPECIAL);
            password.add(SPECIAL.charAt(random.nextInt(SPECIAL.length())));
        }

        if (pool.length() == 0) {
            throw new IllegalArgumentException("Select at least one character type");
        }

        while (password.size() < length) {
            password.add(pool.charAt(random.nextInt(pool.length())));
        }

        Collections.shuffle(password);

        StringBuilder result = new StringBuilder();
        for (char c : password) {
            result.append(c);
        }

        if (customWord != null && !customWord.isEmpty()) {
            result.append(customWord);
        }

        return result.toString();
    }
}
