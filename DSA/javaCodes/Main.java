class Main {
    public static void main(String[] args) {
        int []arr= {18, 12, -7, 3, 14, 28};
        // search for 3 in the range of index 1,4
    //     int start= 1, end=4;
    //     boolean result = linear(arr,start,end);
       
    //      if(result==true)
    //             System.out.println("Exist");
    //         else
    //             System.out.println("Not exist");
        
//System.out.println(minumum(arr));
int[][] array = {
    {1, 2},
    {3, 4, 5},
    {6}
};
min_2D(array);

     }

     static int minumum(int[] arr){

        int min=Integer.MAX_VALUE;
        for (int i = 0; i < arr.length; i++) {
            if(arr[i]<min){
                min=arr[i];
            }
        }
        return min;

     }

    static boolean linear(int arr[], int start, int end){
 for (int i = start; i <=end; i++) {
         if(arr[i]==-7)
                return true;
        } 
        return false;


    }
    static void min_2D(int[][] array){
        int min= Integer.MAX_VALUE;
System.out.println("Output using for loop: ");
        for(int i=0; i<array.length; i++){
            for(int j=0; j<array[i].length; j++){
                if(array[i][j]<min){
                    min=array[i][j];
                }
            }
            
        }
        System.out.println(min);
    System.out.println("Answer using enhanced or for each loop: ");
    for(int[] row : array){
        for(int val: row){
             if(val<min){
                    min=val;
                }
        }
       
    }


     System.out.println(min);
    }
}
