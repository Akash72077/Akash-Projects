<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSP WEV APP</title>
</head>
<body>
	<h1>JSP WebApp to generate Dynamic Response</h1>

	<%@ page import="java.util.Date"%>

	<%
	Date date = new Date();

	String name = request.getParameter("uname");
	String ucity = request.getParameter("ucity");
	String age = request.getParameter("age");
	int ageInt = Integer.parseInt(age);

	out.println("Hello " + name);
	out.println("<br>");
	out.println("I know you're from " + ucity);
	out.println("<br>");

	out.println("Today date is :" + date);
	out.println("<br>");
	if(ageInt>=18){
		out.println("Person is eligible to vote");
	}else{
		out.println("Person is not eligible to vote");
	}
	%>
</body>
</html>