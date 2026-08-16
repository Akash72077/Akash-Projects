package com.guesstheword.guess_the_word.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Random;
@Service
public class GameService {

    private String randomlyChoosenWord=null;

    private String[] randomWords = {
            "apple",
            "banana",
            "orange",
            "mango",
            "grapes",
            "watermelon",
            "pineapple",
            "strawberry",
            "cherry",
            "lemon",

            "tiger",
            "lion",
            "elephant",
            "giraffe",
            "monkey",
            "rabbit",
            "elephant",
            "penguin",
            "dolphin",
            "crocodile",

            "dog",
            "cat",
            "horse",
            "cow",
            "goat",
            "sheep",
            "zebra",
            "kangaroo",
            "panda",
            "bear",

            "computer",
            "keyboard",
            "mouse",
            "laptop",
            "mobile",
            "camera",
            "printer",
            "robot",
            "rocket",
            "internet",

            "school",
            "college",
            "hospital",
            "library",
            "airport",
            "station",
            "restaurant",
            "market",
            "office",
            "stadium",

            "mountain",
            "forest",
            "ocean",
            "river",
            "island",
            "desert",
            "waterfall",
            "volcano",
            "rainbow",
            "cloud",

            "pizza",
            "burger",
            "sandwich",
            "noodles",
            "chocolate",
            "cookie",
            "popcorn",
            "pancake",
            "icecream",
            "biryani",

            "guitar",
            "piano",
            "drum",
            "violin",
            "football",
            "cricket",
            "basketball",
            "tennis",
            "badminton",
            "swimming",

            "book",
            "pencil",
            "bottle",
            "chair",
            "table",
            "window",
            "mirror",
            "umbrella",
            "backpack",
            "watch"
    };

    private char[] allCharactersOfTheWords;

    Random random= new Random();

    public GameService() {
            randomlyChoosenWord=randomWords[random.nextInt(randomWords.length)];
//        System.out.println(randomlyChoosenWord);
            allCharactersOfTheWords= new char[randomlyChoosenWord.length()];
    }

    @Override
    public String toString() {
        String ret="";

        for(char c: allCharactersOfTheWords){
            if(c=='\u0000'){
                ret=ret+'_';
            }
            ret+=' ';
        }
        return ret;
    }
}
