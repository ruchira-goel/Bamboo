package com.bamboo.demo;

import com.bamboo.demo.Models.Token;
import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

//Source: https://www.youtube.com/watch?v=9DLX8PMXaw0

@Component
public class EmailSender {
    private UserRepo userRepo;

    @Autowired
    public JavaMailSender emailSender;

    public EmailSender(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public boolean sendSimpleMessage(String email) throws MessagingException, IllegalAccessException {
        Optional<User> user = this.userRepo.findUserByEmail(email);
        if (!user.isPresent()) {
            throw new IllegalAccessException("This email isn't registered yet");
        }
        Token token = new Token(UUID.randomUUID(), LocalDateTime.now());
        user.get().setToken(token);
        this.userRepo.save(user.get());
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setSubject("Reset Password");
            helper.setTo(email);
            helper.setText("<html><body>Hi,<br/><a href='http://localhost:8080/resetPassword/"+email+"/"+ user.get().getToken().getUuid()+ "'>Click here</a> to reset your password",true);

            emailSender.send(mimeMessage);
        } catch(MessagingException exception) {
            throw new MessagingException("Couldn't send email");
        }
        return true;

    }

}
