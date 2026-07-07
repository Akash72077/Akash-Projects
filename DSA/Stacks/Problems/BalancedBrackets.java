package Problems;

import java.util.Stack;

public class BalancedBrackets
{
    public  static  boolean Valid(String str){
        int len=str.length();
        if(len%2!=0){
            return  false;
        }
        Stack<Character>st= new Stack<>();
        for(int i=0; i<len; i++){
            if(str.charAt(i)=='{'||str.charAt(i)=='('||str.charAt(i)=='['){
                st.push(str.charAt(i));
            }else{
                if(st.isEmpty()){
                    return false;
                } else if (str.charAt(i)=='}' && st.peek()=='{'||str.charAt(i)==')' && st.peek()=='('||str.charAt(i)==']' && st.peek()=='[') {
                st.pop();
                }
                else {
                    return false;
                }
            }
        }
        return st.isEmpty();

    }
    public static void main(String[] args) {

        String str= "({}){[[]]()}";
        System.out.println(Valid(str));

    }
}
