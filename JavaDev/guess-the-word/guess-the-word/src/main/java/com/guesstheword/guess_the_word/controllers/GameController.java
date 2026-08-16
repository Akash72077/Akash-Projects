package com.guesstheword.guess_the_word.controllers;

import com.guesstheword.guess_the_word.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller

public class GameController {

    @Autowired
    GameService gameService;


    @GetMapping("/game-home")

    public String showGameHomePage(Model model){
      String randomWord= gameService.toString();
        model.addAttribute("wordToDisplay", randomWord);

        return "game-home-page";
    }



}
