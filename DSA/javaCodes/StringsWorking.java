public class StringsWorking {
    public static void main(String[] args) {
        // String str1= "Tony";//
        // String str2= "Tony";// str 1 and str2 stores in the same memory
        // String str3= new String("Tony");// but str 3 stores in different memory
        StringBuilder sb= new StringBuilder();
        //sb.toString();
       // System.out.println(sb.getClass().getName());
        // int a=10;
        // a.toString(); int cannot be converted to toSTring but Integer can be coverted to toString(); the example is given below
        // Integer a=10;
        // a.toString(); it is possible
        // similarly char cannot be changed using toString where as Character can be convertd
        for(char ch ='a'; ch<='z'; ch++){
            sb.append(ch);
        }// time complexity is O(26)

        System.out.println(sb);
        System.out.println(sb.length());
    }
}
