const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
const bcryptjs = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const age = req.body.age;
    const role = req.body.role;

    const user = await userModel.findOne({
      username,
    });

    if (user) {
      return res.status(400).json({ message: "Nguoi dung da ton tai" });
    }

    const salt = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salt);

    const newUser = await userModel.create({
      username,
      password: passwordHash,
      name,
      age,
      role,
    });

    return res
      .status(201)
      .json({ message: "Tao nguoi dung thanh cong", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Failed" });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({
    username,
  }); // tìm user theo username

  if (!user) {
    // Kiểm tra user có tồn tại hay không
    return res.status(400).json({ message: "Nguoi dung khong ton tai" });
  }

  const checkPassword = bcryptjs.compareSync(password, user.password);

  if (!checkPassword) {
    // kiểm tra password
    return res.status(400).json({ message: "Sai mat khau" });
  }

  // đăng ký một token cho user bao gồm 3 tham số đầu vào
  // 1. id: là id của user
  // 2. Key bảo mật do mình tự tạo ra vd: mindx123 lưu vào file .env
  // 3. Thời hạn tồn tại của một token
  const token = jwt.sign(
    {
      id: user.id, // 1
    },
    process.env.JWT_SECRET_KEY, // 2
    {
      expiresIn: "1d", // 3
    }
  );

  return res.status(200).json({ user: user, token: token }); // khi login thành công trả về thông tin user và token để client lưu lại
};

const getUser = (req, res) => {
  return res.status(200).json({ message: "Get Hello world", user });
};

// tạo user mới nhưng bất buộc phải đăng nhập
const createUser = (req, res, next) => {
  const username = req.body.username;
  const age = req.body.age;
  const id = req.body.id;
  const userId = req.userId;
  const createdBy = user.find((item) => item.id == userId);
  const newUser = { id: id, name: username, age: age };
  return res.status(200).json({
    message: "Post Hello World",
    user: [...user, newUser],
    createdBy: createdBy,
  });
};

const updateUserAll = (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  const age = req.body.age;

  const result = user.map((item) => {
    if (item.id == id) {
      item.age = age;
      item.name = username;
    }

    return item;
  });

  return res.status(200).json({ message: "Put Hello world", user: result });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const age = req.body.age;

  const result = user.map((item) => {
    if (item.id == id) {
      item.age = age;
    }

    return item;
  });

  return res.status(200).json({ message: "Patch Hello world", user: result });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const result = user.filter((item) => item.id != id);
  return res.status(200).json({ message: "Delete Hello world", user: result });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserAll,
  login,
  signUp,
};
