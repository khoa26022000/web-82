const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 3001;
const morgan = require("morgan");
const router = require("./router");
const cors = require("cors");
const { logMiddleWare } = require("./middleware");
const connectDb = require("./database");

// morgan là một phần mềm trung gian cho phép ta dễ dàng ghi lại các yêu cầu, lỗi và hơn thế nữa vào console
app.use(morgan("combined"));

// cors là gì tìm hiểu thêm ở trang này
// https://viblo.asia/p/cors-la-gi-cors-voi-nodejs-Qbq5QyyL5D8
app.use(cors({ origin: "*" }));

connectDb();
// parse body trong request ->không có sẽ không lấy được request từ body
app.use(express.json());
// Global middlware dùng để log ra lỗi
app.use(logMiddleWare);
app.use(router);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
