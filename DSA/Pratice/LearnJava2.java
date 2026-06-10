
class student{

      int roll;
    String name; 
    int age;

    student(int roll,String name,int age){
        this.roll=roll;
        this.name=name;
        this.age=age;
    }
   
}

public class LearnJava2 {
    public static void main(String[] args) {
        student obj= new student(5, "Charan", 19);
        System.out.println(obj.roll);
        System.out.println(obj.name);
        System.out.println(obj.age);
    }
}