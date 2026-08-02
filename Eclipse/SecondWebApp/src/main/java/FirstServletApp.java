

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 a Java program that runs on a web server to handle client requests, 
 process data, and generate dynamic web pages. It acts as a middle layer
  between a user's web browser and a database or server application.
 */

@WebServlet("/firstServlet")
public class FirstServletApp extends HttpServlet {
	
	public FirstServletApp()
	{
		System.out.println("Servlet obj is created Internally by  container");
	}
	
	
	private static final long serialVersionUID = 1L;

	//request object is used when ever we want take something from client
	//respond object is used when ever we want to respond to client
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		
		String uname =request.getParameter("uname");
		String ucity =request.getParameter("ucity");
		
		PrintWriter Writer = response.getWriter();
		Writer.println("Hello "+uname+" I know ur from "+ucity);
		
		Writer.close();
	}

}
