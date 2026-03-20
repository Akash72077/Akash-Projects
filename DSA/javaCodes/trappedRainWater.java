import java.util.*;
public class trappedRainWater {
    public static int trappedWater(int height[]){
       int size=height.length;
        int leftMax[]=new int[size];
        leftMax[0]=height[0];
        for(int i=1; i<size;i++){
            leftMax[i]=Math.max(height[i],leftMax[i-1]);
        }
        int rightMax[]=new int[size];
        rightMax[size-1]=height[size-1];
        for(int i=size-2; i>=0; i-- ){
            rightMax[i]=Math.max(height[i],rightMax[i+1]);
        }
        int trappedWater=0;
        for(int i=0; i<size; i++){
            int waterLevel=Math.min(leftMax[i],rightMax[i]);
            trappedWater+=waterLevel-height[i];

        }
return trappedWater;
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the size of array: ");
        int size=sc.nextInt();
        int height[]=new int[size];
        System.out.println("Enter "+size+" elements into array");
        for(int i=0; i<height.length; i++){
            height[i]=sc.nextInt();
        }
        System.out.println("The Trapped rain water is: "+trappedWater(height));

sc.close();
        
    }
}
