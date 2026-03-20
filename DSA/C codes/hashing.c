#include<stdio.h>
int hashFunction(int key, int size){
    return key%size;
}
int main(){
    int size,key,n;
    printf("Enter the size of the hash table: \n");
    scanf("%d",&size);
    int hashTable[size];
    for(int i=0; i<size; i++){
        hashTable[i]=-1;
    }
    printf("Enter the number of keys to be inserted: \n");
    scanf("%d",&n);

    printf("Enter the key values to be inserted: \n");
    for(int i=0; i<n; i++){
        printf("Enter key %d: ",i+1);
        scanf("%d",&key);
        int index=hashFunction(key,size);
        if(hashTable[index]==-1){
            hashTable[index]=key;
            printf("Key %d is stored at index %d\n",key,index);
        }else{
            printf("Collision at index %d! key %d is cannot be stored.\n",index,key);
        }
    }
    printf("\n Hash Table:\n");
    for(int i=0; i<size; i++){
        printf("Index %d: %d\n", i,hashTable[i]);
    }
    return 0;
}