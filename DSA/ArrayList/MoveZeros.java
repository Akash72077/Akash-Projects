import java.util.ArrayList;
import java.util.List;

public class MoveZeros {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(List.of(1, 2, 0,4,3,0,5,0));
        ArrayList<Integer> listCopy= new ArrayList<>();
        int count =0;

        count= 0;
        for(int i=0; i<list.size(); i++){

            if(list.get(i)== 0){
                count++;
            }
            else{
               int ele= list.get(i);
                listCopy.add(ele);

            }
            
        }
        for(int i=0; i<count; i++){
                listCopy.add(0);
            }
          System.out.println(listCopy);
    }
}
