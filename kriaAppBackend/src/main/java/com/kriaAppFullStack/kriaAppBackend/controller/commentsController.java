package com.kriaAppFullStack.kriaAppBackend.controller;

import com.kriaAppFullStack.kriaAppBackend.model.comment;
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
    public comment addComment(@RequestBody comment newComment) {
        return commentsService.addComment(newComment);
    }

    // get comment by userId
    @GetMapping("/user/{userId}")
    public List<comment> getCommentsByUserId(@PathVariable Integer userId) {
        return commentsService.getCommentsByUserId(userId);
    }

    // get comment by username
    @GetMapping("/username/{username}")
    public List<comment> getCommentsByUsername(@PathVariable String username) {
        return commentsService.getCommentsByUsername(username);
    }

    // list all comments
    @GetMapping
    public List<comment> getAllComments() {
        return commentsService.getAllComments();
    }

    // get comment by id
    @GetMapping("/{id}")
    public Optional<comment> getCommentById(@PathVariable Integer id) {
        return commentsService.getCommentById(id);
    }


    // edit comment by id
    @PutMapping("/edit/{id}")
    public comment updateComment(@PathVariable Integer id, @RequestBody comment updatedComment) {
        return commentsService.updateComment(id, updatedComment);
    }


    // delete comment by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer id) {
        commentsService.deleteComment(id);
        return ResponseEntity.status(HttpStatus.OK).body("Comment with ID " + id + " has been deleted.");
    }

    // like comment by comment id
    @PostMapping("/like/{id}")
    public comment likeComment(@PathVariable Integer id) {
        return commentsService.likeComment(id);
    }

    // dislike comment by comment id
    @PostMapping("/dislike/{id}")
    public comment dislikeComment(@PathVariable Integer id) {
        return commentsService.dislikeComment(id);
    }

    // unlike comment by comment id
    @PostMapping("/unlike/{id}")
    public comment unlikeComment(@PathVariable Integer id) {
        return commentsService.unlikeComment(id);
    }

    // undislike comment by comment id
    @PostMapping("/undislike/{id}")
    public comment undislikeComment(@PathVariable Integer id) {
        return commentsService.undislikeComment(id);
    }
}