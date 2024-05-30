package com.kriaAppFullStack.kriaAppBackend.controller;

import com.kriaAppFullStack.kriaAppBackend.model.favorites;
import com.kriaAppFullStack.kriaAppBackend.service.favoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class favoritesController {

    @Autowired
    private favoritesService favoritesService;

    // add to favorites
    @PostMapping("/add")
    public ResponseEntity<favorites> addFavorite(@RequestBody favorites favoriteRequest) {
        favorites favorite = favoritesService.addFavorite(
                favoriteRequest.getUserId(),
                favoriteRequest.getBookId(),
                favoriteRequest.getIsFavorite()
        );
        return ResponseEntity.ok(favorite);
    }

    // delete from favorites
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFavorite(@PathVariable Integer id) {
        favoritesService.deleteFavorite(id);
        return ResponseEntity.status(HttpStatus.OK).body("Favorite with ID " + id + " has been deleted.");
    }

    // list all favorites
    @GetMapping
    public ResponseEntity<List<favorites>> getAllFavorites() {
        List<favorites> favoriteList = favoritesService.getAllFavorites();
        return ResponseEntity.ok(favoriteList);
    }

    // list all favorites by userId
    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<favorites>> getFavoritesByUserId(@PathVariable Integer userId) {
        List<favorites> favoriteList = favoritesService.getFavoritesByUserId(userId);
        return ResponseEntity.ok(favoriteList);
    }

    @GetMapping("/bookId/{bookId}")
    public ResponseEntity<List<favorites>> getFavoritesByBookId(@PathVariable Integer bookId) {
        List<favorites> favoriteList = favoritesService.getFavoritesByBookId(bookId);
        return ResponseEntity.ok(favoriteList);
    }
}
