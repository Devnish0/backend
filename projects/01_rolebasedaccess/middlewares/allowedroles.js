const allowed = (allowed = []) => {
  return (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    }
    if (!allowed.includes(req.user.role)) {
      return res.status(401).send("forbidden");
    }
    next();
  };
};

export default allowed;
