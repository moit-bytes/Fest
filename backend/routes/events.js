const express = require("express");
const router = express.Router();
const { Category } = require("../db/db"); // adjust path as needed
const Response = require('../utils/response');
// 📘 Helper function to get category by name
async function getCategoryByName(categoryName, res) {
  try {
    const category = await Category.findOne({ categoryName });

    if (!category) {
      return res
        .status(404)
        .json(new Response(404, `${categoryName} category not found`, false));
    }

    return res
      .status(200)
      .json(
        new Response(
          200,
          "Category fetched successfully",
          true,
          {
            category: category.categoryName,
            subcategories: category.subcategories,
          }
        )
      );

  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(new Response(500, "Server error", false, err.message));
  }
}

// 🏆 Sports
router.get("/sports", async (req, res) => {
  await getCategoryByName("Sports", res);
});

// 🎉 Informal Event
router.get("/informalevent", async (req, res) => {
  await getCategoryByName("InformalEvent", res);
});

// 🎨 Creative
router.get("/creative", async (req, res) => {
  await getCategoryByName("Creative", res);
});

// 📚 Literary
router.get("/literary", async (req, res) => {
  await getCategoryByName("Literary", res);
});

// 🎮 Esports
router.get("/esports", async (req, res) => {
  await getCategoryByName("Esports", res);
});

// 🎨 Cultural
router.get("/cultural", async (req, res) => {
  await getCategoryByName("Cultural", res);
});

module.exports = router;
