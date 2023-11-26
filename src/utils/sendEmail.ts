/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import config from "../config";

const sendEmail = async (ticketInfo: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.app_pass,
    },
  });

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bus Ticket Confirmation</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .ticket {
              max-width: 400px;
              margin: 20px auto;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .header {
              background-color: #3498db;
              color: #fff;
              padding: 15px;
              text-align: center;
          }
          .content {
              padding: 20px;
          }
          h2 {
              color: #333;
              margin-bottom: 10px;
          }
          p {
              color: #555;
              margin: 10px 0;
          }
          .footer {
              background-color: #3498db;
              color: #fff;
              padding: 10px;
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="ticket">
          <div class="header">
              <h2 style="color: white;">Bus Ticket Confirmation</h2>
          </div>
          <div class="content">
              <p><strong>Name:</strong> ${ticketInfo?.name}</p>
              <p><strong>Email:</strong> ${ticketInfo?.email}</p>
              <p><strong>Contact Number:</strong> ${ticketInfo?.contactNo}</p>
              <p><strong>Bus Name:</strong> ${
                ticketInfo?.busName || "Fast Bus"
              }</p>
              <p><strong>Bus Number:</strong> ${ticketInfo?.busNo}</p>
              <p><strong>Seat:</strong> ${ticketInfo?.seat}</p>
              <p><strong>Source:</strong> ${ticketInfo?.source}</p>
              <p><strong>Destination:</strong> ${ticketInfo?.destination}</p>
              <p><strong>Departure Time:</strong> ${ticketInfo?.time}</p>
              <p><strong>Date:</strong> ${ticketInfo?.date}</p>
          </div>
          <div class="footer" style="color: white;">
              <p style="color: white;">Thank you for choosing our bus service!</p>
          </div>
      </div>
  </body>
  </html>
  
  `;

  await transporter.sendMail({
    from: "arif.vtti@gmail.com",
    to: ticketInfo.email,
    subject: "Bus Ticket Confirmation",
    html: htmlContent,
  });
};

export default sendEmail;
