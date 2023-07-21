const { Category } = require("../../model/product/Category");

exports.fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createCategories = async (req, res) => {
  const categories = new Category(req.body);
  try {
    const doc = await categories.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
