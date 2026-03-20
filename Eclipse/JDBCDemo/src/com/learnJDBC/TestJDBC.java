package com.learnJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestJDBC {

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        
        // Loading MySQL Driver
        Class.forName("com.mysql.cj.jdbc.Driver");

        // Creating connection
        Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306",
                "root",
                "Akash@12345"
        );

        System.out.println("Connection Established Successfully!");

    }
}