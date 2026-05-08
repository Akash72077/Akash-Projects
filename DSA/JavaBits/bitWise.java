
class bitWise {
    public static void main(String[] args) {
        int a=5, b=6;
        System.out.println(a&b);
        System.out.println(a|b);
        System.out.println(a^b);
        //not of a
        // if msb=1 then it is negative number
        // if msb=0 then it is postive number
        //for ~5 is converted from 00000101 to 11111010 we can find that -ve number using 2's complement
        // example : 2's complement = 1's complement+1 
        // 11111010-> 1's complement -> 00000101 
        //00000101+1=> 00000110 it is 6 so the number will be -6 
        System.out.println(~a);
        //left shift a<<b then formula is a * 2 power b
        
        System.out.println(a<<b);
        //Right sift a>>b then formula is a / 2 power b
        System.out.println(a>>b);        
    }
}

