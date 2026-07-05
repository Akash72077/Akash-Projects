package Learn;

public class stackLinkedList {
    static class Node{
        int data;; 
        Node next;
        Node(int data){
            this.data=data;
            this.next=null;
        }
    }
    static class Stack{
        static Node head= null;
        public boolean isEmpty(){
            return head==null;
        }
        public void push(int data){
            Node newNode= new Node(data);
            if(isEmpty()){
                head= newNode;
                return;
            }
            newNode.next=head;
            head=newNode;
        }
        public int pop(){
            if(isEmpty()){
                return -1;
            }
            int top=head.data;
            head=head.next;
            return top;
        }
        public int peak(){
            if(isEmpty()){
                return -1;
            }
            return  head.data;
        }
        }
    
    public static void main(String[] args) {
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
        System.out.println(s.peak());
        s.pop();
       }
    }
}
