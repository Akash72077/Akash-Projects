 /* The OOPS concepts contains majorly 4 topics 
 * Encapsulation: Encapsulation is defined as the wrapping up 
 of data & methods under a single unit . It also implements data hiding
 for example" encapsuling data(properties) and methods(functions)
 * Inheritance
 * Abstraction
 * Polymorphism
*/
/*Constructors:
 Constructor is a special method which is invoked automatically at the 
 time of creation
 --Constructors have the same name as class or structure.
 --Constructors don't have a return type. (Not even void)
 --Constructors are only called once, at Object creation.
 --Memory allocation happends when constructor is called.
*/
/*
 * Constructors are 3 types: 
 1) Non-Parameterized 
 2) Parameterized
 3)Copy Constructor : copying of one Oject Constructor data to another oject
 */
public class Oops {
    public static void main(String[] args) {
        Pen p1=new Pen();// we have created a pen object called p1
        p1.setColour("Black");
       // System.out.println(p1.getColour());
      //  System.out.println(p1.colour);
        p1.setTop(5);
        //System.out.println(p1.tip);

       // Bankaccount myAcc= new Bankaccount();
        // myAcc.username="Akash";
        // myAcc.setPassword("Akash@12345");
        Student s1=new Student();
        s1.name="Akash";
        s1.roll=518;
        s1.password="sai";
        s1.marks[0]=100;
        s1.marks[1]=90;
        s1.marks[2]=95;
        Student s2= new Student(s1);
        s2.password="xyz";
        for(int i=0;i<3; i++){
            System.out.print(s2.marks[i]+" ");
        }
        
    }
    
}
/*There are four types for access specifiers
 * Private
 * Default
 * Protected
 * Public
*/

class Student{
    String name;
    int roll;
    String password;
    int marks[];

    //copy constructor
    Student(Student s1){
        marks=new int[3];
        this.name=s1.name;
        this.roll=s1.roll;
        this.marks=s1.marks;
        
    }   
     Student(){
       // System.out.println("Constructor is called");


    }
    int age;
    float percentage;
    void calcPercentage(int phy ,int chem, int math){
        percentage=(phy+chem+math)/3;

    }
}

/*Usally there are two types of functions in OOPS :
* Getters: to return the value
* Setters : to modify the value
 */
// this: this keyword is used to refer to the current object
class Pen{
    String colour;
    int tip;
    String getColour(){
        return this.colour;
    }
    void setColour(String newColour){
        colour=newColour;

    }
    void setTop(int newTip){
        tip=newTip;

    }

}
// class Bankaccount{
//    public String username;
//     private String password;
//     public void setPassword(String pwd){
//        password=pwd;

//     }
// }