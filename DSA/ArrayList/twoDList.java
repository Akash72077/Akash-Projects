import java.util.ArrayList;

public class twoDList {
    public static void main(String[] args) {
        ArrayList<ArrayList<Integer>> arr= new ArrayList<>();
        arr.add(new ArrayList<>());
        arr.add(new ArrayList<>());
        arr.add(new ArrayList<>());
        arr.getFirst().add(10);
        arr.getFirst().add(20);
        arr.get(0).add(3);
        arr.get(0).add(40);
        arr.get(1).add(53);
        arr.get(1).add(43);
        arr.get(1).add(45);
        arr.get(1).add(67);
        arr.get(2).add(36);
        arr.get(2).add(675);
        arr.get(2).add(465);
        arr.get(2).add(45);
        arr.get(2).add(346);
        for(int i=0; i<arr.size(); i++){
            for(int j=0; j<arr.get(i).size(); j++){
                System.out.print(arr.get(i).get(j)+" ");
            }
            System.out.println();
        }

    }
}
