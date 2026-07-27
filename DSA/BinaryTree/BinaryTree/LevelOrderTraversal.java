package BinaryTree;
import java.util.*;
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

       while(!q.isEmpty()){// the while loop will run until the queue is empty
            Node currNode= q.remove();// we have to store the front node value to a variable and remove it
           if(currNode==null){// if the current node is null it will enter to this statement
               System.out.println();// new line will be printed for new level
               if(q.isEmpty()){// curr node is null and after removing it,  if queue is empty and then we have to stop the while loop which will indicate complete tree is traversed
                   break;
               }else {
                   q.add(null); //if queue is not empty and if we find null it is the condition of one level is completed and we need to add another null which is end of current level
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
