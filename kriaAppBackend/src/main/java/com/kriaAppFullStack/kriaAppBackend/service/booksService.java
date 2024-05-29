package com.kriaAppFullStack.kriaAppBackend.service;

import com.kriaAppFullStack.kriaAppBackend.model.books;
import com.kriaAppFullStack.kriaAppBackend.repo.booksRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class booksService {

    @Autowired
    private booksRepo bookRepository;

    public List<books> getAllBooks() {
        return bookRepository.findAll();
    }

    public books getBookById(Integer id) {
        Optional<books> optionalBook = bookRepository.findById(id);
        return optionalBook.orElse(null);
    }

    public books getBookByName(String name) {
        Optional<books> optionalBook = bookRepository.findByName(name);
        return optionalBook.orElse(null);
    }

    public books addBook(books book) {
        return bookRepository.save(book);
    }

    public books updateBook(Integer id, books bookDetails) {
        Optional<books> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            books book = optionalBook.get();
            book.setName(bookDetails.getName());
            book.setDescription(bookDetails.getDescription());
            book.setISBN(bookDetails.getISBN());
            book.setPhoto(bookDetails.getPhoto());
            book.setPages(bookDetails.getPages());
            book.setCategory(bookDetails.getCategory());
            return bookRepository.save(book);
        }
        return null;
    }

    public boolean deleteBook(Integer id) {
        Optional<books> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            bookRepository.delete(optionalBook.get());
            return true; // Book deleted successfully
        }
        return false; // Book with given ID not found
    }
}
