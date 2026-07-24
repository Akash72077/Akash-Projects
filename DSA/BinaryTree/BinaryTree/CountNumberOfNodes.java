package BinaryTree;

public class CountNumberOfNodes
{
    static   class Node{
        int val;
        Node left;
        Node right;

        Node (int val){
            this.val=val;
        }

    }

    static int count(Node root){
        if(root==null){
            return 0;
        }
        return 1+count(root.left)+count(root.right);
    }

    public static void main(String[] args) {
        Node root = new Node(1);
        Node b= new Node(2);
        Node c= new Node(3);
        Node d= new Node(4);
        Node e= new Node(5);
        Node f= new Node(6);
        Node g= new Node(7);
        Node h= new Node(8);
        root.left=b;// connecting nodes
        root.right=c;
        b.left=d;
        b.right=e;
        c.left=f;
        c.right=g;
        g.left=h;


        System.out.println(count(root));
    }
}
