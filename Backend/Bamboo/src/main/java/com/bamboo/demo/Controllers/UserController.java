package com.bamboo.demo.Controllers;

import com.bamboo.demo.Handlers.UserHandler;
import com.bamboo.demo.Models.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class UserController {
    private UserHandler userHandler;

    public UserController(UserHandler userHandler) {
        this.userHandler = userHandler;
    }

    @RequestMapping("/User/login")          //login request
    public User login(@RequestParam(value="email") String email,
                      @RequestParam(value="encryptedPassword") String encryptedPassword) throws IllegalAccessException {
        return this.userHandler.loginUser(email, encryptedPassword);
    }
}
