const authentication = async (req, res, next) => {
  const token = req.headers.token;
  try {
    console.log("Token", req.body.userName);
    if (token != 123) {
      return res.status(401).json({
        message: "Bạn không có quyền tao",
      });
    }
    console.log("true");
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Bạn không có quyền tao 1111",
    });
  }
};

module.exports = authentication;
