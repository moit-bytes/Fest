const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminSecret } = require('../middleware/auth');
const {authenticateAdminJwt} = require('../middleware/auth');
const {User} = require('../db/db')
const { Payment } = require('../db/db');
const {EventPayment} = require('../db/db'); 
const router = express.Router();

router.post('/signup', async(req,res)=>{
const {mail,password,name} = req.body;
const existingUser = await User.findOne({mail});
if(existingUser){
    return res.status(403).json({message:"User already exists"});

}
else{
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({mail,password:hashedPassword,name});
    await newUser.save();
    const token = jwt.sign({mail,role:'admin'}, adminSecret);
    res.json({message:"User created", token,userId:newUser.mail})
}

});

router.post('/login',async (req,res)=>{
    const {mail,password}=req.body;
    try{
        const user = await User.findOne({mail});
        if(!user){
            res.status(403).json({message:"Authentication failed"});
            return;
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            res.status(403).json({message:"Authentication failed"});
            return;
        }
            const token = jwt.sign({mail,role:'admin'}, adminSecret);
    res.json({message:"Logged in", token,userId:user.mail})
    }   
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
})
router.get("/all",authenticateAdminJwt, async (req, res) => {
  const payments = await Payment.find({});
  res.json(payments);
});
router.get("/allevents", authenticateAdminJwt, async (req, res) => {
  try {
    const eventPayments = await EventPayment.find({});
    res.json(eventPayments);
  } catch (error) {
    console.error("Error fetching event payments:", error);
    res.status(500).json({ message: "Failed to fetch event payments" });
  }
});
router.post('/expire',authenticateAdminJwt, async (req, res) => {
  try {
    const { uniqueId } = req.query;

    if (!uniqueId) {
      return res.status(400).json({ error: 'Unique ID is required' });
    }

    // Find the payment by uniqueId
    const payment = await Payment.findOne({ uniqueId });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
     if (payment.status === 'initiated') {
      return res.status(400).json({ error: 'This payment is not done' });
    }
     if (payment.status === 'failed') {
      return res.status(400).json({ error: 'This payment is not done' });
    }
    // Check if already expired
    if (payment.status === 'expired') {
      return res.status(400).json({ error: 'This payment is already expired' });
    }

    // Update status to expired
    payment.status = 'expired';
    await payment.save();

    // Return name and email
    return res.json({
      message: 'Payment expired successfully',
      name: payment.name,
      email: payment.email
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;