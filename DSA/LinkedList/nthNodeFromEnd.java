public class nthNodeFromEnd {
        // Code to find nth node using temp varible
    public static Node nthNode(Node head, int n){// this approach the loop is applying for twice to reduce it we have to use two pointer 
            int size=0;
            Node temp=head;
            while (temp!=null) {
                size++;
                temp=temp.next;   
            }
            temp=head;
            //moves the head untill main target finds
            for(int i=1; i<size-n+1; i++){
                 temp=temp.next;
            }
            return temp;
    }
        // function to find nth node using fast and slow pointer
        //interviewers fav method
    public static Node nthNodeTwoPointer(int n, Node head){
            Node slow= head;
            Node fast=head;
            // first move fast n times 
            for(int i=1; i<=n; i++){
                fast=fast.next;
            }
            // then move both Nodes untill fast becomes null then slow will point it from nth of second
            while(fast!=null){
                slow=slow.next;
                fast=fast.next;
            }
        return slow;
    }
    public static class Node{  // defining nodes
        int data;
        Node next;
        Node(int data){
            this.data=data;
        }
    }
    public static void main(String[] args) {  
        //Creating a nodes
            Node a= new Node(5);
            Node b= new Node(10);
            Node c= new Node(15);
            Node d= new Node(20);
            Node e= new Node(30);
            Node f= new Node(34);
            Node g= new Node(50);
            Node h= new Node(90);
            // linking Nodes 
            a.next=b;
            b.next=c;
            c.next=d;
            d.next=e;
            e.next=f;
            f.next=g;
            g.next=h;
            //5 10 15 20 30 24 50 90
            Node q=nthNode(a,4);
            System.out.println(q.data);       
           // System.out.println(nthNodeTwoPointer(2, a).data);
    }
}