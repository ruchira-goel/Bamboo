package com.bamboo.demo;

import com.bamboo.demo.Models.Token;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Controller
public class ResetPassword {

    private UserRepo userRepo;

    public ResetPassword(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @RequestMapping(path = "/resetPassword/{email}/{uuid}")
    public String greeting(Model model, @PathVariable("uuid") String uuid, @PathVariable("email") String email) {
        User user = this.userRepo.findUserByEmail(email).get();
        if (user.getToken() == null) {
            Token token = new Token(UUID.randomUUID(), LocalDateTime.now());
            user.setToken(token);
            return "resetPassword";
        }
        Token token = user.getToken();
        if (Math.abs(Duration.between(LocalDateTime.now(), token.getDate()).toMinutes()) > 15) {
            return "resetPassword";
        }
        return "timeout";
    }
}
