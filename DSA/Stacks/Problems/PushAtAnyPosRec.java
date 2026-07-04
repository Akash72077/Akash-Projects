package Problems;

import java.util.*;
public class PushAtAnyPosRec {
    public static void pushAtAnyPosRec(Stack<Integer>s, int data, int pos){
        if(pos==0){
            s.push(data);
            return;
        }
        int top= s.pop();
        pushAtAnyPosRec(s, data, pos-1);
        s.push(top);
    }
    public static void main(String[] args) {
        Stack<Integer> s= new Stack<>();
        s.push(1);
        s.push(2);
        s.push(3);
        s.push(4);
        s.push(5);
        pushAtAnyPosRec(s, 11, 1);
        while(!s.isEmpty()){
            System.out.print(s.pop()+" ");
        }
    }
}
