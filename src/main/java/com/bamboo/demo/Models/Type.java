package com.bamboo.demo.Models;

public enum Type {
    MEAL("Meal"),
    EXERCISE("Exercise");

    String name;

    Type(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

    //Following code is from user matzeihnsein from
    //https://stackoverflow.com/questions/8389150/java-enum-elements-with-spaces
    public static Type valueOfType(String value) {
        for (Type type: Type.class.getEnumConstants()) {
            if (type.toString().equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Type not found");
    }
}
