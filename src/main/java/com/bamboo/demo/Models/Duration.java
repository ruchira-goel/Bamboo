package com.bamboo.demo.Models;

public enum Duration {
    WEEK("Week"),
    DAY("Day");

    String name;

    Duration(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

    //Following code is from user matzeihnsein from
    //https://stackoverflow.com/questions/8389150/java-enum-elements-with-spaces
    public static Duration valueOfDuration(String value) {
        for (Duration duration: Duration.class.getEnumConstants()) {
            if (duration.toString().equals(value)) {
                return duration;
            }
        }
        throw new IllegalArgumentException("Duration not found");
    }

    public static Duration fromString(String name) {
        for (Duration duration : Duration.values()) {
            if (duration.name.equalsIgnoreCase(name)) {
                return duration;
            }
        }
        return null;
    }
}
