package Learn;

public class StackUsingArray {
public static  class Stack {

    int[] arr = new int[5];
    int top = -1;

    void push(int element) {
        if(top==arr.length-1){
            System.out.println("Stack overflow");
            return;
        }
        arr[++top] = element;
    }

    int pop() {
        if(top==-1){
            System.out.println("Stack is empty");
            return -1;
        }
        return arr[top--];
    }

    int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return -1;
        }
        return arr[top];
    }

    void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty");
            return;
        }

        for (int i = top; i >= 0; i--) {
            System.out.println(arr[i]);
        }
    }
    boolean isEmpty(){
        return top==-1;
    }
    boolean isFull(){
        return top==arr.length-1;
    }
    int size() {
        return top + 1;
    }
}

    public static void main(String[] args) {
        Stack st= new Stack();
        st.push(1);
        st.push(2);
        st.push(3);
        st.push(4);
        st.push(5);
        System.out.println(st.pop());
        System.out.println(st.peek());
        st.display();
    }
}
