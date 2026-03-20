#include<stdio.h>
#include<stdlib.h>
struct node{
    int data;
    struct  node* next;

};
// declaring the head pointer intially as NULL
struct node* head=NULL;
void printlist(){
//here we are declared  a temporary pointer to the head pointer
// and we are traversing the linked list and printing the data of the nodes
    struct node* temp=head;
    while(temp!=NULL){
        printf("%d->",temp->data);
        temp=temp->next;
    }
    printf("NULL\n");
}
//inserting the node at the beginning of the linked list
// we are passing the data to be inserted as the argument
void insert(int data){
    struct node *new_node=(struct node*)malloc(sizeof(struct node));
    new_node->data=data;
    new_node->next=head;
    head=new_node;

}
int main(){
    insert(10);
    insert(20);
    insert(30);
    insert(40);
    printlist();

    return 0;
}