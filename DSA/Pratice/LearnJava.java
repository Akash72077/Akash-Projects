import java.util.Scanner;
import java.util.Arrays;
class demo{
    int age;
    String name ;
    int rollNo;
    demo(int age, String name, int rollNo){
       this.age=age;
       this.name=name;
       this.rollNo=rollNo;
    }
    void print(){
        System.out.println(age);
        System.out.println(name);
        System.out.println(rollNo);
    }
    int sum(int a, int b){
        return a+b;
    }
    int sum(int a, int b, int c){
        return a+b+c;
    }
    double sum(double a, double b, double c){
        return a + b+ c;
    }
}
public class LearnJava {
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);

        demo obj= new demo(18,"Sai",5);
        obj.print();
        int sum=obj.sum(3, 5);
        int sum2=obj.sum(3, 5,6);
        double sum3=  obj.sum(1.4,1.5,5.7);
        System.out.println(sum);
        System.out.println(sum2);
        System.out.println(sum3);
    // constructors are two types 
    // default : it is created when object is created 
    // explicit: parameterized and non parameterized 
  
//     System.out.println("Enter "+size+" Elements to array: ");
//     for(int i=0; i<arr.length; i++){
//         arr[i]=sc.nextInt();
//     }

//     System.out.println("The elements in array: ");
//  for(int i=0; i<arr.length; i++){
//        System.out.println(arr[i]+" ");
//     }
int arr[]={53,45,2,4,6,32,6,74};
Arrays.sort(arr);//O(nlogn)
 for(int i=0; i<arr.length; i++){
       System.out.print(arr[i]+" ");
    }


    }
}