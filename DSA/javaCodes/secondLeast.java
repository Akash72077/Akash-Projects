public class secondLeast {
    public static void main(String[] args) {
        int arr[]= {2,1,3,4,5,6,8};
        int min = Integer.MAX_VALUE;
        int smin= Integer.MAX_VALUE;
        for(int i=0; i<arr.length; i++){
            if(arr[i]<min){
                min= arr[i];
            }

        }
        for(int i=0; i<arr.length; i++){
            if(arr[i]<smin && arr[i]>min){
                smin= arr[i];
            }
        }
        if(smin== Integer.MAX_VALUE){
            System.out.println("No second least element");
        }else{
            System.out.println("Second minimum element is: "+smin);
        }
    }
}
