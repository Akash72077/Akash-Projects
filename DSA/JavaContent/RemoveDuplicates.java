class RemoveDuplicates {
public static void main(String args[]){

int arr[]={0,0,1,1,1,2,2,3,3,4};
int size= arr.length;

// optimized 

// int count=0;
// int j=0;
// for(int i=1; i<size; i++){
// if(arr[i]!=arr[j]){
// arr[++j]=arr[i];
// count++;

// }
// }

// for(int i=1; i<size; i++){

// System.out.print(arr[i]+" ");

// }
// System.out.println();
// System.out.print(count);
int[] temp = new int[size];
int k=0; 
temp[k++]=arr[0];
for(int i=1; i<size; i++){
    if(arr[i]!=arr[i-1]){
        temp[k++]=arr[i];
    }
}
System.out.println("No of unique elements are : "+k);
for(int i=0; i<k; i++){
    System.out.print(temp[i]+" ");
}



}

}
