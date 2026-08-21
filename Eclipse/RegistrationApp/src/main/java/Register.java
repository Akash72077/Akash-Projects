

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		System.out.println("control in Servlet");
		
		String uname =request.getParameter("uname");
		String emailId =request.getParameter("email");
		String upassword =request.getParameter("password");
		String ucity =request.getParameter("ucity");
		
		// table name is personalInfo
		
		//steps to be followed for connecting database 
		// 1 load and register the driver
		try 
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			String url="jdbc:mysql://localhost:3306/servlet";
			String user="root";
			String password="Akash@12345";
			
			Connection connect=DriverManager.getConnection(url, user, password);
			
			PreparedStatement pstmnt = connect.prepareStatement("Insert into personalInfo(uname ,email , upassword,ucity) "+
			"VALUES(?,?,?,?)");
			
			pstmnt.setString(1,uname);
	
			pstmnt.setString(2,emailId);
			pstmnt.setString(3,upassword);
			pstmnt.setString(4,ucity);
			
			int rowAffected=pstmnt.executeUpdate();
			
			PrintWriter writer=response.getWriter();
			
			if(rowAffected!=0) {
				writer.println("<h1>Registration Success!</h1>");
			}else {
				writer.println("<h1>Registration Failed!</h1>");

			}
			pstmnt.close();
			connect.close();
			//1 : 07 : 05:02
		} 
		catch (ClassNotFoundException e) 
		{
			e.printStackTrace();
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		
	}

}
