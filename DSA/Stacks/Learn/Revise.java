package Learn;

import java.util.Scanner;

public class Revise {
    static class Stack {
        private int top = -1;
        private final int[] arr;

        Stack(int size) {
            arr = new int[size];
        }

        void push(int val) {

            if (isFull()) {
                System.out.println("Stack OverFlow");
                return;
            }

            arr[++top] = val;
        }

        int size() {
            return top + 1;
        }

        int pop() {
            if (isEmpty()) {
                System.out.println("Stack underflow");
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

        boolean isEmpty() {
            return top == -1;
        }

        boolean isFull() {
            return top == arr.length - 1;
        }

        void display() {
            if (isEmpty()) {
                System.out.println("Stack is empty");
                return;
            }

            for (int i = top; i >= 0; i--) {
                System.out.print(arr[i] + " ");
            }

            System.out.println();
        }
    }

    public static void main(String[] args) {

        System.out.println("Enter the size of Stack: ");

        Scanner sc = new Scanner(System.in);

        int size = sc.nextInt();

        Stack st = new Stack(size);

        st.push(10);

        st.push(20);

        st.push(30);

        st.push(40);

        st.push(50);

        System.out.println(st.pop());

        st.push(30);

        System.out.println(st.pop());

        st.display();

        st.push(70);

        st.push(90);

        st.display();

        System.out.println(st.isEmpty());

        System.out.println(st.isFull());

        System.out.println(st.peek());

        System.out.println(st.size());
    }
}