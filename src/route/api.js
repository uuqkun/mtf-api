import express from "express";
import userController from "../controller/user-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import memberController from "../controller/member-controller.js";
import groupController from "../controller/group-controller.js";

const userRouter = new express.Router();
userRouter.use(verifyToken);

// Users API
userRouter.get("/api/users", userController.users);
userRouter.get("/api/users/:id", userController.user);
userRouter.put("/api/users/:id", userController.update);
userRouter.post('/api/users/logout', userController.logout); 


// Members API
userRouter.post("/api/member", memberController.create);
// userRouter.get("/api/members", memberController.getMembers);
// userRouter.put("/api/members/:id", memberController.update);
// userRouter.delete("/api/members/:id", memberController.remove);

// Group API 
userRouter.post('/api/groups', groupController.create);
userRouter.put('/api/groups/:groupId', groupController.update);
userRouter.delete('/api/groups/:groupId', groupController.remove);
userRouter.get('/api/groups/:groupId', groupController.getGroupCredentials);



export { userRouter };
