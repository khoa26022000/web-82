const fs = require("fs");
const userModel = require("../models/userModel");

// const createUser = (req, res) => {
//   const userName = req.body.userName;
//   const userId = req.body.userId;

//   const data = fs.readFileSync("data.json");
//   const result = JSON.parse(data);
//   const found = result.find((element) => element.userId == userId);

//   if (!found) {
//     const newResult = [...result, { userId, userName }];
//     const writeToFile = fs.writeFileSync(
//       "data.json",
//       JSON.stringify(newResult)
//     );

//     return res.status(200).json({
//       message: "Create user success",
//       data: newResult,
//     });
//   } else {
//     return res.status(400).json({
//       message: "Error CreatedUser",
//     });
//   }
// };

// const async createUser = (req, res) {
//     try {
//         const newUser = await userModel.create(req.body)
//     } catch (error) {

//     }
// }

// const getAllUser = (req, res) => {
//   const data = fs.readFileSync("data.json");
//   const result = JSON.parse(data);
//   return res.status(200).json({ result });
// };

class userController {
  async createUser(req, res) {
    try {
      const newUser = await userModel.create(req.body);
      console.log("newUser", newUser);
      res.status(200).json({
        message: "Create user success",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  //   getAllUser = (req, res) => {
  //     const newUser = await userModel.create(req.body);
  //     const result = JSON.parse(data);
  //     return res.status(200).json({ result });
  //   };
}

module.exports = new userController();

// Xây dựng api cho ứng dụng phim như sau:

// Người dùng có thể xem các nội dung phim free tuy nhiên một số phim độc quyền thì yêu cầu người dùng đăng ký tài khoản.
// Admin của hệ thống có thể thêm, xem, xoá, sửa toàn bộ phim của nền tảng.

// - Người dùng khách
// + Chỉ có thể truy cập các bộ phim miễn phí
// - Người dùng thành viên
// + Đăng ký tài khoản bằng userName password (userName phải là duy nhất)
// + Đăng nhập tài khoản đã đăng ký để có thể truy cập toàn bộ phim của hệ thống
// - Admin hệ thống
// + Được cấp tài khoản admin
// + Có thể truy cập tất cả phim của hệ thống
// + Có thể xem thêm xoá sửa phim
