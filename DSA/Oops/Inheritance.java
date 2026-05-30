class Calculator{
    public int add(int n1, int n2)
    {
        return n1+n2;
    }
      public int sub(int n1, int n2)
    {
        return n1-n2;
    
    }
}


public class Inheritance {
    public static void main(String[] args) {
        //Dfination : inheritance is the aquiring properties from one class to another class
        Calculator cal= new Calculator(); 
        System.out.println(cal.add(1, 6));
        System.out.println(cal.sub(100, 6));
    }
}
