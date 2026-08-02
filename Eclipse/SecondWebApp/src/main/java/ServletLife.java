

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class ServletLife
 */
@WebServlet("/ServletLife")
public class ServletLife extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	public void init(ServletConfig config) throws ServletException {

	}

	
	public void destroy() {

	}

	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
