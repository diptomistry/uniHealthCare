package com.example.uniMed.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtHelper {
    private static final String SECRET_KEY = "allklj9232RKARRJALKDJFINVAadksfLLKJFSLDFKSSLDJFLSKSLNNSFKSLS"; // Replace with your secret key

    public static Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static boolean validateToken(String token) {
        System.out.println("Token: " + token);
        try {
            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes())).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            return false;
        }
    }

    public String generateToken(String email) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Set token expiration time (e.g., 1 hour)
        long expMillis = nowMillis + 3600000;
        Date exp = new Date(expMillis);
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.builder().expiration(exp).subject(email).issuedAt(now).signWith(key, SignatureAlgorithm.HS256).compact();
        
              
    }
}