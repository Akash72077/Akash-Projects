package com.akash.jdbcLearning;
import java.sql.*;
public class LaunchApp2 {

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
		
		//execute query
		
		String sql="update studentinfo set sage=25 where id=2;";
		int rowAffected=statement.executeUpdate(sql);
		//process the result 
		if(rowAffected==0) 
		{
			System.out.println("Updation failed");
		}
		else 
		{
			System.out.println("Update Successfully");
		}
		 
		// close the result 
		
		statement.close();
		connect.close();
		
		
	}

}
