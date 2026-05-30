public class Inheritance {
    public static void main(String[] args) {
        //Dfination : inheritance is the aquiring properties from one class to another class
        // Calculator cal= new Calculator(); 
        // System.out.println(cal.add(1, 6));
        // System.out.println(cal.sub(100, 6));
        // now we cannot access the operations of calculator 
         AdvCal cal= new AdvCal(); 
        System.out.println(cal.mul(1, 6));
        System.out.println(cal.div(100, 6));
    }
}
