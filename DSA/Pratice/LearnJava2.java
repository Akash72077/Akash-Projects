class addtion {
    // construtor without parameters or default constructor 
        addtion(){
            System.out.println("Constructor is called");
         }
          // construtor with parameters or explicit constructor
         addtion(int a, int b){
            System.out.println(a+b);
         }
          addtion(double a, double b){
            System.out.println(a+b);
         }
}
public class LearnJava2 {
    public static void main(String[] args) {
        // className obj = new ClassName();
        addtion add= new addtion();
        addtion odd2= new addtion(1,2);
        addtion odd3= new addtion(1.5,2);


    }
}
