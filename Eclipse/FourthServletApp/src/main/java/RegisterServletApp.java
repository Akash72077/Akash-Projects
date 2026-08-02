import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/Register")
public class RegisterServletApp extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public RegisterServletApp() {
       System.out.println("Servlet Object is created internally by container");
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String name =request.getParameter("uname");
		String city =request.getParameter("ucity");
		System.out.println("Name: "+name);
		System.out.println("City: "+city);
		//PrintWriter Writer = response.getWriter();
		
		response.sendRedirect("/FourthServletApp/success.jsp");
//		Writer.println("<html> <head> <title> Second App </title> </head>");
//		Writer.println("<body bgcolor='cyan'> <h1> <marquee>Hi welcome to my our dynamic app</marquee> </h1> ");
//		Writer.println("<table>");
//		Writer.println("<tr> <th>NAME</th> <th> CITY</th> </tr>");
//		Writer.println("<tr>  <td> "+name+" </td>  <td> "+city+" </td> </tr>");
//		
//		Writer.println("</table></body>");
		
//		Writer.println("</html>");
//		Writer.close();
		
	}

}
