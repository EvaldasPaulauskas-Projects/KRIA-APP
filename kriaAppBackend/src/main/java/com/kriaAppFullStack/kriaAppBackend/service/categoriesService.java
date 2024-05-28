package com.kriaAppFullStack.kriaAppBackend.service;

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
        return categoriesRepository.findById(id).map(category -> {
            category.setTag(newCategory.getTag());
            return categoriesRepository.save(category);
        }).orElse(null);
    }

    public void deleteCategory(Integer id) {
        categoriesRepository.deleteById(id);
    }
}