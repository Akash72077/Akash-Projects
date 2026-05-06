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
        System.out.println("null");
    }
    static int nthNodeFromEnd(Node head, int n){
        Node fast =head;
        Node slow = head;
        for(int i=1; i<=n; i++){
            fast=fast.next;
        }
       
        while(fast!=null){
            slow=slow.next;
            fast=fast.next;
        }
        return slow.data;
    }
    static Node deleteNthFromEnd(Node head, int n){
         Node fast =head;
        Node slow = head;
        for(int i=1; i<=n; i++){
            fast=fast.next;
        }
         if(fast==null){
            head=head.next;
            return head;
        }
        while(fast.next!=null){
            slow=slow.next;
            fast=fast.next;
        }
        slow.next=slow.next.next;
        display(head);
       return head;
    }
    public static void main(String[] args) {
        Node a= new Node(0);
        Node b= new Node(5);
        Node c= new Node(4);
        Node d= new Node(9);
        Node e= new Node(12);
        Node f= new Node(24);
        Node g= new Node(29);
        a.next=b;
        b.next=c;
        c.next=d;
        d.next=e;
        e.next=f;
        f.next=g;
        g.next=null;
        display(a);
        // System.out.println(nthNodeFromEnd(a, 2));
        // System.out.println("After removing node: ");
        // a=deleteNthFromEnd(a, 4);
        
    }
}
