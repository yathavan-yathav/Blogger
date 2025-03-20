export const dynamic = "force-dynamic";
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, description } = await request.json();  // Get blog details
    const blogUrl = "http://localhost:3000/"

    // MongoDB Connection
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const emailData = await db.collection("emails").find().toArray();
    console.log("Fetched email data:",emailData);
    client.close();

    const emails = emailData.map(item => item.email).filter(Boolean);
    console.log("Emails array:",emails);

     // Check if emails are found
     if (emails.length === 0) {
        console.error("No emails found in the database.");
        return NextResponse.json({ message: "No valid email addresses found in the database." });
    }

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
        text: `Hi there,\n\nI have just published a new blog post titled "${title}".\n\nYou can read it here: ${blogUrl}\n\nBest regards,\nAlex`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Emails sent successfully for the blog: ${title}`);
        return NextResponse.json({ message: "Emails sent successfully!" }); 
    } catch (error) {
        console.error("Error sending emails:", error);
        return NextResponse.json({ message: "Emails sent successfully!" });
      
    }
}
