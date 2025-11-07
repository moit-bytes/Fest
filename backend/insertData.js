const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { Category } = require("./db/db");

const data = [
  {
    categoryName: "Sports",
    subcategories: [
      { name: "Football", isPaid: true, paymentAmount: 1800, gender: "male", team: true },
      { name: "Cricket", isPaid: true, paymentAmount: 1800, gender: "male", team: true },
      { name: "Volleyball", isPaid: true, paymentAmount: 800, gender: "male", team: true },
      { name: "Basketball", isPaid: true, paymentAmount: 800, gender: "male", team: true },
      { name: "Kabaddi", isPaid: true, paymentAmount: 1000, gender: "male", team: true },
      { name: "Carrom", isPaid: true, paymentAmount: 150, gender: "both", team: false },
      { name: "Chess", isPaid: true, paymentAmount: 150, gender: "both", team: false },
      { name: "Badminton", isPaid: true, paymentAmount: 200, gender: "both", team: false },
      { name: "Table Tennis", isPaid: true, paymentAmount: 200, gender: "both", team: false },
      { name: "Lawn Tennis", isPaid: true, paymentAmount: 500, gender: "male", team: false },
      { name: "Arm Wrestling", isPaid: true, paymentAmount: 100, gender: "male", team: false },
      { name: "Shotput", isPaid: true, paymentAmount: 100, gender: "both", team: false },
      { name: "Discus Throw", isPaid: true, paymentAmount: 100, gender: "both", team: false },
      { name: "100m", isPaid: true, paymentAmount: 100, gender: "both", team: false },
      { name: "200m", isPaid: true, paymentAmount: 100, gender: "both", team: false },
      { name: "Relay", isPaid: true, paymentAmount: 400, gender: "both", team: true }
    ]
  },
  {
    categoryName: "InformalEvent",
    subcategories: [
      { name: "Treasure Hunt", isPaid: true, paymentAmount: 200, unit: "per team", team: true },
      { name: "Escape Room", isPaid: true, paymentAmount: 100, unit: "per person", team: false },
      { name: "Paper Fold", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Tug of War", isPaid: true, paymentAmount: 300, unit: "per team", team: true },
      { name: "Bottle Flip", isPaid: true, paymentAmount: 30, unit: "per person", team: false },
      { name: "Ping Pong", isPaid: true, paymentAmount: 30, unit: "per person", team: false },
      { name: "Beg Borrow Steal", isPaid: true, paymentAmount: 200, unit: "per team", team: true },
      { name: "Pictionary", isPaid: true, paymentAmount: 200, unit: "per team", team: true }
    ]
  },
  {
    categoryName: "Creative",
    subcategories: [
      { name: "Poster", isPaid: true, paymentAmount: 50, team: false },
      { name: "Tote Bag Painting", isPaid: true, paymentAmount: 150, team: false },
      { name: "Face Painting", isPaid: true, paymentAmount: 100, team: false },
      { name: "Photography", isPaid: true, paymentAmount: 100, team: false },
      { name: "Origami", isPaid: true, paymentAmount: 50, team: false },
      { name: "Stone Painting", isPaid: true, paymentAmount: 50, team: false },
      { name: "Mix Media", isPaid: true, paymentAmount: 50, team: false }
    ]
  },
  {
    categoryName: "Literary",
    subcategories: [
      { name: "Kotoba No Umi: Creative Writing (Hindi & English)", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Shinsekai Stories: What-If Workshop (English)", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Monogatari No Yume: Storytelling (Bilingual)", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Sakura Verses: Poem Recital (Bilingual)", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Samurai Stand-Up: Stand-Up Comedy (Bilingual)", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Kamikaze Clash: Turncoat Debate (Bilingual)", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "Shogun’s Council: Parliamentary Debate (Bilingual)", isPaid: true, paymentAmount: 150, unit: "per team", team: true },
      { name: "The Exquizite: The Ultimate Medical Quiz", isPaid: true, paymentAmount: 150, unit: "per team", team: true },
      { name: "The Otaku Oracle: The Fandom Showdown", isPaid: true, paymentAmount: 150, unit: "per team", team: true },
      { name: "The Hokage Trials: The Sports Quiz", isPaid: true, paymentAmount: 150, unit: "per team", team: true },
      { name: "Hayakute Curious: The General Quiz", isPaid: true, paymentAmount: 150, unit: "per team", team: true },
      { name: "Karaoke Diagnosis: Provisional Diagnosis @ Bollywood/Hollywood!", isPaid: true, paymentAmount: 150, unit: "per team", team: true },
      { name: "Spelling Bee", isPaid: false, team: false },
      { name: "Meme Literature", isPaid: false, team: false }
    ]
  },
  {
    categoryName: "Esports",
    subcategories: [
      { name: "BGMI", isPaid: true, paymentAmount: 250, unit: "per team", team: true },
      { name: "CODM Multiplayer", isPaid: true, paymentAmount: 200, unit: "per team", team: true },
      { name: "CODM BR", isPaid: true, paymentAmount: 150, unit: "per team", team: true },
      { name: "eFootball", isPaid: true, paymentAmount: 50, unit: "per person", team: false },
      { name: "EAFC", isPaid: true, paymentAmount: 50, unit: "per person", team: false }
    ]
  }
];

// ✅ Connect and replace existing categories
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(async () => {
    console.log("✅ MongoDB connected successfully");

    // Delete existing categories
    await Category.deleteMany({});
    console.log("🗑️ Existing categories deleted");

    // Insert new data
    await Category.insertMany(data);
    console.log("✅ Categories inserted successfully!");

    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection or Insertion error:", err);
    process.exit(1);
  });
