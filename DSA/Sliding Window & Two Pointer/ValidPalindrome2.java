
/* Leetcode Problem number 680

Problem statement: Given a string s, return true if the s can be palindrome after deleting at most one character from it.
test cases 
Example 1:

Input: s = "aba"
Output: true

Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.


Example 3:

Input: s = "abc"
Output: false

*/

import java.util.Scanner;
public class ValidPalindrome2 {

    public static boolean isPalindrome(String s, int left, int right){
            // function to validate isPalindrome
            while(left<right){
            if(s.charAt(left)==s.charAt(right)){
                left++;
                right--;
            }else{
                return false;
            }
        }
        // after while loop it returns true
        return true;

    }
    public static boolean ValidPalindrome(String s){

        int left=0;
        int right= s.length()-1;
            while(left<right){
            if(s.charAt(left)==s.charAt(right)){
                left++;
                right--;
            }else{
                return isPalindrome(s, left+1, right)|| isPalindrome(s, left, right-1);
            }
        }
        return true;
    }
    public static void main(String[] args) {
        
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a string to check is palindrome: ");
        String s= sc.nextLine();
        if(ValidPalindrome(s)){
            System.out.println("Given string is Palindrome.");
        }else{
            System.out.println("Given string is not Palindrome.");
        }
        sc.close();
    }
}
