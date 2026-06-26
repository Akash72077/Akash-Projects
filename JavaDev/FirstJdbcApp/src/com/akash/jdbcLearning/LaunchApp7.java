package com.akash.jdbcLearning;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;


public class LaunchApp7 {

	public static void main(String[] args) {
		
		Connection connect= null;
		PreparedStatement preparedstatement=null;
		try {
			
			connect=jdbcUtil.getConnection();
			String sql="delete from  studentinfo where id=?";
		preparedstatement=	connect.prepareStatement(sql);
		
		Scanner sc= new Scanner(System.in);
		System.out.println("Please enter info that needs to be Updated");
		System.out.println("Kindly enter your id: ");
		Integer id=sc.nextInt();
  		
//		preparedstatement.setInt(1, age);
		preparedstatement.setInt(1, id);
		
		int rowsAffected=preparedstatement.executeUpdate();
		
		if
		(rowsAffected==0)
		{
			System.out.println("Unable to delete the data");
		}
		else
		{
			System.out.println("Data Deleted successfully");
		}
		
			
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
		catch(Exception e) {
		e.printStackTrace();
		}
		finally
		{	
			// close the result 
			try {
			jdbcUtil.closeConnection(connect, preparedstatement);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
