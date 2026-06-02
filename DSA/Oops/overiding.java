// Parent Class
class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound...");
    }
}

// Child Class (inherits from Animal)
class Dog extends Animal {
    @Override // Good practice to ensure the compiler checks your work
    public void makeSound() {
        System.out.println("Woof! Woof!");
    }
}

// Usage
public class overiding {
    public static void main(String[] args) {
        Animal myDog = new Dog(); // Parent reference pointing to a Child object
        myDog.makeSound(); // Output will be: "Woof! Woof!"
    }
}
