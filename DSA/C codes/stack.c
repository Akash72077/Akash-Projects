#include<stdio.h>
#include<stdlib.h>
#define SIZE 5
int stack[SIZE];
int top=-1;
int value;
void push(){
    if(top==SIZE-1){
        printf("Stack is oveflow cannot be inserted..\n");
    }
    else{
        top++;
        printf("Enter the value to be inserted: \n");
        scanf("%d",&value);
        stack[top]=value;
        printf("The value inserted successfully\n");
    }
}
void pop(){
    if(top== -1){
        printf("The stack is underflow..\n");
    }
    else{
        printf("The element pop stack is %d.\n", stack[top]);
        top--;
    }
}
void peek(){
    if(top==-1){
        printf("The stack is empty.\n");
    }
    else{
        printf("The top element in the stack is %d\n", stack[top]);
    }
}
void display(){
    if(top==-1){
        printf("The stack is empty\n");
    }
    else{
        printf("The elements in the stack is :\n");
        for(int i=top; i>=0; i--){
            printf("%d\n",stack[i]);
        }
        printf("\n");
    }
    
}
int main(){
    int choice;
    
while(1){
    printf("----------MENU----------\n");
    printf("Choose the operations:\n");
    printf("1.Push\n 2.Pop\n 3.Peek\n 4.Display \n5.Exit\n");
    printf("What is your choice ? \n");
    scanf("%d", &choice);
    switch(choice){
        case 1:
        push();
        break;
        case 2:
        pop();
        break;
        case 3: 
        peek();
        break;
        case 4:
        display();
        break;
        case 5: 
        return 0;
        default: 
        printf("Invalid choice. Enter another choice....");
        }
    }
    return 0;
}