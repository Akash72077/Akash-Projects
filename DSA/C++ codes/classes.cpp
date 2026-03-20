#include<iostream>

#include<string>
using namespace std;
 class Student{


    string name;
    string roll_no;
    public:
    
    
    string section;
    float cgpa;
    string gender;
    float attendence;
    string blood_group;
    string dob;
    void getPercentage(){
        cout<<(cgpa*10)<<"%"<<endl;
    }
    void update_name(string newname){
         name=newname;

     }
     string getName(){
return name;

     }


};

int main(){
    Student s1;
   // s1.name="D.Venkata Sai Akash";
  //  s1.roll_no="248R1A0518";
    s1.section="CSE-A";
    s1.cgpa=9.1;
    s1.gender="Male";
    s1.attendence=70;
    s1.blood_group="O+";
    s1.dob="24-01-2007";
    //cout<<s1.name<<endl;
    //cout<<s1.roll_no<<endl;
    cout<<s1.section<<endl;
    cout<<s1.cgpa<<endl;
    cout<<s1.gender<<endl;
    cout<<s1.blood_group<<endl;
    cout<<s1.dob<<endl;
    s1.getPercentage();
    s1.update_name("Akash");
   //cout<<s1.name<<endl;
    cout<<s1.getName()<<endl;
    //cout<<s1.getPercentage()<<endl;


    return 0;
}