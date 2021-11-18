const router = require("express").Router();
const { response } = require("express");
const Student = require("../models/studentSchema");
const Mentor = require("../models/mentorSchema");

router.get("/create", (req, res) => {
  res.render('CreateStudent');
});

router.post("/create", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  const mentorData = await Mentor.findByIdAndUpdate(
    { _id: student.mentor },
    { $push: { students: student._id } },
    { new: true }
  );
  res.json(student);
});

router.get('/assign-stu' ,async(req,res)=>{
  const mentor=await Mentor.find({}).sort({name:1});
  const student=await Student.find({}).sort({name:1})
  res.render('AssignStudent',{
    mentor:mentor,
    student:student
  })
})

router.post("/assign-stu", async (req, res) => {
  const mentor_id = req.body.mentor_id;
  const student_id=req.body.student_id;
const mentor= await Mentor.findByIdAndUpdate(
  {_id:mentor_id},
  {$push :{students:student_id}},
{new:true}
)
const student= await Student.findByIdAndUpdate(
  {_id:student_id},
  {mentor:mentor_id},
  {new:true}
  )
res.json(mentor);
  
});

module.exports = router;
