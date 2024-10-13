const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Create a new category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', categoryController.updateCategory);

// Add a subcategory to an existing category
router.post('/:categoryId/subcategory', categoryController.addSubCategory);

// Update a subcategory by category ID and subcategory index
router.put('/:categoryId/subcategories/:subCategoryIndex', categoryController.updateSubCategory);

// Delete a subcategory by category ID and subcategory index
router.delete('/:categoryId/subcategories/:subCategoryIndex', categoryController.deleteSubCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
