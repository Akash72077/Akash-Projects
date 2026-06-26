package com.Akash.SampleApp;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class CalcTest 
{
	@Test
	void testCalc() {
		
		Calc calc= new Calc();
		int actualResult=calc.divide(10,5);
		int expectedResult=5;
		
		assertEquals(expectedResult,actualResult);
	}

}
