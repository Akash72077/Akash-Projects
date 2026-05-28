import java.util.HashMap;
public class LearnMap2 {
    public static void main(String[] args) {
        HashMap<Integer, Integer> hm =new HashMap<>();
        // put has time complexity O(1)
        hm.put(1,100);
        hm.put(1,1000);
        // get has time complexity O(1)
        int temp=hm.get(1);
        hm.put(1,1000/10);
        System.out.println(temp);

        // using containsKey
        System.out.println(hm.get(4));// returns null if not found
        // int temp3=hm.get(6);// int cannot store null  so it will get error
        Integer temp2=hm.get(6);//Integer wrapper class can store the value of null
        System.out.println(temp2);
        // using containsKey()

        // contians has time complexity O(1)
        if(hm.containsKey(3)){
            System.out.println("True");
        }else{
            System.out.println("False");
        }

        // using contains value 
        // get has time complexity O(1)
        if(hm.containsValue(100)){
            System.out.println("False");
        }else{
            System.out.println("False");
        }
        int arr[]={1,2,3};
        for(int i:arr){
            System.out.println(i);
        }


        // we can directly print hashmap
        System.out.println(hm);


        //implementation of size
        System.out.println(hm.size());


        //implementation of IsEmpty
        System.out.println(hm.isEmpty());// returns true if hashmap is empty

        //implementation if clear 
        hm.clear();
        System.out.println(hm.isEmpty());        
    }
}