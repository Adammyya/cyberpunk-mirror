import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Chat router is working!",
  });
});

export default router;