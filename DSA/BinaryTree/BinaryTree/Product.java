package BinaryTree;
//program to calculate the sum size max height

public class Product
{
    static class Node{
        int val;// it contains value of node
        Node left;// it is left node
        Node right;
        Node(int val){
            this.val=val;// constructor
        }

    }

    public static  int product(Node root){
        if(root==null)
            return 1;
        return root.val*product(root.left)*product(root.right);
    }


    public static void main(String[] args) {
        Node a= new Node(1);
        Node b= new Node(2);
        Node c= new Node(3);
        Node d= new Node(4);
        Node e= new Node(5);
        Node f= new Node(6);
        Node g= new Node(7);
        Node h= new Node(8);
        a.left=b;// connecting nodes
        a.right=c;
        b.left=d;
        b.right=e;
        c.left=f;
        c.right=g;
        g.left=h;

        System.out.println("The size of all nodes is: "+product(a));


    }
}
