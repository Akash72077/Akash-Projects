
class bitWise {
    public static void main(String[] args) {
        int a=5, b=6;
        
        System.out.println(a&b);
        System.out.println(a|b);
        System.out.println(a^b);
        //not of a
        // if msb=1 then it is negative number
        // if msb=0 then it is postive number 
        System.out.println(~a);
        //left shift a<<b then formula is a * 2 power b
        
        System.out.println(a<<b);
        //Right sift a>>b then formula is a / 2 power b
        System.out.println(a>>b);
        
    }
}

