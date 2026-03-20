// The word from front side and back side it looks like same
// example madam, noon
public class isPalindrome {
    public static boolean is_Palindrome(String str){
        for(int i=0; i<str.length()/2; i++){
           int n=str.length();
            if(str.charAt(i)!=str.charAt(n-i-1)){
               return false;

            }
        }
        return true;


    }
    public static void main(String[] args) {
        String str="madam";
        
       boolean result=is_Palindrome(str);
        if(result!=false)
        System.out.println("The given string is pallindrome.");
        else
        System.out.println("The given string is not a palindrome.");


    }
}
