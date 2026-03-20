class reverse{
public static void main(String args[]){


 int number=12345;
    int original=number;
     int reverse=0,digit;
     while(number!=0){
       digit=number%10;
         reverse=reverse*10+digit;
         number=number/10;
}
System.out.println("The Original number is: "+original);
System.out.println("The reversed number is: "+reverse);
}

}