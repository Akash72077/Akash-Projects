public class sorting {
    
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
public static void seletion(int arr[]){
    for(int i=0; i<arr.length-1;i++ ){
        int minPos=i; 
        for(int j=i+1; j<arr.length-1;j++){
            if(arr[minPos]>arr[j]){
                minPos=j;
            }
        }
        int temp= arr[minPos];
        arr[minPos]=arr[i];
        arr[i]=temp;
    }
}
public static void printArray(int arr[]){
    for(int i=0; i<arr.length; i++){
     System.out.print(arr[i]+" ");
    }
}
    public static void main(String[] args) {
    int array[]={5,4,6,3,2,8,67,45};
    //bubble(array);
    seletion(array);
    printArray(array);
    }
}
