import java.util.ArrayList;

public class twoDList {
    public static void main(String[] args) {
        ArrayList<ArrayList<Integer>> arr= new ArrayList<>();
        arr.add(new ArrayList<>());
        arr.add(new ArrayList<>());
        arr.add(new ArrayList<>());
        arr.get(0).add(10);
        arr.get(1).add(20);
        arr.get(2).add(30);
        System.out.println(arr);
        System.out.println(arr.get(0));
        System.out.println(arr.get(1));
        System.out.println(arr.get(2));


    }
}
