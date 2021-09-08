import User from "../../model/user-model";

// Create a user
export function create(req, res) {
  return res.json();
}
// Read all users
export function index(req, res) {
  User.find({}, (error, users) => {
    if (error) {
      return res.status(500).json();
    }
    return res.status(200).json({ users: users });
  });
}
// Read a user by ID
export function show(req, res) {
  return res.json();
}
// Update a user
export function update(req, res) {
  return res.json();
}
// Delete a user
export function remove(req, res) {
  return res.json();
}
