public class Practice {
    public static void swap(int arr[]){
        System.out.println(arr[0]+" "+ arr[1]);
        int temp=arr[0];
        arr[0]=arr[1];
        arr[1]=temp;
     System.out.println(arr[0]+" "+ arr[1]);

    }
    public static void main(String[] args) {
        int arr[]= new int[2];
         arr[0]=10;
         arr[1]=20;
     System.out.println(arr[0]+" "+ arr[1]);

         swap(arr);
    System.out.println(arr[0]+" "+ arr[1]);

    }
}
