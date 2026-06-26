package com.akash.jdbcLearning;
import java.sql.*;
public class LaunchApp4 {

	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		// TODO Auto-generated method stub
		// load and register the driver 
		Class.forName("com.mysql.cj.jdbc.Driver");
		
		// Establish the connection using connection object with get connection by driver manager class
		String url="jdbc:mysql://localhost:3306/jdbclearning";
		String user="root";
		String password="Akash@12345";
		Connection connect =DriverManager.getConnection(url, user , password);
		
		//creating statement 
		Statement  statement = connect.createStatement();
		
		String sql="delete from studentinfo where id=2";
		//execute query
		int rowAffected=statement.executeUpdate(sql);
		
		
		//process result 
		if(rowAffected==0) 
		{
			System.out.println("Deletion failed");
		}
		else 
		{
			System.out.println("Record Deletion Successfully");
		}
		
		
		// close the result 
	
		statement.close();
		connect.close();
		
		
	}

}
