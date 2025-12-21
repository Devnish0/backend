import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // res.json({ name, email, password });
  // checking if the user already exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  // creating a new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password, // In production, hash the password before storing
    },
  });
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "sucess",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
      token: token,
    },
  });
};

// for logging in we will be using jwts
const login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!userExists) {
    return res
      .status(400)
      .json({ error: "user doesnt exist please sign up or register" });
  }
  // for password check
  if (userExists.password !== password) {
    return res.status(400).json({ error: "invalid email or password" });
  }
  // ! generate teh jwt token
  const token = generateToken(userExists.id, res);

  // use userExists (the fetched user) instead of undefined `user`/`name` variables
  res.status(200).json({
    status: "sucess",
    data: {
      user: {
        id: userExists.id,
        email: userExists.email,
      },
      token: token,
    },
  });
};
const logOut = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

export { login, register, logOut };
