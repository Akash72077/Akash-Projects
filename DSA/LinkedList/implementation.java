public class implementation {  //implementation of linked lsist
        public static class Node{//defining linked list
        int data;
        Node next;
        public Node(int data){
            this.data=data;
        }
}
public static class linkedlist{ 
        Node head=null; // intially both head and tail are empty
        Node tail=null;
        int size=0;
                 void deleteAtFirst(){
            head=head.next;
            size--; // automatically updates size when delete operations happens
            return;
        }
        void deleteAtIndex(int idx){
            if(idx==0){
                deleteAtFirst(); // if pos is first element then delete first element
            }
            Node temp= head;
            for(int i=1; i<idx-1; i++){
                temp=temp.next;// traverse the n-1 th node which we have to delete 
            }
            temp.next=temp.next.next; // link the node with next next element the next element is removed
            tail=temp;
            size--; // decrease the size after removing an element

        }
            void insertAtEnd(int value){
                Node temp=new Node(value);
                if(head==null ){ // if Linked list is empty then new node will acts as both head and tail
                    head=temp;
                    tail=temp;
                }
                else{
                tail.next=temp;// if LL is not empty then add an element
                tail=temp;
                }
                size++; //update size when ever an element is added at end 
            }
            void display(){
            Node temp= head;
            while(temp!=null){ // the loop running will break after reaching null 
                System.out.print(temp.data+" ");
                temp=temp.next; 
            }
        }
            int size(){///    O(n)
                // int count=0;
                //  Node temp= head;
                // while(temp!=null){
                //     count++;
                //     temp=temp.next;
                // }
                // return count;
                return size; // instead of traversing eaach and every list we have to increase the size value when ever the insert places at any condition then simply return the size


        }

        void insertAtBeginning(int value){
            Node temp=new Node(value);
                if(head==null ){ // empty list
                    head=temp;
                    tail=temp;
                }else{ // non empty list
                    temp.next=head;
                    head=temp;
                }

                size++;// increase the size when ever an element is inserted

        }
        void insertAt(int idx,int value){
            if(idx==size()){  // if index postion is last then head will be not updated so we have to insert using insert at end function 

                insertAtEnd(value);
                return;
            }
            else if(idx==0){  // if index postion is first then head will be not updated so we have to insert using insert at begining function   
                insertAtBeginning(value); 
                return;
            }
            else if(idx<0 || idx>size()){
                System.out.println("Wrong index");
                return; 
            }
        Node t=new Node(value);
        Node temp=head;
        for(int i=1; i<=idx-1; i++){
            temp=temp.next;
        }
        t.next=temp.next;
        temp.next=t;
        size++;
    }

        int getAt(int idx){
            if(idx<0 || idx>size()){
                System.out.println("Wrong index");
                return -1; // -1 indicates negative response means unsuccessful
            }
            Node temp=head;
            for(int i=1; i<=idx; i++){
                temp=temp.next;
            }
            return temp.data;
        }
    }
    public static void main(String[] args) {
        linkedlist ll= new linkedlist();
        ll.insertAtEnd(5); // 5
        ll.insertAtEnd(7); // 5 7
        ll.insertAtEnd(8); // 5 7 8
       // ll.display(); 
       // System.out.println();
       // System.out.println("Size of the LinkedList is: "+ll.size());
       ll.insertAtBeginning(6); // 6 5 7 8
       ll.insertAtBeginning(1); // 1 6 5 7 8
       ll.insertAtBeginning(2); // 2 1 6 5 7 8
       ll.insertAtBeginning(3); // 3 2 1 6 5 7 8
      //   ll.display(); 
         //System.out.println();
       //  System.out.println("Size of the LinkedList is: "+ll.size());
       ll.insertAt(2,10); //3 2 10 1 6 5 7 8
       System.out.println();
       ll.display();
       System.out.println();
       //System.out.println(ll.getAt(2));  
       ll.deleteAtIndex(4);
       ll.display();
       
       
    }
}
