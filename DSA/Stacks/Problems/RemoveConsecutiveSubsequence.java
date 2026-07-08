package Problems;
//Q. Remove consecutive subsequences
//Given a sequence of numbers. Remove all the
//consecutive subsequences of length greater than or
//equal to 2 that contains the same element.
import java.util.Stack;

public class RemoveConsecutiveSubsequence {
    static int[]  removeConsecutive(int[] arr) {

        Stack<Integer> st = new Stack<>();

        int n = arr.length;


        for (int i = 0; i < n ; i++) {

            int element = arr[i];
            if (st.isEmpty()|| (st.peek() != element )){
                st.push(element);

            }
           else if (st.peek() == element) {
                if (i==n-1|| arr[i + 1] != element ) {
                    st.pop();
                }

            }
        }
            int len = st.size();
            int[] res = new int[len];

            for (int i = len - 1; i >= 0; i--) {
                res[i] = st.pop();
            }


        return res;
    }

        public static void main (String[]args){
            int[] arr = {1, 2, 2, 3, 10, 10, 10, 4, 4, 4, 5, 7, 7, 2};
            int[] res = removeConsecutive(arr);

            for (int re : res) {
                System.out.print(re + " ");
            }
        }
    }
