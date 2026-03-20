import java.util.*;
public class reArrganePosAndNeg {
    public static void main(String[] args) {
        ArrayList<Integer> main= new ArrayList<>(List.of(1, 2,-3, -4, 5, -6, 7, -8, -9));
        ArrayList<Integer> pos= new ArrayList<>();
        ArrayList<Integer> neg= new ArrayList<>();
        ArrayList<Integer> newArr= new ArrayList<>();
        int length= main.size();

        for(int i=0; i<length; i++){
            if(main.get(i)>0){
                pos.add(main.get(i));
            }
            else{
                neg.add(main.get(i));
            }
        }
        System.out.println("The postive array: "+pos + "\nThe negative array is: "+ neg);
        int i=0, j=0;
        while(i<pos.size() && j< neg.size()){
            newArr.add(pos.get(i++));
            newArr.add(neg.get(j++));
        }
        while(i<pos.size()){
            newArr.add(pos.get(i++));
        }
        while(j<neg.size()){
            newArr.add(neg.get(j++));
        }   
        System.out.println("The new array will be "+newArr);

    }
}
