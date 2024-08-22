const router = require("express").Router();
// const { createUser, getAllUser } = require("../controllers/user");
const userController = require("../controllers/user");
const authentication = require("../middleware/authentication");

router.post("/sign-up", authentication, userController.createUser);

// router.get("/get-all-user", authorization, userController.getAllUser);

module.exports = router;
