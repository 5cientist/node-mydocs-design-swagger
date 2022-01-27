const express = require("express");

const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const fileUpload = require("express-fileupload");

//middle ware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn ReactJS",
    price: 199,
  },
  {
    id: "22",
    name: "Learn Vue",
    price: 299,
  },
  {
    id: "15",
    name: "Learn angular",
    price: 399,
  },
];

app.get("/", (req, res) => {
  res.send("hello from lukku");
});

app.get("/api/v1/lco", (req, res) => {
  res.send("Hello from lco - docs");
});

app.get("/api/v1/lcoobject", (req, res) => {
  res.send({
    id: "66",
    name: "Learn Backend",
    price: 999,
  });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

//url query (searching..)
app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(4000, () => {
  console.log(`server is running  at port 4000`);
});
