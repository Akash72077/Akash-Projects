import java.util.Scanner;

public class EvenDigits {
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        int[] arr= {12,345, 2, 6, 7896 };
        // method 1
// int ans=0;
//         for(int i=0; i<arr.length; i++){
            
//         int result= count( arr[i]);
//         if(result%2==0){
//             ans++;
//         }
       
//         }
//         System.out.println(ans);
// Method 2
// int count=0;
// for(int i=0; i<arr.length; i++){
//     String str= String.valueOf(arr[i]);
//     if(str.length()%2==0){
//         count++;
//     }
    

// }
//  System.out.println(count);
// method 3  using log
int count=0;

for(int i=0; i<arr.length; i++){
    
    int value= noOfDigits(arr[i]);
    if(value%2==0){
        count++;
    }
   
}
 System.out.println(count);
    }
    static int noOfDigits(int value){
        if(value==0){
    return 1;
}
        return (int) Math.floor(Math.log10(Math.abs(value)))+1;
    }
    // method 1 related function
    static int count(int  value){
        if(value==0)
            return 1;
        value= Math.abs(value);// for negive number
        int count=0;
        while(value>0){
            value/=10;
            count++;
        }

        return count;
    }
}
