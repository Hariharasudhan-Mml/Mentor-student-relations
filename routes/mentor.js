const router = require("express").Router();
const Mentor = require("../models/mentorSchema");
const Student = require("../models/studentSchema");

router.get("/create", (req, res) => {
  res.render('CreateMentor');
});

router.post("/create", async (req, res) => {
    console.log(req.body);
  const mentor = new Mentor(req.body);
  await mentor.save();
  res.json(mentor);
});

router.get('/update-mentor',async (req,res)=>{
    const student=await Student.find({}).sort({name:1})
    const mentor= await Mentor.find({}).sort({name:1})
    res.render('Assign-mentor',{
student:student,
mentor:mentor
    })
})

router.post("/update-mentor", async (req, res) =>{
  const student_id = req.body.student_id;
  const mentor_id = req.body.mentor_id;

  const student = await Student.findByIdAndUpdate(
    { _id: student_id },
    { mentor: mentor_id },
    { new: true }
  );
  const mentor = await Mentor.findByIdAndUpdate(
    { _id: student.mentor },
    { $push: { students: student.id } },
    { new: true }
  );
  mentor.save();
  res.json(student);
});




module.exports = router;
