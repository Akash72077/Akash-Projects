package BinaryTree;

import java.util.LinkedList;
import java.util.Queue;

public class LevelOrderTraversal {

   static class Node{
        int val;
        Node left;
        Node right;
        Node(int val){
            this.val=val;
        }
    }

    static void LevelOrder(Node root){

       if(root==null){
           return;
       }

        Queue<Node> q= new LinkedList<>();
       q.add(root);// first we have insert root value and null value
       q.add(null);

       while(!q.isEmpty()){
            Node currNode= q.remove();
           if(currNode==null){
               System.out.println();
               if(q.isEmpty()){
                   break;
               }else {
                   q.add(null);
               }
           }else {
               System.out.print(currNode.val+" ");
               if(currNode.left!=null){
                   q.add(currNode.left);
               }
               if(currNode.right!=null){
                   q.add(currNode.right);
               }
           }
       }
    }


    public static void main(String[] args) {
        Node a = new Node(1);
        Node b = new Node(2);
        Node c = new Node(3);
        Node d = new Node(4);
        Node e = new Node(5);
        Node f = new Node(6);
        Node g = new Node(7);
        Node h = new Node(8);

        a.left=b;
        a.right=c;
        b.left=d;
        b.right=e;
        c.left=f;
        c.right=g;
        g.left=h;

        LevelOrder(a);



    }
}
