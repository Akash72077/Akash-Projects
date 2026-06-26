package com.learnJDBC;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.DriverManager;
import java.sql.SQLException;

public class CreateTableJDBC {

    public static void main(String[] args) {

        Connection con = null;
        Statement stmt = null;

        String URL = "jdbc:mysql://localhost:3306/JDBCMySQL";
        String Username = "root";
        String Password = "Akash@12345";

        String query = "CREATE TABLE Test ("
                + "RollNumber INT PRIMARY KEY, "
                + "Name VARCHAR(255), "
                + "Marks INT NOT NULL, "
                + "Grade VARCHAR(21))";

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            con = DriverManager.getConnection(URL, Username, Password);

            stmt = con.createStatement();

            stmt.execute(query);

            System.out.println("Yay! Table Created Successfully");

        } 
        catch (ClassNotFoundException e) {

            System.out.println("Driver not found: " + e.getMessage());

        } 
        catch (SQLException e) {

            System.out.println("SQL Error: " + e.getMessage());

        } 
        finally {

            try {

                if (stmt != null)
                    stmt.close();

                if (con != null)
                    con.close();

                System.out.println("Terminated Successfully");

            } 
            catch (SQLException e) {

                System.out.println("Oops! Some serious issue");

            }
        }
    }
}