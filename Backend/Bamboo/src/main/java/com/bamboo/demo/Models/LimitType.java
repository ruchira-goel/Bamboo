package com.bamboo.demo.Models;

public enum LimitType {
    LESSTHAN("Less than"),
    GREATERTHAN("Greater than");

    String name;

    LimitType(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

    //Following code is from user matzeihnsein from
    //https://stackoverflow.com/questions/8389150/java-enum-elements-with-spaces
    public static LimitType valueOfLimitType(String value) {
        for (LimitType limitType : LimitType.class.getEnumConstants()) {
            if (limitType.toString().equals(value)) {
                return limitType;
            }
        }
        throw new IllegalArgumentException("Limit Type not found");
    }

    public static LimitType fromString(String name) {
        for (LimitType limitType : LimitType.values()) {
            if (limitType.name.equalsIgnoreCase(name)) {
                return limitType;
            }
        }
        return null;
    }
}
