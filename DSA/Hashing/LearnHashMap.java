import java.util.HashMap;
public class LearnHashMap {
    public static void main(String[] args) {
        HashMap<Integer, Integer> hm= new HashMap<>();
        // here hm is the name of hashmap 
        // in <Integer(1), Integer(2)> : here 1 is the data type of key and 2 is the data type for value  

        // Hashmap is used when they ask for:
        // fast searching or lookup
        // store key-value pairs 
        //count frequencies
        // //check duplicates 
        // store relationships/mappings
        // find element quickly in O(1) time complexity

        // Common keywords in questions 
        // frequencies/count
        // duplicates
        // lookup/search
        // pair/sum
        // mapping
        // occurrence

        //important methods of hashmap

    // put(key,value)= insert or update data 
    // get(key)= retrive value using key
    // remove(key)= Delete entry 
    // containsKey(key)=check if key exists
    // containsValue(value)=checks if value exists
    // getOrDefault(key, default)= return default value if key not found 
    // size()--> Return number of entires 
    // clear()--> Remove all entires
    // keySet()--> get all keys
    // values()--> get all values
    // entrySet()--> Get all key-value pairs

    //hashmap put values
    hm.put(1,100);
    //hashmap get values
    System.out.println(hm.get(1));

    // creating hashmap as a String data type key
    // hms=hashmap string
    HashMap<String, Integer> hms=new HashMap<>();
    hms.put("Apple", 90);
    hms.put("Orange", 150);
    System.out.println(hms.get("Orange"));
    System.out.println(hms.get("Apple"));
    }
}
