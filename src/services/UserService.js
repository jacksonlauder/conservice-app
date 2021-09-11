import { http } from "./HttpService";

// Create a user
export function registerUser(user) {
  return http().post("/user", user);
}

// Read all users
export function getAllUsers() {
  return http().get("/user");
}

// Read a user
export function getUser(id) {
  return http().get(`/user/${id}`);
}

// Update a user
export function updateUser(user) {
  return http().put("/user", user);
}

// Delete a user
export function deleteUser(id) {
  return http().delete(`/user/${id}`);
}
