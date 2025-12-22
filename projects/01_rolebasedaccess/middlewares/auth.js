import { roles } from "../data/role.js";
const auth = (req, res, next) => {
  const role = req.headers.authorization;

  if (!roles[role]) {
    return res.status(401).send("not authorized");
  }
  req.user = roles[role];
  next();
};
export default auth;
