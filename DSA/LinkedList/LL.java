public class LL {
 
    public static void insertAtEnd(Node head , int value){
        Node temp=new Node(value);
        Node t=head;// creating a temp node with data type of node 
        while (t.next!=null) { //stops program when it reaches to null
            t=t.next;
        }
          t.next=temp;
          
    }

// function to display list with temp variable
    public static void display(Node head){

        Node temp=head;
        while(temp!=null){  //stops program when it reaches to null
           System.out.print(temp.data+" -> ");
           temp=temp.next;  
         }
         System.out.print("null");
    }
    // function to display linked list without using temp 
// not ideal for reusable to preserve head function we have to use temp
    //  public static void display(Node a){
    //     while(a!=null){
    //        System.out.print(a.data+" -> ");
    //        a=a.next;  
    //      }
    //      System.out.print("null");
    // }

    public static void displayr(Node head){
        // display nodes using recusion
        if(head==null)// base case
            return;
          System.out.print(head.data+" -> ");
          display(head.next);
    }

    public static void displayReverse(Node head){
        // display nodes in reverse using recursion 
        if(head==null)
            return;
          display(head.next);
          System.out.print(head.data+" -> ");
    }

    public static int length(Node head){ // function to calculate the length of Node
         Node temp=head;
         int count=0;
        while(temp!=null){
           count++;
           temp=temp.next;  
         }
         return count;    //O(n)
    }

    public static boolean isExist(Node head, int n){
            Node temp =head;
            while (temp!=null) {
                if(temp.data==n){
                    return true;
                }
                temp=temp.next;
            }
            return false;
    }
        public static int Findindex(Node head, int n){
            Node temp=head;
            int count=0;
             while (temp!=null) {//stops program when it reaches to null
                if(temp.data==n){
                    return count;
                }
                count++;
                temp=temp.next;
            }
            return -1;
        }
    public static class Node{
        // the main draw back of linked list is  it takes memory for both data and address
        //  but the values can be stored any where bcz they all are connected
        // but insertion can be done easily 
        // but traversing take O(n) time  but good thing is time complexity
        // where we can insert element without moving all elements unlike arrays
        // another limitation(singly linked list) is if we are given a node we can find only next elements but we cannot find before elements 
        // but we can solve that limitation using doublely linked list
        int data;  // value 
        Node next; // address of next node
        public Node(int data){
        this.data= data;
        this.next= null; // tail
    }
    }
    public static void main(String[] args) {
        Node a= new Node(5);//head Node
        Node b= new Node(6);
        Node c= new Node(8);
        Node d= new Node(10);
        Node e= new Node(15);
        Node f= new Node(18);
        Node g= new Node(11);
        Node h= new Node(13);
        Node i= new Node(25);
        Node j= new Node(150);
       // before linking nodes 
        // 5  6  8  10  15  18  11  13  25  150
        // linking the nodes
        a.next=b; 
        // 5 -> 6  8  10  15  18 11 13 25 150 after linking a to b 
        b.next=c;
         // 5 -> 6 ->  8  10  15 18 11 13 25 150
        c.next=d;
         // 5 -> 6 -> 8 -> 10  15 18 11 13 25 150
        d.next=e;
         // 5 -> 6 -> 8 -> 10 -> 15 18 11 13 25 150
        e.next=f;
         // 5 -> 6 -> 8 -> 10 -> 15 -> 18 11 13 25 150
        f.next=g;
         // 5 -> 6 -> 8 -> 10  -> 15 -> 18 -> 11 13 25 150
        g.next=h;
         // 5 -> 6 -> 8 -> 10  -> 15 -> 18 -> 11 -> 13 25 150
        h.next=i;
         // 5 -> 6 -> 8 -> 10 -> 15 -> 18 -> 11 -> 13 -> 25  150
        i.next=j;
         // 5 -> 6 -> 8 -> 10  -> 15  -> 18 -> 11 -> 13 -> 25 -> 150
         //  by defualt last node points to null
         // the resultant linked list looks like 
        // 5 -> 6 -> 8 -> 10 -> 15 -> null
        // checking the link of node by checking adresses
        // System.out.println(a);
        // System.out.println(b);
        // System.out.println(a.next);
        // System.out.println(c);
        // System.out.println(b.next);
        // System.out.println(d );
        // System.out.println(c.next);
        // System.out.println(e);
        // System.out.println(d.next);
        // System.out.println(e.next);
        //printing the values first to last
        // System.out.println(a.data);
        // System.out.println(b.data);
        // System.out.println(c.data);
        // System.out.println(d.data);
        // System.out.println(e.data); 
        // printing values using .(dot) operator
        // System.out.println(a.data); //a
        // System.out.println(a.next.data);//b
        // System.out.println(a.next.next.data);//c
        // System.out.println(a.next.next.next.data);//d
        // System.out.println(a.next.next.next.next.data); //d
        // display(a);
        // System.out.println();
        // displayr(a);
        // System.out.println();
        // displayReverse(a);
        //System.out.println();
        int len=length(a);
        System.out.println(len);

        insertAtEnd(a,80);
        display(a);
        System.out.println();
        System.out.println(isExist(a, 25));
        System.out.println(isExist(a,64));
        int pos=Findindex(a, 25);
        if(pos==-1){
             System.out.println("Element Not found");
        }else{
             System.out.println("The Element found at: "+pos);
        
    }

}
}
