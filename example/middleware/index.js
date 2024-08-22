const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

//  Mình chỉ mọi người trước phần jwt mọi người đọc thật kỹ lesson 8 để hiểu thật kỹ

const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization; //Khi đăng nhập thành công -> backend cấp cho phía client 1 đoạn mã

  if (!bearerToken) {
    return res.status(401).json({ message: "Ban chua dang nhap" });
  }

  const token = bearerToken.split(" ")[1]; // Bearer token
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = checkToken.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Ban chua dang nhap" });
    }
    req.user = user;
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Ban chua dang nhap" });
  }
};
const authorization = (key, action) => {
  return (req, res, next) => {
    const userId = req.userId;
    const findUser = user.find((item) => item.id == userId);
    const findRole = role.find((item) => item.id == findUser.role);

    const checkPermission = findRole.permission.find(
      (item) => item.key == key && item.action == action
    );

    if (!checkPermission) {
      return res
        .status(403)
        .json({ message: "Ban khong co quyen de thuc hien hanh dong nay" });
    }

    next();
  };
};

const logMiddleWare = (req, res, next) => {
  console.log("Log middleware");
  next();
};

module.exports = {
  authentication,
  logMiddleWare,
  authorization,
};
