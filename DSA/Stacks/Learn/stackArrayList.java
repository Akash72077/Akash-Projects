package Learn;

import java.util.*;
public class stackArrayList {
   public static class Stack{
        static ArrayList<Integer> list = new ArrayList<>();
        // we cannot implement stack using arrays because of its limitations like fixed size 
        public boolean isEmpty(){
            return list.size()==0;
        }
        // push
        public  void  push(int data){
            list.add(data);
        }
        //pop
        public  int pop(){
            if(isEmpty()){
                return -1;
            }
            int top=list.get(list.size()-1);
            list.remove(list.size()-1);
            return top;
        }
        //peek
        public  int peek(){
             if(isEmpty()){
                return -1;
            }
            return list.get(list.size()-1);
        }
    }
    public static void main(String[] args) {
         //operations of stack :
        // push pop and peek these all are time complexity of O(1)
       Stack s = new Stack();
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
