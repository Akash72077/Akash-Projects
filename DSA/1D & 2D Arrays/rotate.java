import java.util.*;
public class rotate {
   static void rotateExtraSpace(int arr[], int k){
    // rotate an array using extra array
    int n=arr.length;
    k=k%n;
    int j=0;
    int []ans=new int[n];
    for(int i=n-k; i<n; i++){
        ans[j++]=arr[i];
    }
    for(int i=0; i<n-k; i++){
        ans[j++]=arr[i];
    }
    for(int i=0; i<n; i++){
        System.out.print(ans[i]+" ");
    }
   }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter size:");
        int n=sc.nextInt();
        int arr[]= new int[n];
        System.out.println("Enter "+n+" elements: ");
        for(int i=0;i<n; i++){
            arr[i]=sc.nextInt();
        }
        System.out.println("Enter no of rotations: ");
        int k=sc.nextInt();
        rotateExtraSpace(arr,k);
    sc.close();
    }
}
