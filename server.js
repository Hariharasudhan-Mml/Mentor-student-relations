const express = require("express");
const DBconnect = require("./config/db");
const MentorRoute = require("./routes/mentor");
const StudentRoute = require("./routes/student");
const Mentor = require("./models/mentorSchema");
const Student = require("./models/studentSchema");

const bodyParser = require("body-parser");

const port = process.env.PORT || "5000";
const app = express();

DBconnect();
app.set("view engine", "ejs");
app.use("/static",express.static("static"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/mentor", MentorRoute);
app.use("/student", StudentRoute);
app.get("/", (req, res) => {
  res.render("home");
});


app.get("/showall", async (req, res) => {
  const mentor = await Mentor.find({}).sort({ name: 1 });
res.render("showall", {
    mentor: mentor,
  });
});

app.post("/showall", async (req, res) => {
    mentor_id = req.body.mentor_id;
    const data = await Mentor.find({}).populate(
      "students",
      "name department -_id"
    );
    res.render('showstudents',{
        students:data
    })
  });

app.listen(port, (err) => {
  if (err) throw err;
  console.log("server is Up and running ");
});
