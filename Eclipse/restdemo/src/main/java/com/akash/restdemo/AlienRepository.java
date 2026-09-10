package com.akash.restdemo;

import java.util.ArrayList;
import java.util.List;


public class AlienRepository 
{

	List<Alien> aliens;
	
	public AlienRepository() {
		aliens= new ArrayList<>();
		
		Alien a1= new Alien();
		Alien a2= new Alien();
		Alien a3= new Alien();
		Alien a4= new Alien();
		Alien a5= new Alien();
		a1.setName("Akash");
		a1.setPoints(50);
		a1.setId(1);
		
		a2.setName("Rahul");
		a2.setPoints(70);
		a2.setId(2);

		a3.setName("Ravi");
		a3.setPoints(80);
		a3.setId(3);

		a4.setName("Arjun");
		a4.setPoints(60);
		a4.setId(4);
		
		a5.setName("Sai");
		a5.setPoints(88);
		a5.setId(5);
		
		
		aliens.add(a1);
		aliens.add(a2);
		aliens.add(a3);
		aliens.add(a4);
		aliens.add(a5);
	}
	public List<Alien> getAliens(){
		return aliens;
	}
	public Alien getAlien(int id) {
		
		
		for(Alien a : aliens) {
			if(a.getId()==id) {
				return a;
			}
		}
		return null;
	}
	public void create(Alien a1) {
		
		aliens.add(a1);
		
	}
}
