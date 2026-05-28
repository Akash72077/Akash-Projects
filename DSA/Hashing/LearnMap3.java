import java.util.HashMap;
import java.util.Set;
public class LearnMap3 {
    public static void main(String[] args) {
        HashMap<Integer,Integer> hm= new HashMap<>();
        Set<Integer>keys=hm.keySet();
        hm.put(1,20);
        hm.put(2,40);
        hm.put(6,50);
        hm.put(4,60);
        hm.put(9,90);
        //key set makes all the keys in a hashmap as a set
        for(int i:hm.keySet()){
            System.out.println("Key: "+i+"->"+"Value: "+hm.get(i));
        }
        System.out.println(keys);
    }
}