import java.util.ArrayList;
import java.util.List;

class sai{
   
    public static void main(String[] args) {
        int count =0;
       ArrayList<Integer> arr= new ArrayList<>(List.of(1, 0,2,0,4,3,0,5));
       ArrayList<Integer> arrCopy = new ArrayList<>();
       for(int i=0; i<arr.size(); i++){
        if(arr.get(i)==0){
            count++;
        }
        else{
            arrCopy.add(arr.get(i));
        }

       }
       for(int i=0; i<count; i++){
       arrCopy.add(0);
            
        }
        System.out.println("the number of zeros ="+count);
        System.out.println("the new array will be: "+arrCopy);
       }

    }
