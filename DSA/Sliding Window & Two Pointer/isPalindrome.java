import java.util.*;

public class isPalindrome {

    public static boolean isPalindrome(String s){
        int left=0;
        int right=s.length()-1;
        while(left<right){
            if(s.charAt(left)==s.charAt(right)){
                left++;
                right--;
            }else{
                return false;
            }

        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        String s=sc.nextLine();
        if(isPalindrome(s)){
            System.out.println("Given string is Palindrome");
        }else{
            System.out.println("Given string is not Palindrome");
        }
        sc.close();
    }
}
