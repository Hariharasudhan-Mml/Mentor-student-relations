const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  mentor: {
    default:"6195fd4fab3d6a178840cb94",
    type: mongoose.Types.ObjectId,
    ref: "mentors",
  }
});

const Student = new mongoose.model("students", studentSchema);

module.exports = Student;
