package Problems;
public class DailyTemperatures {
    public  static  int [] BruteForce(int[] arr){
        //this code is brute force approach ,but it will give time limit error while running in Leetcode with large amount of test cases
            int n=arr.length;
        int[] res =new int[arr.length];
        for(int i=0;i<n-1;i++){
            for(int j=i+1;j<n;j++){
                if(arr[i]<arr[j]){
                    res[i]=j-i;
                    break;
                }
            }
        }

    return res;
    }


    public static void main(String[] args) {

        int[] arr= {73,74,75,71,69,72,76,73};
       int[] res= BruteForce(arr);
        for (int re : res) {
            System.out.print(re + " ");
        }

    }
}
