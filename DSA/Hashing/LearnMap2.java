import java.util.HashMap;
public class LearnMap2 {
    public static void main(String[] args) {
        HashMap<Integer, Integer> hm =new HashMap<>();
        hm.put(1,100);
        hm.put(1,1000);
        int temp=hm.get(1);
        hm.put(1,1000/10);
        System.out.println(temp);
    }
}