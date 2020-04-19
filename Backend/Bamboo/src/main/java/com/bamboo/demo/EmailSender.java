package com.bamboo.demo;

import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

//Source: https://www.youtube.com/watch?v=9DLX8PMXaw0

@Component
public class EmailSender {
    private UserRepo userRepo;

    @Autowired
    public JavaMailSender emailSender;

    public EmailSender(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public void sendSimpleMessage(String userId) throws MessagingException {
        User user = this.userRepo.findUserByUserId(userId);

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        String link = ""; //TODO: Prepare link to redirect to password entering page

        helper.setSubject("Reset Password");
        helper.setTo(user.getEmail());
        helper.setText("Reset your password here" + link, true);

        emailSender.send(mimeMessage);

    }

}
