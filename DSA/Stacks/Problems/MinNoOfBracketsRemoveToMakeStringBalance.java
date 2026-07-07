// This problem gives the number of brackets to be removed to make string balanced
package Problems;

import java.util.Scanner;
import java.util.Stack;

public class MinNoOfBracketsRemoveToMakeStringBalance
{
      static int Min(String str){
          int len=str.length();

    Stack<Character> st= new Stack<>();

          for(int i=0; i<len; i++) {
              char ch=str.charAt(i);
              if (ch == '{' || ch == '(' ||ch == '[') {
                  st.push(str.charAt(i));
              } else {
                   if (!st.isEmpty() && (ch== '}' && st.peek() == '{' || ch == ')' && st.peek() == '(' || ch == ']' && st.peek() == '[')) {
                      st.pop();
                  }
                   else {
                       st.push(ch);
                   }
              }
          }
          return st.size();

    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a string: ");
        String str= sc.nextLine();
        System.out.println(Min(str));

        sc.close();
    }
}
