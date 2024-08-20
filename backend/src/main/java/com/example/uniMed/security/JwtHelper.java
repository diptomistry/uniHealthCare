package com.example.uniMed.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
public class JwtHelper {
      private static final String SECRET_KEY = "allklj9232RKARRJALKDJFINVAadksfLLKJFSLDFKSSLDJFLSKSLNNSFKSLS"; // Replace with your secret key

    public String generateToken(String email) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Set token expiration time (e.g., 1 hour)
        long expMillis = nowMillis + 3600000;
        Date exp = new Date(expMillis);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();



                




    }
}
