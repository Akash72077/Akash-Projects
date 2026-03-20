// constructor calls automatically when the object is being created
#include<iostream>
using namespace std;
class Car{
string name;
string colour;

    public:
    Car(){
        cout<<"non parameterised constructor"<<endl;
    }
    Car(string name, string colour){

        cout<<"constructor is called.  object being created"<<endl;
        this->name=name;
        this->colour=colour;
    }
    void start(){
        cout<<"Car is started"<<endl;
    }
    void stop(){
        cout<<"Car is stopped"<<endl;
    }
    string getName(){
        return name;
    }
    string getColour(){
        return colour;

    }

};
int main(){
    Car c0;
     Car c1("Thar","Black");
     cout<<"car name: "<<c1.getName()<<endl;
     cout<<"car colour: "<<c1.getColour()<<endl;


    return 0;

}