#include<stdio.h>
#include<stdlib.h>
//defining the strucutre for node
struct node
{
int data;
struct node *next;
};
int main(){
    //declaring the pointers to the nodes
    struct node* head=NULL;
    struct node* second=NULL;
    struct node* third=NULL;
   // allocate the memory for the nodes
    head=(struct node*)malloc(sizeof(struct node));
    second=(struct node*)malloc(sizeof(struct node));
    third=(struct node*)malloc(sizeof(struct node));
    //assigning the values to the nodes and linking them to the next node
    head->data=10;
    head->next=second;
    second->data=20;
    second->next=third;
    third->data=30;
    third->next=NULL;
    struct node* temp=head;
    while(temp!=NULL){
        printf("%d->",temp->data);
        temp=temp->next;
    }
    printf("NULL\n");
    return 0;
}

