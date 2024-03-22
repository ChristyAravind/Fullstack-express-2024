const jwt = require("jsonwebtoken");

const Handlers = (statusCode, message, data, success) => {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
    success: success,
  };
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(410)
      .json({ success: false, message: "Unauthorized", statusCode: 410 });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid token", statusCode: 403 });
    }

    // Attach the decoded token payload to the request object for further use
    req.headers.userDetails = decoded;

    // Move to the next middleware
    next();
  });
};

module.exports = Handlers;
module.exports = authenticateToken;
