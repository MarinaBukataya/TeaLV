const Categories = require("../models/categoryModel");
const Products = require("../models/productModel");


const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Categories.find();
    
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Categories.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "This category already exists" });
      const newCategory = new Categories({ name });
      await newCategory.save();
      res.json(newCategory);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Categories.findOne({_id: req.params.id});
      await Categories.findByIdAndDelete(req.params.id);
      await Products.deleteMany({ category: category.name });
      res.json({ msg: "Deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Categories.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
