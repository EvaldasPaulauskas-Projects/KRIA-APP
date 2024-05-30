package com.kriaAppFullStack.kriaAppBackend.controller;

import com.kriaAppFullStack.kriaAppBackend.model.comments;
import com.kriaAppFullStack.kriaAppBackend.service.commentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class commentsController {

    @Autowired
    private commentsService commentsService;

    // add comment
    @PostMapping("/add")
    public comments addComment(@RequestBody comments newComment) {
        return commentsService.addComment(newComment);
    }

    // get comment by userId
    @GetMapping("/user/{userId}")
    public List<comments> getCommentsByUserId(@PathVariable Integer userId) {
        return commentsService.getCommentsByUserId(userId);
    }

    // get comment by username
    @GetMapping("/username/{username}")
    public List<comments> getCommentsByUsername(@PathVariable String username) {
        return commentsService.getCommentsByUsername(username);
    }

    // list all comments
    @GetMapping
    public List<comments> getAllComments() {
        return commentsService.getAllComments();
    }

    // get comment by id
    @GetMapping("/{id}")
    public Optional<comments> getCommentById(@PathVariable Integer id) {
        return commentsService.getCommentById(id);
    }


    // edit comment by id
    @PutMapping("/edit/{id}")
    public comments updateComment(@PathVariable Integer id, @RequestBody comments updatedComment) {
        return commentsService.updateComment(id, updatedComment);
    }


    // delete comment by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer id) {
        commentsService.deleteComment(id);
        return ResponseEntity.status(HttpStatus.OK).body("Comment with ID " + id + " has been deleted.");
    }

    // like comment by comment id
    @PostMapping("/like/{id}")
    public comments likeComment(@PathVariable Integer id) {
        return commentsService.likeComment(id);
    }

    // dislike comment by comment id
    @PostMapping("/dislike/{id}")
    public comments dislikeComment(@PathVariable Integer id) {
        return commentsService.dislikeComment(id);
    }

    // unlike comment by comment id
    @PostMapping("/unlike/{id}")
    public comments unlikeComment(@PathVariable Integer id) {
        return commentsService.unlikeComment(id);
    }

    // undislike comment by comment id
    @PostMapping("/undislike/{id}")
    public comments undislikeComment(@PathVariable Integer id) {
        return commentsService.undislikeComment(id);
    }
}