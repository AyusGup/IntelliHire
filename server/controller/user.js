const User = require("../models/User");
const dotenv = require('dotenv');
dotenv.config();

async function handlenewUser(username, url) {
    try {
        // Check if user with the provided username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User already exists:", existingUser);
            return; // Return or handle accordingly if user already exists
        }

        // If user doesn't exist, create and save the new user
        const user = new User({
            username: username,
            userImage: url
        });

        const savedUser = await user.save();
        console.log(savedUser, "saved");
        // Handle the successful save, e.g., redirect or return success response
    } catch (error) {
        console.error("Error saving user:", error);
        // Handle the error, e.g., redirect to signup page with an error message
        return res.status(500).redirect("/signup");
    }
}


module.exports = {handlenewUser};