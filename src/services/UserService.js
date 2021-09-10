import { http } from "./HttpService";

export function getAllUsers() {
  return http().get("/user");
}

export function deleteUser(id) {
  return http().delete(`/user/${id}`);
}

export function registerUser(user) {
  return http().post("/user", user);
}
