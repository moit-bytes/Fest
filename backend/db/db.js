const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
name:{type:String, required:true},
mail:{type:String, required:true},
password:{
  type:String, required:true
}
});


const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },   
  email: { type: String, required: true }, 
  contact: { type: String, required: true },
  amount: { type: Number, required: true },
  uniqueId: { type: String, unique: true },
  payuPaymentId: { type: String }, // store PayU payment ID after verification
  status: {
    type: String,
    enum: ["not_issued", "initiated", "issued", "failed", "expired"],
    default: "not_issued"
  },
}, { timestamps: true });
  // razorpayOrderId: { type: String, required: true },
  // razorpayPaymentId: { type: String },

  const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentAmount: {
    type: Number,
    required: function () {
      return this.isPaid;
    },
  },
    gender: {
    type: String,
    enum: ["male", "female", "both"],
    required: function () {
      // ✅ Only required if the parent category is "Sports"
      const parent = this.parent();         // access category document
      return parent && parent.categoryName === "Sports";
    },
  },
  unit: {
  type: String,
  enum: ["per team", "per person"],
  required: false
}, 
team: {
    type: Boolean,
    required: true, // must always specify whether it's a team or not
  },

});
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  subcategories: [subCategorySchema],
});
//sportpayment schema
const EventsPaymentSchema = new mongoose.Schema(
  {
    // For team events: store team name
    teamName: {
      type: String,
      required: function () {
        return !this.individualName; // required if not an individual event
      },
      trim: true,
    },

    // For individual events
    individualName: {
      type: String,
      required: function () {
        return !this.teamName; // required if not a team event
      },
      trim: true,
    },

    // Leader name (only if it's a team event)
    leaderName: {
      type: String,
      required: function () {
        return !!this.teamName; // required if teamName exists
      },
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    institutionName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    aadhaarCard: {
      type: String,
      required: function () {
        return !this.institutionName; // Aadhaar required only if not institution-based
      },
      trim: true,
    },

    collegeId: {
      type: String,
      required: function () {
        return !!this.institutionName; // required only if institutionName exists
      },
      trim: true,
    },
    categoryName:{
      type:String,
      required: true,

    },
    subCategory:{
      type:String,
      required:true,
    },
    amount: {
      type: Number,
      required: true,
    },

    uniqueId: {
      type: String,
      unique: true,
      required: true,
    },

    payuPaymentId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["not_issued", "initiated", "issued", "failed"],
      default: "not_issued",
    },
  },
  { timestamps: true }
);
const Payment = mongoose.model('Payment', paymentSchema);
const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const EventPayment = mongoose.model('EventPayment',EventsPaymentSchema);
module.exports  ={
        Payment,
        User,
        Category,
        EventPayment
    };

