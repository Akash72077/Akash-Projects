//----------------------- concatentation is the process of adding strings
import java.util.*;
public class concatentation {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the first string: ");
        String firstName =sc.next();
        System.out.println("Enter the second string: ");
        String secondName=sc.next();
        String fullName=firstName+ " "+ secondName;
        System.out.println("The full name is: "+fullName);
        sc.close();
    }
    
}
