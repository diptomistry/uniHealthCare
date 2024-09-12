package com.example.uniMed.security;


import org.glassfish.tyrus.server.Server;

import com.example.uniMed.apis.chat.ChatEndpoint;

import java.util.Scanner;

public class WebSocketServer {

    public static void main(String[] args) {
        Server server = new Server("localhost", 8025, "/ws", null, ChatEndpoint.class);

        try {
            server.start();
            System.out.println("Press any key to stop the server...");
            new Scanner(System.in).nextLine();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stop();
        }
    }
}