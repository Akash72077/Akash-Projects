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

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.lang.model.element.ElementKind;

// @Target(ElementType.TYPE)// Type includes Class, interface (including annotation interface), enum, or record declaration
// what if we want to use all annotations for all such as fields class and constructors  the solution is the
// instead of using () outside of Element. use({}) braces inside og () and write all as below example.
@Target({ElementType.TYPE,ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@interface CricketPlayer{
    int age() default 34;
    String country() default "India";
}


@CricketPlayer
class Rohit
{
    int runs;
    int innings;
@CricketPlayer
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
public class Annotations {
    public static void main(String[] args) {


        Rohit r= new Rohit();//object
        r.setRuns(342);
        r.setInnings(35);

        System.out.println(r.getRuns());
        System.out.println(r.getInnings());
    }
}