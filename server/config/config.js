const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connection successful");
    } catch (error) {
        console.error("DB connection failed");
        console.error(error);
        process.exit(1); // Exit process with failure
    }
};
