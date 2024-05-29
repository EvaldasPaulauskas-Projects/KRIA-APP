package com.kriaAppFullStack.kriaAppBackend.controller;

import com.kriaAppFullStack.kriaAppBackend.exception.ResourceNotFoundException;
import com.kriaAppFullStack.kriaAppBackend.model.books;
import com.kriaAppFullStack.kriaAppBackend.service.booksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class booksController {

    @Autowired
    private booksService bookService;

    // Get all books
    @GetMapping
    public ResponseEntity<List<books>> getAllBooks() {
        List<books> allBooks = bookService.getAllBooks();
        return ResponseEntity.ok().body(allBooks);
    }

    // Search book by name
    @GetMapping("/search/name/{name}")
    public ResponseEntity<books> getBookByName(@PathVariable String name) {
        books book = bookService.getBookByName(name);
        if (book == null) {
            throw new ResourceNotFoundException("No book found with the name '" + name + "'");
        }
        return ResponseEntity.ok().body(book);
    }

    // Search book by id
    @GetMapping("/search/id/{id}")
    public ResponseEntity<books> getBookById(@PathVariable Integer id) {
        books book = bookService.getBookById(id);
        if (book == null) {
            throw new ResourceNotFoundException("No book found with the ID '" + id + "'");
        }
        return ResponseEntity.ok().body(book);
    }

    // Create book
    @PostMapping("/add")
    public ResponseEntity<books> createBook(@RequestBody books book) {
        books createdBook = bookService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    // Edit book by id
    @PutMapping("/{id}")
    public ResponseEntity<books> updateBook(@PathVariable Integer id, @RequestBody books bookDetails) {
        books updatedBook = bookService.updateBook(id, bookDetails);
        if (updatedBook == null) {
            throw new ResourceNotFoundException("No book found with the ID '" + id + "' to update");
        }
        return ResponseEntity.ok().body(updatedBook);
    }

    // Delete book by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Integer id) {
        boolean deleted = bookService.deleteBook(id);
        if (!deleted) {
            throw new ResourceNotFoundException("Unable to delete book with the ID '" + id + "'");
        } else {
            throw new ResourceNotFoundException("Book with ID '" + id + "' has been successfully deleted");
        }
    }
}
