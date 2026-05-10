import java.util.*;
public class StackUsingCollectionFrameWork {
    public static void main(String[] args) {
        Stack<Integer> s= new Stack<>();
    s.push(1);
       s.push(2);
       s.push(4);
       s.push(5);
       s.push(7);
       s.push(9);
       s.push(11);
       s.push(13);
       while(!s.isEmpty()){
        System.out.println(s.peek());
        s.pop();
       }
    }
}
