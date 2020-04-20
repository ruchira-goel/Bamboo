package com.bamboo.demo.Models;

import java.time.LocalDateTime;
import java.util.UUID;

public class Token {

    private UUID uuid;
    private LocalDateTime date;

    public Token(UUID uuid, LocalDateTime date) {
        this.uuid = uuid;
        this.date = date;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
