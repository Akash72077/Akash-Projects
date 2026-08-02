

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/ServletApp")
public class ServletApp extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	System.out.println("Control in servlet/controller");	
			
	String name =request.getParameter("uname");
	String city =request.getParameter("ucity");
	
	if(name.equals("Akash") && city.equals("Hyderabad")) 
	{
		System.out.println("Success! Correct person is logged in");
	}
	else
	{
		System.out.println("Invalid details!, please try again with correct details.");
	}
		
	}

	
	

}
