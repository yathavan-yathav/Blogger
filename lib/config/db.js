// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();


// export const ConnectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             UseUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("DB Connected");
//     } catch (error) {
//         console.error("Database connection failed:",error);
//         process.exit(1);
//     }
// };

import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MongoDB URI is not defined in the environment variables.");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ DB Connected Successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

