package BinaryTree;

public class DiameterOfTree{
    static class Node{
    int val;
    Node left;
    Node right;

        Node(int val){
            this.val=val;
        }

    }

    static int count =0;

    static  int Diameter(Node root){
        Target(root);
        return count;
    }

    static int Target(Node root){

        if (root == null) {
            return 0;
        }

        int left = Target(root.left);
        int right = Target(root.right);

        count=Math.max(count, left+right);
        return 1+Math.max(left, right);


    }



    public static void main(String[] args) {
        Node a= new Node(1);
        Node b= new Node(2);
        Node c= new Node(3);
        Node d= new Node(4);
        Node e= new Node(5);
       a.left=b;
       a.right=c;
       b.left=d;
       b.right=e;
        System.out.print( Diameter(a));


    }
}
