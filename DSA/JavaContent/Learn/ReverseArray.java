package Learn;

import java.util.Scanner;

public class ReverseArray {

     static  int[] Bruteforce(int[] arr)
     {
         int n=arr.length;
         int[] result= new int[n];
         int j=0;
         for(int i=n-1; i>=0;i--){
//             result[n-i-1]=arr[i];
             result[j]=arr[i];
             j++;
         }


   return result;
     }

    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the size of an array: ");
        int n=sc.nextInt();
        int[] arr=new int[n];
        System.out.println("Enter "+n+" elements: ");
        for(int i=0;i<n;i++){
            arr[i]=sc.nextInt();
        }

        int[] res= Bruteforce(arr);
        System.out.println("The reverse array is: ");

        for(int i=0;i<arr.length;i++){
            System.out.print(res[i]+" ");
        }

sc.close();
    }
}
