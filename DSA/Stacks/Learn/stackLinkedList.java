package Learn;
//
//public class stackLinkedList {
//    static class Node{
//        int data;
//        Node next;
//        Node(int data){
//            this.data=data;
//            this.next=null;
//        }
//    }
//    static class Stack{
//        static Node head= null;
//        public boolean isEmpty(){
//            return head==null;
//        }
//        public void push(int data){
//            Node newNode= new Node(data);
//            if(isEmpty()){
//                head= newNode;
//                return;
//            }
//            newNode.next=head;
//            head=newNode;
//        }
//        public int pop(){
//            if(isEmpty()){
//                return -1;
//            }
//            int top=head.data;
//            head=head.next;
//            return top;
//        }
//        public int peak(){
//            if(isEmpty()){
//                return -1;
//            }
//            return  head.data;
//        }
//        }
//
//    public static void main(String[] args) {
//        Stack s = new Stack();
//       s.push(1);
//       s.push(2);
//       s.push(4);
//       s.push(5);
//       s.push(7);
//       s.push(9);
//       s.push(11);
//       s.push(13);
//       while(!s.isEmpty()){
//        System.out.println(s.peak());
//        s.pop();
//       }
//    }
//}


// trying
class stackLinkedList{
   public static  class Node{
        int data;
        Node next;
        Node(int data){
            this.data=data;
        }
    }
    static class Stack{
        Node head=null;
        int size=0;
        boolean isEmpty(){
            return size==0;
        }

        void push(int data){
           Node newNode= new Node(data);
           if(head==null){
               head=newNode;
               size++;
               return;

           }
          newNode.next=head;
           head=newNode;
           size++;

        }
        int peek(){
            if(isEmpty()){
                return -1;
            }
            return head.data;
        }
        int pop(){
            int top=head.data;
            head=head.next;
            size--;
            return top;
        }
        void display(){
            Node temp=head;
            while(temp!=null){
                System.out.print(temp.data+" ");
                temp=temp.next;
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        Stack st= new Stack();
        st.push(10);
        st.push(42);
        st.push(54);
        st.push(89);
        st.push(12);
        st.push(67);
        System.out.println(st.peek());
        st.display();

        st.pop();
        st.display();
        System.out.println(st.peek());

    }
}