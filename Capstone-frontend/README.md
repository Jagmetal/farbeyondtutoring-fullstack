FarBeyondTutoring

FarBeyondTutoring is a music lessons booking app where users can select their preferred tutor, schedule a lesson, and book their slots seamlessly.

Features
User-friendly interface for service selection.
Interactive calendar date picker for lesson scheduling.
Dynamic checklist to keep track of booking steps.
Showcasing sample tutors on the homepage.
AWS Amplify authentication for user login.

Installation
Prerequisites:

Ensure you have Node.js and npm installed.

Clone the Repository:

git clone <https://github.com/Jagmetal/Capstone-frontend>

Install Dependencies:

cd <FarBeyondTutoring>
npm install

Run the Application:

npm start

Main Components
Pages

BookNow: This component handles the lesson booking process, including service selection, date selection, and user information collection.
Home: The landing page of the app showcasing a slideshow and sample tutors.
MusicLessons: A detailed view of available tutors and their descriptions.
App: Main app container with routing and navigation setup.

Components

CalendarDatePicker: A dynamic calendar for users to select their preferred date for lessons.
ServiceSelection: Allows users to choose their service and tutor.
YourInformation: Where users provide their details before finalizing the booking.
Checklist: Keeps track of completed steps in the booking process.
Slideshow: Displays a series of images, primarily used in the homepage.
TutorProfile: Detailed component showcasing tutor information and description.
Login: Integrated with AWS Amplify for user authentication.

Tests

To run tests:

npm test

Built With

React
React Bootstrap
MUI
AWS Amplify
Contributing
Pull requests are welcome. Please ensure to update tests as appropriate.

License
MIT