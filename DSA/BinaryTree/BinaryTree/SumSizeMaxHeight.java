package BinaryTree;
//program to calculate the sum size max height

public class SumSizeMaxHeight
{
    static class Node{
        int val;// it contains value of node
        Node left;// it is left node
        Node right;
        Node(int val){
            this.val=val;// constructor
        }

    }
    public static void main(String[] args) {
        Node a= new Node(1);
        Node b= new Node(2);
        Node c= new Node(3);
        Node d= new Node(4);
        Node e= new Node(5);
        Node f= new Node(6);
        Node g= new Node(7);
        a.left=b;// connecting nodes
        a.right=c;
        b.left=d;
        b.right=e;
        c.left=f;
        c.right=g;

        }
}
