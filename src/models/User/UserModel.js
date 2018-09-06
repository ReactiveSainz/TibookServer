import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  created: Date,
  updated: Date,
  name: String,
  lastName: String,
  nickName: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"]
  },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  hashed_password: {
    type: String,
    default: ""
  }
  /* defaultCreditCard: {
    type: Schema.Types.ObjectId,
    ref: "CreditCard",
    default: ""
  } */
});

UserSchema.virtual("password").set(function(password) {
  this._password = password;
});

UserSchema.pre("save", function(next) {
  const user = this;
  const saltRounds = 10;
  if (user._password === undefined) {
    return next();
  }
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) console.log(err);

    bcrypt.hash(user._password, salt, function(err, hash) {
      if (err) console.log(err);
      user.hashed_password = hash;
      next();
    });
  });
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods = {
  comparePassword: function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.hashed_password);
  }
};

const User = mongoose.model("User", UserSchema);

export default User;
