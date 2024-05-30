package com.kriaAppFullStack.kriaAppBackend.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "stars")
@Data
public class stars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private Integer bookId;
    private Float starRatings;

    public stars(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Float getStarRatings() {
        return starRatings;
    }

    public void setStarRatings(Float starRatings) {
        this.starRatings = starRatings;
    }
}
