//package com.bamboo.demo;
//
//import com.bamboo.demo.Models.User;
//import org.springframework.data.annotation.Id;
//
//import javax.persistence.*;
//import java.util.Date;
//
//@Entity
//public class PasswordResetToken {
//
//    private static final int EXPIRATION = 60 * 24;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    private String token;
//
//    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
//    @JoinColumn(nullable = false, name = "user_id")
//    private User user;
//
//    private Date expiryDate;
//}
