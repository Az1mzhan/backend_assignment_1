import jwt from "jsonwebtoken";
import cfg from "../config.js";

const { secret } = cfg;

export const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};
