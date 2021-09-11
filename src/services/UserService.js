import { http } from "./HttpService";

// Create a user
export function registerUser(user) {
  return http().post("/user", user);
}

// Read all users
export function getAllUsers() {
  return http().get("/user");
}

// Update a user
export function updateUser(user) {
  return http().put("/user", user);
}

// Delete a user
export function deleteUser(id) {
  return http().delete(`/user/${id}`);
}
