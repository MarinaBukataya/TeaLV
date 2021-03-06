const Products = require("../models/productModel");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|regex)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      console.log(req.query);
      const features = new APIFeatures(Products.find(), req.query)
        .filter()
        .sort()
        .paginate();
      const products = await features.query;
      if (products.length == 0)
        return res.status(400).json({ msg: "Sorry, but there are no products matching your choice. Please choose a different tea." });
      console.log(products.length);
      return res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { title, price, description, contents, image, category } = req.body;
      if (!image) return res.status(400).json({ msg: "No uploaded image" });
      const product = await Products.findOne({ title });

      if (product)
        return res.status(400).json({ msg: "You already have this product" });
      const newProduct = new Products({
        title,
        price,
        description,
        contents,
        image,
        category,
      });
      newProduct.save();
      return res.json(newProduct);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { title, price, description, contents, image, category } = req.body;
      if (!image) return res.status(400).json({ msg: "No uploaded image" });
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          price,
          description,
          contents,
          image,
          category,
        }
      );
      return res.json({ msg: "Product updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
