# Movie List

A web application that allows users to browse and manage their favorite movies. This project is built using Next.js, Tailwind CSS, and Firebase.

## Features

- **Browse Movies**: Search and view details of movies.
- **Manage List**: Add or remove movies from your personal list.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sunny-mahajan/movie-list.git
   cd movie-list
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Firebase Setup

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/).
- Click **Add Project** and follow the prompts.

### 2. Set Up Firestore
- Select **Firestore Database** from the sidebar.
- Click **Create Database**, choose a mode (Production/Test), and set the location.

### 3. Set Up Storage
- Select **Storage** from the sidebar.
- Click **Get Started**, choose a location for your storage bucket, and click **Done**.

### 4. Get Firebase Config
- Go to **Project settings** by clicking the gear icon in the Firebase Console.
- Scroll to **Your apps**, select your app, and copy the Firebase config snippet.

### 5. Add Config to Project
- Update the Firebase config in `.env` project with the snippet from the Firebase Console to enable movie list management features.

## CI/CD Pipeline

Continuous Integration and Continuous Deployment (CI/CD) are set up for this project.

- **Deployment Process**: Any changes pushed to the `main` branch are automatically deployed to AWS Amplify.
- **Deployment Time**: Deployment typically completes within 4-5 minutes.

### App Link

You can access the deployed application here: [Movies List](https://main.dqrfcqn3holh8.amplifyapp.com/)

### Login Credentials

Use the following credentials to log in:
- **Email**: `test1@email.com`
- **Password**: `123456`



## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)