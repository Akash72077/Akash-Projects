package com.learnJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JDBCPreparedStatement {

    public static void main(String[] args) {

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        String URL = "jdbc:mysql://localhost:3306/JDBCMySQL";
        String Username = "root";
        String Password = "Akash@12345";

        String query = "SELECT * FROM students WHERE name = ?";

        try {

            // 1️⃣ Load Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Driver Loaded Successfully");

            // 2️⃣ Create Connection
            con = DriverManager.getConnection(URL, Username, Password);
            System.out.println("Connection Established");

            // 3️⃣ Create PreparedStatement
            ps = con.prepareStatement(query);

            // 4️⃣ Set Parameter
            ps.setString(1, "Sangeetha");

            // 5️⃣ Execute Query
            rs = ps.executeQuery();

            // 6️⃣ Process Result
            while (rs.next()) {

                System.out.println("________________________________");

                int id = rs.getInt("id");
                String name = rs.getString("name");
                String dept = rs.getString("dept");

                System.out.println("Student ID : " + id);
                System.out.println("Student Name : " + name);
                System.out.println("Student Department : " + dept);

                System.out.println("________________________________");
            }

        } catch (ClassNotFoundException e) {

            System.out.println("Driver Not Loaded: " + e.getMessage());

        } catch (SQLException e) {

            System.out.println("SQL Error: " + e.getMessage());

        } finally {

            try {

                if (rs != null)
                    rs.close();

                if (ps != null)
                    ps.close();

                if (con != null)
                    con.close();

                System.out.println("Terminated Successfully");

            } catch (SQLException e) {

                System.out.println("Error closing resources");
            }
        }
    }
}