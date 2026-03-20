import java.util.*;
class sumUntillZero {
public static void main(String[] args) {
    int arr[]= new int[10];
    int sum=0,i=0;
    Scanner sc = new Scanner(System.in);
    do{
        arr[i]=sc.nextInt();
        sum+=arr[i];
    }while(arr[i++]!=0);
    System.out.println(sum);
     
}   
}