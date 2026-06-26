package com.learnJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class JDBCPreparedInsert {

    public static void main(String[] args) {

        Connection con = null;
        PreparedStatement ps = null;

        String URL = "jdbc:mysql://localhost:3306/JDBCMySQL";
        String Username = "root";
        String Password = "Akash@12345";

        String query = "INSERT INTO students(id,name,dept) VALUES(?,?,?)";

        try {

            // Load Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Driver Loaded Successfully");

            // Create Connection
            con = DriverManager.getConnection(URL, Username, Password);
            System.out.println("Connection Established");

            // Create PreparedStatement
            ps = con.prepareStatement(query);

            // Set values
            ps.setInt(1, 9);
            ps.setString(2, "Abhinav Bindra");
            ps.setString(3, "Biotechnology");

            // Execute query
            ps.executeUpdate();

            System.out.println("Inserted Successfully");

        } catch (ClassNotFoundException e) {

            System.out.println("Driver error: " + e.getMessage());

        } catch (SQLException e) {

            System.out.println("SQL error: " + e.getMessage());

        } finally {

            try {

                if (ps != null)
                    ps.close();

                if (con != null)
                    con.close();

                System.out.println("Connection Closed");

            } catch (SQLException e) {

                System.out.println("Error closing connection");
            }
        }
    }
}