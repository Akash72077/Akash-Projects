package BinaryTree;

public class Apna {
    static class Node{// Class for Node 
        int data; //it contains data part
        Node left;
        Node right;

        Node(int data){
            this.data=data;
            this.left=null;
            this.right=null;
        }
    }

    static class BinaryTree {
        static int index=-1;
        public static Node buildTree(int nodes[]){  // here data type Node means it will return root
            index++;
        if(nodes[index]==-1){
            return null;// returns ie. stops running if it contains -1
        }
        Node newNode= new Node(nodes[index]);
        newNode.left=buildTree(nodes);
        newNode.right= buildTree(nodes);
        return newNode;
        }
        
    }
    public static void main(String[] args) {
        // -1 indicates null
        // building tree in preorder traversal
        // pre order traversal means : first root node , next left node and right node 
<<<<<<< HEAD
        int nodes[]= {1,2,4,-1,-1,5,-1,-1,3,-1,6,-1,-1};
        BinaryTree tree= new BinaryTree();
        Node root= tree.buildTree(nodes);
        System.out.println(root.data);
=======
        int nodes[]= {1,2,4,-1,-1,5,-1,-1,3,-1,6,-1,-1}; // array for preorder traversal
>>>>>>> 4e31deed2b7636ec50c69f81583e942272722b42
    }
}
