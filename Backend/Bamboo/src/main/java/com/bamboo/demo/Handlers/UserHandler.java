package com.bamboo.demo.Handlers;

import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.UserRepo;

import java.util.Optional;

public class UserHandler {
    private UserRepo userRepo;

    public UserHandler(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    //login the user
    public User loginUser(String email, String password) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByEmail(email);
        if (!user.isPresent()) {
            throw new IllegalAccessException("This email isn't registered yet");
        }
        if (!user.get().getEncryptedPassword().equals(password)) {
            throw new IllegalAccessException("Wrong password");
        }
        return new User(email, password);
    }
}
