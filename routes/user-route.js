const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const app = express();

const {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./../handlers/user-handlers.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.use("/usersDetails", express.static("./uploads"));
router.post("/usersDetails", upload.single("profile"), async (req, res) => {
  res.header("xyz", JSON.stringify({ xyz: "xyz" }));
  let user = await addUser(req.body);
  console.log("USER", user);
  console.log("BODY", req.body);
  console.log("FILE", req.file);

  res.send({
    profile_url: `http://localhost:4000/usersDetails/${req.file.filename}`,
    user,
  });
});

router.get("/usersDetails", async (req, res) => {
  let users = await getUsers();
  res.send(users);
});

router.get("/usersDetails/:id", async (req, res) => {
  console.log("id", req.params["id"]);
  let user = await getUserById(req.params["id"]);
  res.send(user);
});

router.put("/usersDetails/:id", async (req, res) => {
  await updateUser(req.params["id"], req.body);
  res.send({});
});

router.delete("/usersDetails/:id", async (req, res) => {
  await deleteUser(req.params["id"]);
  res.end({});
});

module.exports = router;
