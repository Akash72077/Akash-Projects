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
    System.out.println(st.contains("sai"));// returns true if it contains the value   
    System.out.println(st.size());// returns size
    st.remove("SAo");// the value does not exixst id does not throws error
    st.remove("akash");// removes the elements 
    System.out.println(st);
    // traversing set
    for(String s:st){
        System.out.println(s);
    }
}
}