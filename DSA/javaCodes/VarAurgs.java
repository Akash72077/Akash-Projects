// Varible number of arguments concept is used when we dont know the number of varibale is passed through function like n number of variables

import java.util.Arrays;

public class VarAurgs {

    public static void main(String[] args) {
        
        fun(1,2,3,4,5,6,7,7,33);
    }

    static void fun(int ...v){ // it stores the values in the form of an array
        System.out.println(Arrays.toString(v));

    }
}// Length is not contastant  