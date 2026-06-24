public class Apna {
    static class Node{// Class for Node 
        int data; //it contains data pary
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
            return null;
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
        int nodes[]= {1,2,4,-1,-1,5,-1,-1,3,-1,6,-1,-1};
    }
}
