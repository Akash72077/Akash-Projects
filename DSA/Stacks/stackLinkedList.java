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
        public static boolean isEmpty(){
            return head==null;
        }
        public static void push(int data){
            Node newNode= new Node(data);
            if(isEmpty()){
                head= newNode;
                return;
            }
            newNode.next=head;
            head=newNode;
        }
        }
    
    public static void main(String[] args) {
        Stack s = new Stack();
        
    }
}
