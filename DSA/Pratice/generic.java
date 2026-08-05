// a method that can refer to any data type is called generic data type 

// syntax: <access specifier> <return type> mName(<type list>){
// body of the method
//}

import java.util.Arrays;

public class generic {

   static <T> void print(T t){
        System.out.println(t);
    }

    public static void main(String[] args) {
        generic obj=new generic();
        obj.print(10);
        obj.print(null);
        obj.print("sai akash");
        int[] arr={1,2,3,4,5,6};
        obj.print(Arrays.toString(arr));
    }
}
