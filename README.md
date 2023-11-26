# Bus Ticket Booking Website

Welcome to the Bus Ticket Booking Website! This platform is designed to facilitate the booking of bus tickets. Whether you're a passenger looking to book a seat, a bus owner managing trips, an admin overseeing the system, or a super admin with ultimate control, this website has features tailored for your needs.

## Features

### Passenger Role

As a passenger, you can:

1. **Register:** Create a new account from the login page.
2. **Login:** Access your account using your credentials.
3. **View Information:** Explore news, services, blogs, and provide feedback about the bus.
4. **Search Trips:** Search for available trips by date, source, and destination.
5. **Book Seats:** Reserve seats for available trips.
6. **View Bookings:** See all your booked information along with their statuses.
7. **Cancel Bookings:** If the status is pending, you can delete your booked seat.
8. **Give Reviews:** Share your thoughts and experiences by giving bus reviews.
9. **Edit Profile:** Update your personal information.

### Bus Owner Role

As a bus owner, you can:

1. **View Buses:** See all the buses you've added previously.
2. **Delete Buses:** Remove buses from your dashboard.
3. **Manage Trips:** Add new trips, delete trips, and edit trip information.

### Admin Role

As an admin, you can:

1. **Manage Passengers:** Edit or delete passenger information.
2. **Manage Bus Owners:** Create accounts, edit information, and delete accounts.
3. **Manage Buses:** Delete buses or edit bus information.
4. **Manage Trips:** Create trips, delete trips, or edit trip information.
5. **Manage Bookings:** Modify booking statuses (e.g., change pending to accepted) or delete bookings.
6. **Manage Feedback and Contact Info:** Handle user feedback and contact information.
7. **Manage News:** Create, edit, and delete news articles.
8. **Manage Blogs:** Create, delete, and edit blog articles.

### Super Admin Role

As a super admin, you have access to all admin features, plus:

1. **Manage Admins:** Create admin accounts, edit their information, and delete admin accounts.

### Email Confirmation Feature

Now, the Bus Ticket Booking Website includes an Email Confirmation feature. After an admin reviews and accepts a booked seat, passengers receive a confirmation email with a bus ticket HTML template.

## Authorization and Access Control

The website implements an authorization system that restricts access to certain features based on user roles. Each role has access only to the features and actions relevant to their responsibilities.

## JWT Access Token System

To ensure secure and authenticated access, the website implements a JWT (JSON Web Token) access token system. Users receive tokens upon successful login, which they must present for authorization to access the API routes based on their roles.

## Postman Documentation

For detailed information on the API and endpoints, refer to the [Postman Documentation](https://documenter.getpostman.com/view/21701595/2s9YR9ZYop#9ce64229-643c-42b9-97a3-2ff16eef50b3).

## Live Site

Visit the live Bus Ticket Booking Website [here](https://fast-bus-ticket.vercel.app/).

## Video Description

Watch a detailed video description of this platform on [Google Drive](https://drive.google.com/file/d/19VyR85SesHA7JZODmuCYa7OQv2TH-XRU/view?usp=sharing).

## Source Code

- Client-side source code is available on GitHub: [Fast Ticket Client](https://github.com/arifmia1129/fast-ticket-client).
- Server-side source code is also available on GitHub: [Fast Ticket Backend](https://github.com/arifmia1129/fast-ticket-backend).

Explore the website and enjoy a hassle-free bus ticket booking experience!
