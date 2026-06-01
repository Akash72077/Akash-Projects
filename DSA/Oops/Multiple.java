// === EXAMPLE 1: STANDARD INTERFACES ===
interface Walkable {
    void walk();
}

interface Swimmable {
    void swim();
}

// A class implementing multiple standard interfaces
class Duck implements Walkable, Swimmable {
    @Override
    public void walk() {
        System.out.println("The duck is walking.");
    }

    @Override
    public void swim() {
        System.out.println("The duck is swimming.");
    }
}


// === EXAMPLE 2: INTERFACES WITH DEFAULT METHOD CONFLICTS ===
interface Camera {
    default void turnOn() {
        System.out.println("Camera is on.");
    }
}

interface Phone {
    default void turnOn() {
        System.out.println("Phone is on.");
    }
}

// Resolving the diamond problem by overriding the conflicting method
class Smartphone implements Camera, Phone {
    @Override
    public void turnOn() {
        System.out.println("[Smartphone Log] Booting up custom OS...");
        // Explicitly calling the Camera interface's default method
        Camera.super.turnOn(); 
    }
}


// === MAIN EXECUTION CLASS ===
public class Multiple {
    public static void main(String[] args) {
        System.out.println("--- Test 1: Standard Multiple Inheritance ---");
        Duck myDuck = new Duck();
        myDuck.walk();
        myDuck.swim();

        System.out.println("\n--- Test 2: Default Method Conflict Resolution ---");
        Smartphone myPhone = new Smartphone();
        myPhone.turnOn();
    }
}
