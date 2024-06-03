package com.kriaAppFullStack.kriaAppBackend.service;

import com.kriaAppFullStack.kriaAppBackend.exception.ResourceNotFoundException;
import com.kriaAppFullStack.kriaAppBackend.model.categories;
import com.kriaAppFullStack.kriaAppBackend.repo.categoriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class categoriesService {

    @Autowired
    private categoriesRepo categoriesRepository;

    public List<categories> getAllCategories() {
        return categoriesRepository.findAll();
    }

    public categories getCategoryById(Integer id) {
        return categoriesRepository.findById(id).orElse(null);
    }

    public categories getCategoryByTag(String tag) {
        return categoriesRepository.findByTag(tag);
    }

    public categories createCategory(categories category) {
        // Check if a category with the same tag already exists
        categories existingCategory = getCategoryByTag(category.getTag());
        if (existingCategory != null) {
            // Category already exists
            return existingCategory;
        } else {
            // Category doesn't exist, create it
            return categoriesRepository.save(category);
        }
    }


    public categories updateCategory(Integer id, categories newCategory) {
        // Check if the new updated category tag already exists
        categories existingCategory = getCategoryByTag(newCategory.getTag());
        if (existingCategory != null && !existingCategory.getId().equals(id)) {
            // If category with the same tag exists and it's not the same category being updated, return null
            throw new ResourceNotFoundException("Category with tag '" + newCategory.getTag() + "' already exists!");
        }
        // Otherwise, proceed with updating the category
        return categoriesRepository.findById(id).map(category -> {
            category.setTag(newCategory.getTag());
            return categoriesRepository.save(category);
        }).orElse(null);
    }

    public void deleteCategory(Integer id) {
        categoriesRepository.deleteById(id);
    }
}