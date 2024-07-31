
# Collaborative Online Whiteboard

A web-based collaborative whiteboard application that supports real-time interaction and secure user authentication.


## Features

- **Real-time Collaboration:** Multiple users can draw, write, and interact on a shared whiteboard simultaneously, with live updates reflecting changes made by others.
- **Secure Authentication:** Users must log in to access the whiteboard, ensuring that only authorized individuals can collaborate.
- **Responsive Design:** The application provides a user-friendly experience across different devices and screen sizes.



## Technologies Used

- **Next.js:** For building the responsive user interface.
- **Convex DB:** For managing and storing user-generated content.
- **Liveblocks:** For real-time collaboration and synchronization.
- **Clerk:** For secure user authentication and management.

## Screenshot
https://raw.githubusercontent.com/Neel3301/White-Board/main/public/Screenshot%202024-07-31%20130122.png

![App Screenshot](https://github.com/Neel3301/White-Board/blob/main/public/Screenshot%202024-07-31%20130122.png?raw=true)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Neel3301/White-Board.git
```

Go to the project directory

```bash
  cd white-board
```

Install dependencies

```bash
  npm install
```

Connect Convex

```bash
  npx convex dev
```
Start the server

```bash
  npm run dev
```
