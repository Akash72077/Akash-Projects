package Learn;

import java.util.Stack;
public class StackUsingCollectionFrameWork {
    public static void main(String[] args) {
        Stack<Integer> st= new Stack<>();
    st.push(1);
       st.push(2);
       st.push(4);
       st.push(5);
       st.push(7);
       st.push(9);
       st.push(11);
       st.push(13);
       while(!st.isEmpty()){
        System.out.println(st.peek());
        st.pop();
       }
    }
}
