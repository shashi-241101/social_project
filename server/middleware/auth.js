import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Access the Authorization header
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      console.log("No Authorization header found.");
      return res.status(403).send("Access Denied");
    }

    if (authorizationHeader.startsWith("Bearer ")) {
      // Extract the token from the "Bearer" token format
      const token = authorizationHeader.slice(7).trim();

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } else {
      console.log("Invalid Authorization header format.");
      return res.status(403).send("Access Denied");
    }
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(500).json({ error: err.message });
  }
};

