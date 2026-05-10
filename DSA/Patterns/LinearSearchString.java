import java.lang.reflect.Array;
import java.util.Arrays;

public class LinearSearchString {
    public static void main(String[] args) {
        String name = "Dudigam Venkata Sai Akash";
        System.out.println(search(name, 'p'));
        System.out.println(Arrays.toString(name.toCharArray()));
    }
    static boolean search(String str, char target){
        if(str.length()==0|| str==null)
            return false;
        // using for loop 
        // for(int i=0; i<str.length(); i++){
        //         if(str.charAt(i)==target){
        //             return true;
        //         }
        //     }
        // return false;
        // code using echanced for loop or for each loop 
        for(char ch: str.toCharArray() ){
            if(ch==target){
                return true;
            }
           
        }
         return false;
    }
}
