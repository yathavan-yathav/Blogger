import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const { title, description } = req.body; // Get blog details

    // MongoDB Connection
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const subscribers = await db.collection("subscribers").find().toArray();
    client.close();

    const emails = subscribers.map(subscriber => subscriber.email);

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
        service: "gmail", // You can change this
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email Content
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: emails.join(","), // Send email to all subscribers
        subject: `New Blog Post: ${title}`,
        text: `Check out our latest blog post: ${title}\n\n${description}\n\nVisit our blog to read more!`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Email sending failed", details: error });
    }
}
