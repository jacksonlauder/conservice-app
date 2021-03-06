import User from "../../model/user-model";

// Create a user
export function create(req, res) {
  const user = new User({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    position: req.body.position,
    department: req.body.department,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    empStatus: req.body.empStatus,
    shift: req.body.shift,
    manager: req.body.manager,
    photo: req.body.photo,
    favColor: req.body.favColor,
  });

  user.save((error) => {
    if (error) {
      return res.status(500).json();
    }
    return res.status(201).json({ userID: user._id });
  });
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
  User.findOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return res.status(500).json();
    }
    if (!user) {
      return res.status(404).json();
    }
    return res.status(200).json({ user: user });
  });
}
// Update a user
export function update(req, res) {
  const userId = req.body.user._id;

  User.findById(userId, function (error, user) {
    if (error) {
      console.log(error);
    } else {
      if (req.body.user.manager !== user.manager) {
        const user = new User(req.body.user);
        user.history.push({
          action: "Modified user",
          date: Date.now(),
          message: "Changed manager to: " + user.manager,
        });

        User.findByIdAndUpdate(userId, user, (error) => {
          if (error) {
            console.log(error);
            return res.status(500).json();
          } else {
            return res.status(204).json();
          }
        });
      } else if (req.body.user.position !== user.position) {
        const user = new User(req.body.user);
        user.history.push({
          action: "Modified user",
          date: Date.now(),
          message: "Changed position to: " + user.position,
        });

        User.findByIdAndUpdate(userId, user, (error) => {
          if (error) {
            console.log(error);
            return res.status(500).json();
          } else {
            return res.status(204).json();
          }
        });
      } else {
        User.findByIdAndUpdate(userId, req.body.user, (error) => {
          if (error) {
            console.log(error);
            return res.status(500).json();
          } else {
            return res.status(204).json();
          }
        });
      }
    }
  });
}
// Delete a user
export function remove(req, res) {
  User.deleteOne({ _id: req.params.id }, (error) => {
    if (error) {
      return res.status(500).json();
    }
    return res.status(204).json();
  });
}
