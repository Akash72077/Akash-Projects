import java.util.HashMap;
public class LearnMap2 {
    public static void main(String[] args) {
        HashMap<Integer, Integer> hm =new HashMap<>();
        hm.put(1,100);
        hm.put(1,1000);
        int temp=hm.get(1);
        hm.put(1,1000/10);
        System.out.println(temp);

        // using containsKey
        System.out.println(hm.get(4));// returns null if not found
        // int temp3=hm.get(6);// int cannot store null  so it will get error
        Integer temp2=hm.get(6);//Integer wrapper class can store the value of null
        System.out.println(temp2);
        // using containsKey()

        if(hm.containsKey(3)){
            System.out.println("True");
        }else{
            System.out.println("False");
        }

        // using contains value 
        if(hm.containsValue(100)){
            System.out.println("False");
        }else{
            System.out.println("False");
        }
        int arr[]={1,2,3};
        for(int i:arr){
            System.out.println(i);
        }
    }
}