package com.bamboo.demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ResetPassword {

    @GetMapping("/resetPassword")
    public String greeting(@RequestParam(name="email") String email, Model model) {
        model.addAttribute("name", email);
        return "resetPassword";
    }
}
