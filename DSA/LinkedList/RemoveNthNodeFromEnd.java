public class RemoveNthNodeFromEnd {
  
        // function to find nth node using fast and slow pointer
        //interviewers fav method
        public  static void display(Node head){
            Node temp=head;
            while(temp!=null){
                System.out.print(temp.data+" -> ");
                temp=temp.next;
            }
            System.out.println("null");
        }

    public static Node nthNodeTwoPointer(int n, Node head){
            Node slow= head;
            Node fast=head;
            // first move fast n times 
            for(int i=1; i<=n; i++){
                fast=fast.next;
            }

            // this condition is used we input is given as size or we have to delete n node
            if(fast==null){
                head=head.next;
                return head;
            }
            // then move both Nodes untill fast.next  becomes null then slow will point it from nth of second
            // fast.next is null beacuse we need to remote a node so we have to find the node before of it 

            while(fast.next!=null){
                slow=slow.next;
                fast=fast.next;
            }
            slow.next=slow.next.next;
          
            return head;

       
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
            
          a= nthNodeTwoPointer(8, a);
             display(a);
}
}