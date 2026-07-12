// prereqisites are interfaces and basic java
/* Defination:
                An annotations is a piece of metadata(information about your code)
        It gives instructions to:
            *)The compiler
            *)The JVM
            *) or frame works like (Spring , Hibernate)
            
        Annotations do not directly change the program logic. They provide extra information that tools or frame works can use.

    Syntax:
        Annotations starts with '@'
        '@'->This symbol indicates compiler that this is not an interface an annotation type is being created

    Example:

    @Override
    public void display() {

    }

*/  

@interface CricketPlayer{
    int age();
    String country();
}

class Rohit
{
    int runs;
    int innings;

    public void setRuns(int runs){
        this.runs=runs;
        
    }
    public void setInnings(int innings){
        this.innings=innings;
    }


    public int getRuns(){
        return runs;
    }

     public int getInnings(){
        return innings;
    }
}
public class annotations {
    public static void main(String[] args) {


        
    }
}