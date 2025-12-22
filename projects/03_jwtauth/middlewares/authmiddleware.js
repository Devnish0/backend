import express from "express";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

export const authmiddleware = (req, res, next) => {
  let rawtoken = req.headers.authorization;
  if (!rawtoken) res.status(401).json({ message: "token missing" });
  const token = rawtoken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "shhh");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token", error: err });
  }
};
