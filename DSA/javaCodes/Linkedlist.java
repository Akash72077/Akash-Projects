// public class Linkedlist {
//     public static class Node{
//         int data;
//         Node next;
        
//         public Node(int data){
//             this.data=data;
//             this.next=null;
//         }
//     }
//     public static Node head;
//     public static Node tail;
//     public static void main(String[] args) {
//      //   Linkedlist ll =new Linkedlist();
//         // ll.head=new Node(1);
//         // ll.head.next=new Node(2);

//     }
// }
public class Linkedlist{
    public static class Node{
        int data;
        Node next;
        public Node(int data){
            this.data= data;
            this.next= null;

        }
        
    }

public static Node head;
public static Node tail;
// methods
///add first 
/// Step.1: create new node
/// step.2: new node next = head 
/// step.3: head = new node
/// remove
/// print


 public static void main(String args[]){
    Linkedlist ll= new Linkedlist();
    ll.head= new Node(1);
    
    }
}