import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("naber post adam");
});

export default router;
