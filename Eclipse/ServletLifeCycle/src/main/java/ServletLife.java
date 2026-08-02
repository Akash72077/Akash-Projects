

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ServletLife")
public class ServletLife extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	static 
	{
		System.out.println("Servlet is Loaded....");
	}
	
	public ServletLife() 
	{
		System.out.println("Servlet object is created");
	}

	
	public void init(ServletConfig config) throws ServletException 
	{
		// init method calls only once
		System.out.println("Servlet initialized");
	}

	
	public void destroy() {
		
	}

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		// service method called based on the number of requests
		System.out.println("Service method to handle request and to response back");
	}

}
