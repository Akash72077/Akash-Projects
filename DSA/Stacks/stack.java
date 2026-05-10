import java.util.*;
public class stack {
    static class Stack{
        static ArrayList<Integer> list = new ArrayList<>();
        public static boolean isEmpty(){
            return list.size()==0;
        }
        // push
        public static void  push(int data){
            list.add(data);
        }
        //pop
        public static int pop(){
            int top=list.get(list.size()-1);
            list.remove(list.size()-1);
            return top;
        }
    }
    public static void main(String[] args) {
         //operations of stack :
        // push pop and peek these all are time complexity of O(1)
       
    }
}
