const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true }) // this returns a promise
  .then(() => console.log("Connecting to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  // whenever use await, the code should be in async function
  const result = await course.save();

  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ author: "Mosh", isPublished: true }) // can add filter
    .limit(10)
    .sort({ name: 1 }) // 1 for asending and -1 for desending
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
