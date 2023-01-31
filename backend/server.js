import express from "express";
import notes from "./data/notes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/notes", (req, res) => {
  console.log(req, "req1");
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((x) => x._id === req.params.id);

  res.send(note);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`server listening on port ${PORT}`));
