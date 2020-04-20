package com.bamboo.demo;

import com.bamboo.demo.Models.User;
import com.bamboo.demo.Repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;

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

        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            String link = "http://localhost:8080/User/"; //TODO: Prepare link to redirect to password entering page

            helper.setSubject("Reset Password");
            helper.setTo(email);
            helper.setText("<html><body>Hi,<br/><a href='http://localhost:8080/resetPassword/"+user.get().getUserId()+"'> Click here</a> to reset password</body></html>",true);

            emailSender.send(mimeMessage);
        } catch(MessagingException exception) {
            throw new MessagingException("Couldn't send email");
        }
        return true;

    }

}
