import userRoutes from "./api/user/user-routes";

export function registerRoutes(app) {
  app.use("/api", userRoutes);
}
