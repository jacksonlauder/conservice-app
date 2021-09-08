import express from "express";
const router = express.Router();
import * as controller from "./user-controller";

router.post("/user", controller.create);
router.get("/user", controller.index);
router.get("/user/:id", controller.show);
router.put("/user", controller.update);
router.delete("/user", controller.remove);

export default router;
