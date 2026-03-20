// /*Structures are used to storing data of same data type in c++ and java.
//  we can call it as class if we learn Structures classes is very easy to understand*/

// #include<stdio.h>
// int main(){
//    struct fighter{// we have made a user defined data type
//        int hp;
//        int speed;
//        int attack;
//        int level;
//    };
//    struct fighter sai;
//    sai.attack=100;
//    sai.hp=200;
//    sai.speed=80;
//    sai.level=1;
//    printf("Sai skills are:\n");
//    printf("%d\n%d\n%d\nLevel: %d\n",sai.hp,sai.speed,sai.attack,sai.level);
//    struct fighter akash;
//    akash.attack=200;
//    akash.hp=250;
//    akash.speed=100;
//     akash.level=2;
//    printf("Akash skills are:\n");
//    printf("%d\n%d\n%d\nLevel: %d\n",akash.hp,akash.speed,akash.attack,akash.level);
//    struct fighter venkat;
//    venkat.attack=300;
//     venkat.hp=300;
//     venkat.speed=120;
//     venkat.level=3;
//    printf("Venkat skills are:\n");
//     printf("%d\n%d\n%d\nLevel: %d\n",venkat.hp,venkat.speed,venkat.attack,venkat.level);


   
//     return 0;
// }

// probelm on structures
// create a structure type book with name ,price,and number of pages as its attributes.
// #include<stdio.h>
// #include<string.h>
// int main(){
//     struct book{
//         char name[15];
//         char author[20];
//         int price;
//         int pages;
//     } book1, book2,book3;
//     strcpy(book1.name,"C programming");
//     strcpy(book1.author,"Dennis Ritchie");
//     book1.price=500;
//     book1.pages=200;
//     printf("Book1 details are:\n");
//     printf("Name: %s\nAuthor: %s\nPrice: %d\nPages: %d\n",book1.name,book1.author,book1.price,book1.pages);
//     strcpy(book2.name,"C++ programming");
//     strcpy(book2.author,"Bjarne Stroustrup");
//     book2.price=600;
//     book2.pages=300;
//     printf("Book2 details are:\n");
//     printf("Name: %s\nAuthor: %s\nPrice: %d\nPages: %d\n",book2.name,book2.author,book2.price,book2.pages);
//      strcpy(book3.name,"Java programming");
//     strcpy(book3.author,"James Gosling");
//     book3.price=700;
//     book3.pages=400;
//     printf("Book3 details are:\n");
//     printf("Name: %s\nAuthor: %s\nPrice: %d\nPages: %d\n",book3.name,book3.author,book3.price,book3.pages);

//     return 0;
// }
// another problem on structures
// find the error 
// struct emp{
//     int ecode;
//     struct emp e;
// }
// elements are stored in a continious memory location in structures
// #include<stdio.h>
// typedef float real;
// int main(){
//     real a=10.5;
//     printf("%f",a);
//     return 0;
// }


