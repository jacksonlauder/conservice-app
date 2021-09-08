import express from "express";
const router = express.Router();
import * as controller from "./user-controller";

router.post("/user", controller.create);
router.get("/user", controller.index);
router.get("/user/:id", controller.show);
router.put("/user/:id", controller.update);
router.delete("/user/:id", controller.remove);

export default router;
