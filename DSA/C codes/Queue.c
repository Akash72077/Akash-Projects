#include<stdio.h>
#define MAXSIZE 10
int queue[MAXSIZE];
int rear=-1,front =0;
int choice;
void insert(){
    int n;
    if(rear==MAXSIZE-1){
        printf("queue Overflow");
    }
    else{
        
        printf("Enter an  elements");
        
        
        scanf("%d",&n);
        rear++;
        queue[rear]=n;
    }
}
void delete(){
    int n;
    
    if(front>rear){
        printf("queue is empty");
    }
        else{
            n=queue[front];
            printf("Deleted element %d",n);
            front++;
        }
    }
    

void display(){
    if(front>rear){
        printf("queue is empty");
        
    }
    else{
        printf("queue elements are: ");
        for(int i=rear;  i>=front; i--){
            printf("%d\n",queue[i]);
        }
    }
    }
    
    



void main() {
    do{
	printf("\n ------------Queue------------");
	printf("\n1.Insert \n2.Delete \n3.Display \n4.exit\n");
	printf(" --------------------------------\n");
	printf("Enter your choice: ");
	scanf("%d",&choice);
	switch(choice) {
	case 1:
		insert();
		break;
	case 2:
		delete();       
		break;
	case 3:
		display();
		break;
	default:
		printf("Invalid choice");

}
    
    }while(choice!=4);
	}