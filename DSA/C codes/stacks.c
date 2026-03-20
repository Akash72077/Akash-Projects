#include<stdio.h>
#include<stdlib.h>
#define SIZE 100

int value;
int stack[SIZE];
int top = -1;

void push() {
    if (top == SIZE - 1) {
        printf("Stack overflow\n");
    } else {
        printf("Enter the value to push: ");
        scanf("%d", &value);
        stack[++top] = value;
        printf("Value pushed: %d\n", value);
    }
}

void pop() {
    if (top == -1) {
        printf("Stack underflow\n");
    } else {
        printf("Value popped: %d\n", stack[top--]);
    }
}

void display() {
    if (top == -1) {
        printf("Stack is empty\n");
    } else {
        printf("Stack elements: ");
        for (int i = 0; i <= top; i++) {
            printf("%d ", stack[i]);
        }
        printf("\n");
    }
}

int main() {
    int choice;
    while (1) {
        printf("Enter your choice (1: Push, 2: Pop, 3: Display, 4: Exit): ");
        scanf("%d", &choice);
        switch (choice) {
            case 1:
                push();
                break;
            case 2:
                pop();
                break;
            case 3:
                display();
                break;
            case 4:
                printf("Exiting the program\n");
                return 0;
            default:
                printf("Invalid choice, please try again\n");
                break;
        }
    }
    return 0;
}