package com.akash.jdbcLearning;
import java.sql.*;
public class LaunchApp1 {

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
		
		String sql="INSERT INTO studentinfo (id, sname , sage , scity ) values (2, 'Sai',18, 'Khammam')";
		int rowAffected=statement.executeUpdate(sql);
		//process the result 
		if(rowAffected==0) 
		{
			System.out.println("Unable to insert data");
		}
		else 
		{
			System.out.println("Data Inserted Successfully");
		}
		
		// close the result 
		
		statement.close();
		connect.close();
		
		
	}

}
