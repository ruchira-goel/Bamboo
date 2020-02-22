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
            throw new IllegalAccessException("You entered the wrong password!");
        }
        return user.get();
    }

    //new user signup
    public User signupUser(String name, String email, String password) throws IllegalAccessException {
        Optional<User> user = this.userRepo.findByEmail(email);
        if (user.isPresent()) {
            throw new IllegalAccessException("This email is already registered. Try the login page instead");
        }
        if (password.length() < 8) {
            throw new IllegalAccessException("Your password is not valid! Make sure it ___");
        }
        User newUser = new User(email, password);
        newUser.setName(name);
        return this.userRepo.save(newUser);
    }
}
