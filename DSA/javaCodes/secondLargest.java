public class secondLargest {
    public static void main(String[] args) {
        int arr[]= {12,35,1,10,34,1,35};
        int max= Integer.MIN_VALUE;
        for(int i=0; i<arr.length; i++){
            if(arr[i]>max){
                max= arr[i];
            }

        }
        int smax= Integer.MIN_VALUE;
        for(int i=0; i<arr.length; i++){
            if(arr[i]<max&& arr[i]>smax){
                smax= arr[i];
            }

        }
        System.out.println(smax);
    }
}
