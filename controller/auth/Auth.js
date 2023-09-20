const { User } = require("../../model/user/User");
const { setUser } = require("../../services/auth");
const crypto = require("crypto");

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        const token = setUser(user);
        res.cookie("uid", token);
        res.status(201).json({ id: doc.id, role: doc.role });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Compare the hashed passwords
    const isPasswordValid = await comparePasswords(
      password,
      user.password,
      user.salt
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    } else {
      // If the passwords match, generate a token and set it in a cookie
      const token = setUser(user);
      res.cookie("uid", token, {
        domain: "http://localhost:3000/",
        httpOnly: true, 
      });
      res.status(200).json({ id: user.id, role: user.role });
    }
  } catch (err) {
    // Handle any potential errors that occurred during the database query
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to compare hashed passwords
async function comparePasswords(password, storedHashedPassword, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        const hashedPassword = derivedKey.toString("hex");
        resolve(hashedPassword === storedHashedPassword);
      }
    });
  });
}

// Function to compare hashed passwords
async function comparePasswords(password, storedHashedPassword, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        const hashedPassword = derivedKey.toString("hex");
        resolve(
          crypto.timingSafeEqual(
            Buffer.from(storedHashedPassword, "hex"),
            derivedKey
          )
        );
      }
    });
  });
}

exports.checkUser = async (req, res) => {
  res.json({ status: "success", user: req.user });
};
