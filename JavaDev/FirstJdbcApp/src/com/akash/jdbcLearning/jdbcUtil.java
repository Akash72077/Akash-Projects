package com.akash.jdbcLearning;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class jdbcUtil {

	static
	{
		// load and register the driver 
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
		
	}
	public static Connection getConnection() throws SQLException
	{
		
		
		// Establish the connection using connection object with get connection by driver manager class
		String url="jdbc:mysql://localhost:3306/jdbclearning";
		String user="root";
		String password="Akash@12345";
		 return DriverManager.getConnection(url, user , password);
	}
	public static void closeConnection(Connection connect, Statement statement) throws SQLException 
	{
		statement.close();
		connect.close();
	}
}
