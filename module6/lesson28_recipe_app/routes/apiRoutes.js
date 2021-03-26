"use strict";

const router = require("express").Router(),
  coursesController = require("../controllers/coursesController"),
  usersController = require("../controllers/usersController");

//router.use(usersController.verifyToken)
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.post("/login", usersController.apiAuthenticate);
router.use(usersController.verifyJWT)
router.use(coursesController.errorJSON);

module.exports = router;
