package BinaryTree;

public class Learn
{

   public static class Node{
        int val;
        Node left;
        Node right;
    }
    public static void main(String[] args) {
        Node root = new Node();
        root.val=10;
        root.left=null;
        root.right=null;
        System.out.println(root.val);
        System.out.println(root.left);
        System.out.println(root.right);

    }
}
