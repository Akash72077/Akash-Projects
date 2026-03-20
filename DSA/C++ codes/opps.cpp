#include <iostream>
#include<string>
using namespace std;
class student{
    //properties
    public :
    string name;
    double cgpa;
    string roll_no;

    student(string name, double cgpa,string roll_no){
        this->name=name;
        this->cgpa=cgpa;
        this->roll_no=roll_no;
        
    }
    void getInfo(){
        cout<<"Name : "<<name<<endl;
        cout<<"Cgpa : "<<cgpa<<endl;
        cout<<"roll no : "<<roll_no<<endl;

    }
};
int main()
{
   student s1("sai",9.1,"248R1A0518");
   s1.getInfo();
    return 0;
}