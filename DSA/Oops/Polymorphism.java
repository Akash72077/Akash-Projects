 class A {

    public void show(){
          System.out.println("From class A");

    }
}
class B extends A {

    public void show(){
        System.out.println("From class B");
    }
}
public class Polymorphism {
    public static void main(String[] args) {

        B obj1= new B();// as per method overriding concept the output will be from class B
        obj1.show();
        
    }
}
