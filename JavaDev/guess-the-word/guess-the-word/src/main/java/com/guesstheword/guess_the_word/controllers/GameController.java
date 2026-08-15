package com.guesstheword.guess_the_word.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller

public class GameController {
    @ResponseBody
    @GetMapping("/game-home")

    public String showGameHomePage(){

        return "Showing the game page...";
    }



}
