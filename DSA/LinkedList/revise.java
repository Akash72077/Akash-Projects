public class revise {
    public static class Node{
        int data; 
        Node next;
        Node(int data){
            this.data=data;
        }
    }
    static void display(Node head){
        while (head!=null) {
                System.out.print(head.data+" -> ");
                head=head.next;
            }
        System.out.print("null");
    }
    public static void main(String[] args) {
        Node a= new Node(0);
        Node b= new Node(5);
        Node c= new Node(4);
        Node d= new Node(9);
        Node e= new Node(12);
        Node f= new Node(24);
        a.next=b;
        b.next=c;
        c.next=d;
        d.next=e;
        e.next=f;
        f.next=null;
        display(a);
    }
}
