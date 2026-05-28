import java.util.HashMap;
import java.util.Map;

public class LearnMap4 {
    public static void main(String[] args) {
        HashMap<String,Integer> fruitCount= new HashMap<>();

        fruitCount.put("Apple", 10);
        fruitCount.put("Orange",15); 
        fruitCount.put("Banana",20);
        fruitCount.put("Mango",11);


        // iterating values using for each
        for(String i:fruitCount.keySet()){
            System.out.println("Key: "+i+" & Value: "+fruitCount.get(i));
        }

        //iterating using map and entry set
        for(Map.Entry<String,Integer> i:fruitCount.entrySet()){
            System.out.println("Key: "+i.getKey()+", Value: "+i.getValue());
        }
    }
}
