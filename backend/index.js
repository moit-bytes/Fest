const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.js');
const paymentRouter = require('./routes/payment.js');
const eventRouter = require('./routes/events.js');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
// ✅ Parse URL-encoded bodies (important for PayU)
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user',userRouter);
app.use('/payment',paymentRouter);
app.use('/events',eventRouter);

app.use(express.static(path.join(__dirname, "public")));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});


app.listen(3000, (req,res)=>{
    console.log("App listen at port 3000");
})