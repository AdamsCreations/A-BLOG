
import express from "express";
import bodyParser from "body-parser";
const app = express()
const port = 3000
const date = new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
});
var postedDate = "Posted on " + date;
var editedDate = "Edited on " + date;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.post("/add-post", (req, res) => {
    const { content, author } = req.body;
    res.render("partials/post.ejs", { content, author, date : postedDate});
});

app.post("/edit-post", (req, res) => {
  const { author, content } = req.body;
  res.render("partials/edit-post-form.ejs", { author, content });
});

app.post("/post-edited", (req, res) => {
  const { author ,content } = req.body;
  res.render("partials/post.ejs", { author, content, date : editedDate });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

