class Human{
    private int age;
    private String name;
    public void setAge(int age){
    this.age=age;  
    }

    public int getAge(){
        return age;
    }
    
    public void setName(String name){
    this.name=name;  
    }
    public String getName(){
        return name;
    }
    
}

public class Encapsulation {
    public static void main(String[] args) {
        Human Akash = new Human();
        Akash.setAge(10);
        System.out.println(Akash.getAge());
        Akash.setName("Akash");
        System.out.println(Akash.getName());
    }
}
