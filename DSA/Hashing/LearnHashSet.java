import java.util.HashSet;
public class LearnHashSet {
public static void main(String[] args) {
    HashSet<String> st= new HashSet<>();
    st.add("sai");
    st.add("akash");
    st.add("ramesh");
    st.add("ganesh");
    System.out.println(st);
    // we use put for hashmap and we will pass 2 
    // arguments there but in hashset we have to
    //  use add to insert values and one value 
    // should be passed
    st.add("ramesh");
    st.add("akash");
    //added repeated values
    System.out.println(st);
   
}
}