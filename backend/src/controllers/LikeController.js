const Post = require("../models/Post");

// async no JS faz parte do Promises
module.exports = {
  // cadastrará os posts no bd
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit("post", post);

    return res.json(post);
  }
};
