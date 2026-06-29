package com.Learn;

import java.util.Scanner;

public class NToOne {
    static void printDecreasing(int n){
        if(n==1){
            System.out.println(n);
            return;
        }
        System.out.println(n);
        printDecreasing(n-1);

    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter N value to print from N to 1: ");
        int n=sc.nextInt();
        System.out.println("The values from "+n+" to 1 are: ");
        printDecreasing(n);

    }

    public static class OneToN {
        static void printIncreasing(int n){
            if(n==1){
                System.out.println(n);
                return;
            }
            printIncreasing(n-1);
            System.out.println(n);

        }
           public static void main(String[] args) {
            Scanner sc=new Scanner(System.in);
            int n=sc.nextInt();
            printIncreasing(n);
            sc.close();
        }
    }
}
