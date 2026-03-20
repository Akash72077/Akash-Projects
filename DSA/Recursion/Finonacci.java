public class Finonacci {
public static int printfb(int n){
    if(n==1){
    return 1;
    }
    if(n==0){
    return 0;
    }
    else{
         int fbn=printfb(n-1)+printfb(n-2);
         return fbn;
    }

    }
    public static void main(String[] args) {
       for(int i=0;i<10; i++){
        System.out.print(printfb(i)+" ");
       }
    }
}
