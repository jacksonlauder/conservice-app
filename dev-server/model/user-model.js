const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phoneNumber: String,
  position: String,
  department: String,
  startDate: String,
  endDate: String,
  empStatus: String,
  shift: String,
  manager: String,
  photo: String,
  favColor: String,
  history: [
    {
      action: String,
      date: Date,
      message: String,
    },
  ],
});
userSchema.set("timestamps", true);

export default mongoose.model("user", userSchema);
