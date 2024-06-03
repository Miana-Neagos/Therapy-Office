# Therapy Services Webpage

## Project Introduction
This project is a comprehensive web application designed for a private practice offering therapy services. The primary functionalities of this web application include:

- **Online Booking**: Users can book therapy sessions online.
- **Booking Management**: Users can view and delete their existing bookings.
- **Contact Form**: A contact form is available for users to get in touch with the practice.
- **Embedded YouTube Content**: Informative videos about therapy services are embedded within the site.

The website aims to provide a user-friendly interface for clients to easily access therapy services, manage their appointments, and learn more about the practice.

## Available Scripts
In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the project configuration.

## Dependencies
The project relies on the following major dependencies:
- `react-player`: For embedding and controlling video players.
- `react-calendar`: For selecting dates in booking and scheduling components.
- `json-server` (version 0.17.3): For creating a mock REST API.
- `json-server-auth`: For adding authentication to the mock REST API.
- `emailjs/browser`: For sending emails directly from the client-side.
- `react-router-dom`: For handling routing within the application.
- `react-router-hash-link`: For handling hash links within the application.
- `react-icons`: For including icons in the application.
Refer to the `package.json` file for the complete list of dependencies required by the project.

## Directory and File Descriptions
- **assets/**: directory for image and other asset files
- **components/**: directory for React components
  - **about-us/**: About Us component files, which detail the background and qualifications of the therapists.
  - **b-user-appointments/**: components related to displaying and managing user appointments.
  - **booking/**: components related to the booking process (add booking, updating the DB post delete/add booking) and triggers DateTimeSelector, UserUpdates components as well.
  - **contact-form/**: components for the contact form where users can send messages to the practice.
  - **datetime-selector/**: DateTimeSelector component files for React Calendar functionality and UI rendering and selecting dates and times in the booking process.
  - **discovery-session/**: components related to the Discovery Session feature, allowing users to request a short intro session.
  - **doc-selection/**: components for selecting a therapist.
  - **faq/**: FAQ component files
  - **home/**: Home component files which serve as the main landing page of the application.
  - **how-are-you/**: components related to user check-ins and (personal) self-assessments.
  - **lib/**: directory for utility and library files used across the application:
    - `available-dates.js`: class to generate available dates that are at the base of the therapist date and time availabilities
    - `booking-context.js`: manages booking context and data fetching for the booking process.
    - `data-validation.js`: functions for validating form data inputs.
    - `format-dates.js`: utility functions for formatting dates in various components.
    - `nav-links.js`: defines navigation links used in the NavBar component.
    - `register-authenticate.jsx`: Handles user registration and authentication
    - `services.js`: Service descriptions for the Services component
  - **login-register/**: Login and Register component files
  - **modal/**: Modal component files used for displaying pop-up messages and confirmations.
  - **nav-bar/**: NavBar component files
  - **quick-links-home/**: Quick Links component files for the Home page, providing easy navigation to key sections.
  - **schedule/**: component files which display the working hours of the therapists.
  - **services/**: component files which detail the various therapy services offered.
  - `App.css`: global CSS for the app
  - `App.jsx`: main App component - hold references to authentication and booking context
- **db.json**: mock database file for local API to simulate backend data.
- **package.json**: manages project dependencies and scripts
- **routes.json**: defines the routes for the application, mapping URLs to components.

## Getting Started
To get started with this project, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/react-project.git
   ```
2. **Install dependencies**:
   ```sh
   cd react-project
   npm install
   ```
3. **Start the development server**:
   ```sh
   npm start
   ```
4. **Open the application in your browser**:
   Navigate to http://localhost:3000 to see the application in action.



