import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid. It must contain 8-20 alphanumeric characters and can include underscores or periods without consecutive usage.",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
