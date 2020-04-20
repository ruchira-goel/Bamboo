package com.bamboo.demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ResetPassword {

    @RequestMapping(path="/resetPassword/{userId}")
    public String greeting(Model model, @PathVariable("userId") String userId) {
        model.addAttribute("name", "Hajera");
        return "resetPassword";
    }
}
