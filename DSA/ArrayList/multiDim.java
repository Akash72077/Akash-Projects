import java.util.*;
public class multiDim {
    public static void main(String[] args) {
      ArrayList<ArrayList<Integer>> mainlist= new ArrayList<>();  
      ArrayList<Integer> list = new ArrayList<>();
      list.add(1); list.add(2);
      mainlist.add(list);
       ArrayList<Integer> list2 = new ArrayList<>();
       list2.add(3);
       list2.add(4);
       mainlist.add(list2);
       System.out.println(mainlist);
       for(int i=0; i<mainlist.size(); i++){
        ArrayList<Integer> currList= mainlist.get(i);
        for(int j=0; j<currList.size(); j++){
            System.err.print(currList.get(j)+" ");
        }
        System.out.println();
       }

    }
}
