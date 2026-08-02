

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Constructor;

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
		System.out.println("Servlet initialized");
	}

	
	public void destroy() {
		
	}

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		System.out.println("Service method to handle request and to response back");
	}

}
