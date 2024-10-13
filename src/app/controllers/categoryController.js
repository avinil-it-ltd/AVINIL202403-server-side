const Category = require('../models/Category');

// Create a new category with subcategories
exports.createCategory = async (req, res) => {
    try {
        const { name, subcategories } = req.body;

        const category = new Category({
            name,
            subcategories
        });

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ message: 'Error creating category', error: err.message });
    }
};

// Get all categories with subcategories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
};

// Get a specific category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching category', error: err.message });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const { name, subcategories } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, subcategories },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: 'Error updating category', error: err.message });
    }
};

// Update a subcategory by category ID and subcategory index
exports.updateSubCategory = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(req.params);
        
        const { categoryId, subCategoryIndex } = req.params;

        // Log the IDs to see what is being passed
        console.log(`Category ID: ${categoryId}, Subcategory ID: ${subCategoryIndex}`);
        console.log(`Request Body: ${JSON.stringify(req.body)}`);
        
        // Fetch the category
        const category = await Category.findById(categoryId);
        console.log('Fetched Category:', category);

        // if (!category) {
        //     return res.status(404).json({ message: 'Category not found' });
        // }

        // Check if subCategoryId is valid
        if (!subCategoryIndex) {
            return res.status(400).json({ message: 'Subcategory ID is required' });
        }

        // Find the subcategory by ID
        const subcategory = category.subcategories.id(subCategoryIndex);
        console.log('Fetched Subcategory:', subcategory);

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Update the subcategory name
        subcategory.name = name;
        console.log('Updated Subcategory Name:', subcategory.name);
        
        // Save the updated category
        await category.save();

        // Return the updated category
        res.status(200).json(category);
    } catch (err) {
        console.error('Error updating subcategory:', err);
        res.status(500).json({ message: 'Error updating subcategory', error: err.message });
    }
};



// Add a subcategory to an existing category
exports.addSubCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.subcategories.push({ name });
        await category.save();

        res.status(201).json({ message: 'Subcategory added successfully', category });
    } catch (error) {
        console.error('Error adding subcategory:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a subcategory by category ID and subcategory index
exports.deleteSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryIndex } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (subCategoryIndex < 0 || subCategoryIndex >= category.subcategories.length) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        category.subcategories.splice(subCategoryIndex, 1);
        await category.save();

        return res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category', error: err.message });
    }
};
