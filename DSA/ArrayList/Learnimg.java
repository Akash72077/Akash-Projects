import java.util.*;
public class Learnimg {
    public static void main(String[] args) {
        // int [] arr = new int[5];
        Scanner sc = new Scanner(System.in);
    //    for(int i=0; i<arr.length; i++){
    //     arr[i]= sc.nextInt();
    //    }
    //    System.out.println("Output using for loop: ");
    //     for(int i=0; i<arr.length; i++){
       
    //         System.out.print(arr[i]+" ");
    //    }
    //    System.out.println();
    //    System.out.println("Output using for each loop");
    //    for(int num: arr){
    //     System.out.print(num+" ");
    //    }

    // System.out.println(Arrays.toString(arr));
//     String[] str= new String[4];
// for(int i=0; i<str.length; i++){
//         str[i]= sc.next();
//        }

//        System.out.println(Arrays.toString(str));
// int[] nums ={2,45,6,7,8,6,5};
// System.out.println(Arrays.toString(nums));
//  change(nums);
//  System.out.println(Arrays.toString(nums));

//        sc.close();
       
//     }
//     static void change(int[] arr){
//         arr[0]= 44;


/*
   multi dimentional array or 2D array 
    example: 
                1 2 3
                4 5 6
                7 8 9
        syntax: 
                datatype[][] arr_name= new datatype[row_size][col_size];
                row size is mandatory  but col size is not mandatatory
                In java 2-D arrays are stored in the form of array of array in heap
 */
// int [][] arr= new int[3][3];
//    int [][]arr= {{1,2,3},// 0th index
//    {4 ,5}, // 1st index
//    {6,7,8,9} //2nd index
// };


//   for(int i=0; i<arr.length; i++){
 
//         for(int j=0; j<arr[i].length; j++){
//             arr[i][j]= sc.nextInt();
//         }
//        }
	    // printing 
// 		int arr[][]= {
// 		    {1, 2, 3}, {4, 5}, {6, 7, 8, 9}
// 		};
// 	for(int i=0; i<arr.length; i++){
// 	    for(int j=0; j< arr[i].length; j++){
// 	        System.out.print(arr[i][j]+" ");
// 	    }
// 	    System.out.println();
// 	}
// taking input and printing values 
// System.out.println("Enter the elements: ");
// Scanner sc = new Scanner(System.in);
// int [][] arr= new int[3][3];
// 	for(int i=0; i<arr.length; i++){
// 	    for(int j=0; j< arr[i].length; j++){
// 	        arr[i][j]= sc.nextInt();
// 	    }
// 	}
// 	System.out.println("The elements in the array are: ");
// 	for(int i=0; i<arr.length; i++){
// 	    for(int j=0; j< arr[i].length; j++){
// 	        System.out.print(arr[i][j]+" ");
// 	    }
// 	    System.out.println();
// 	}

		// int arr[][]= {
		//     {1, 2, 3}, {4, 5}, {6, 7, 8, 9}
		// };
        // for(int i=0; i<arr.length; i++){
        //     System.out.println(Arrays.toString(arr[i]));
        // }
        // for(int[] a : arr){
        //     System.out.println(Arrays.toString(a));
        // }

        // ArrayList<Integer> list = new ArrayList<>(5);
        
        // list.add(69);
        // list.add(55);
        // list.add(54);
        // list.add(35);
        // list.add(65);
        // list.add(76);
        // list.add(36);
        // list.add(85);
        // list.set(1, 96);
        // System.out.println(list);
        int[] arr={1, 3 , 66,23, 9, 18};
        reverse(arr);
        System.out.println(Arrays.toString(arr));







        sc.close();
     }
    static void reverse(int[] arr){
        int start= 0;
        int end = arr.length-1;
    while(start<end){
        int temp = arr[start];
        arr[start]= arr[end];
        arr[end]=temp;
        start++;
        end--;
    }

}
}
