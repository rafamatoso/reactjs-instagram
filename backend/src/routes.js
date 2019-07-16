const express = require("express"); // 1
const multer = require("multer");
const uploadConfig = require("./config/upload");

const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

const routes = new express.Router();
const upload = multer(uploadConfig);

// GET http://localhost:3333/posts
routes.get("/posts", PostController.index);
// POST http://localhost:3333/posts
routes.post("/posts", upload.single("image"), PostController.store);

routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
