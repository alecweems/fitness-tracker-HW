const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

require("./routes/html-routes.js")(app);


app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", function (req, res) {
  console.log(req.body);
  db.Workout.updateOne({ _id: req.params.id }, { body: req.body }).then(
    function (dbWorkouts) {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    }
  );
});

app.post("/api/workouts", function (req, res) {
  console.log(req.body);
  db.Workout.create(req.body, function (error, data) {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});







app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});