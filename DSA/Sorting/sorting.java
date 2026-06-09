import java.util.Arrays;
import java.util.Collections;
public class sorting {
    //large elements come tp the end of array by swapping with adjacent elements 
public static void bubble(int arr[]){
    for(int turn =0; turn <arr.length-1; turn ++){
        for(int j=0; j<arr.length-1-turn; j++){
            if(arr[j]>arr[j+1]){
                int temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
}
// idea: pick smallest element(from unsorted) and put it at the begining
public static void seletion(int arr[]){
    for(int i=0; i<arr.length-1;i++ ){
        int minPos=i; 
        for(int j=i+1; j<arr.length;j++){
            if(arr[minPos]>arr[j]){
                minPos=j;
            } 
        }
        int temp= arr[minPos];
        arr[minPos]=arr[i];
        arr[i]=temp;
    }
}
public static void printArray(Integer arr[]){
    for(int i=0; i<arr.length; i++){
     System.out.print(arr[i]+" ");
    }
    System.out.println();
}
    public static void main(String[] args) {
    Integer array[]={5,4,1,3,2};
    //bubble(array);
    // seletion(array);
    // built in sort
    //Arrays.sort(array);
     //printArray(array);
    //  Arrays.sort(array,2,5);
    Arrays.sort(array,0,2,Collections.reverseOrder());
    printArray(array);
    }
}
