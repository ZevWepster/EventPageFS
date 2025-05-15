# Changelog

## [1.0.4] - 15-05-2025

### Installation

- Updated setup instructions: The project now uses a fullstack backend (Node/Express/Prisma/SQLite) instead of JSON Server.
- Start the backend with `npm run dev` in the `eventPage_BE/eventPage-backEnd` folder after running migrations and seeding.
- Start the frontend with `npm run dev` in the `eventPage_FE/eventPage` folder.

### Technologies

- **Frontend**: Vite, React, Chakra UI.
- **Backend**: Node.js, Express, Prisma ORM, SQLite.
- **Removed**: JSON Server (now using real backend and database).

---

### Changed

- Linked frontend and backend: The frontend now fetches all data from the backend API (no more static JSON or JSON Server).
- Updated all fetch URLs in the frontend to point to the backend.
- Enabled CORS in the backend for frontend communication.
- Fixed Prisma seed script to ensure all IDs are strings.
- Improved error handling in frontend for missing/undefined data.
- Added robust category name resolution in event pages.

### Debugged

- Fixed errors related to undefined or missing `categoryIds` in event data.
- Prevented crashes when categories or events are not yet loaded.
- Ensured all date/time fields use ISO 8601 format.

---

## [1.0.3] - 22-01-2025

### Added

- **Search bar suggestions**: Suggestions now show and are clickable.
- **Home Button Icon**: Added the Home icon using react-icons.

### Debugged

-**Page Errors**: Duplicate form field id in the same form. Checkboxes edit form. **PROBLEM SOLVED**

### Changed

- **Styling for EventPage**: Styled the EventPage.jsx for better readability.
- **Date Notation**: Edited the start/end time in the jsonfile to the conform notation.

## [1.0.2] - 21-01-2025

### Added

- **More mock events**: Added more events for experimenting with search bar suggestions (not functional yet).

### Debugged

- **Categories > Add FormLabel**: Developer console gave 3 issues with id of categories being the same, issues solved. They still persist in the EditForm

## [1.0.1] - 20-01-2025

### Added

### Changed

- **Home Button**: Made the home button more prominent by enhancing its appearance on hover, making it clearer as an interactive element.
- **Home Button Functionality**: When the home button is pressed, the search bar and filter are now reset to their default states.
- **Add Event Button**: Moved the "Add Event" button to a more logical and intuitive location for better user experience.
- **Event not found**: Added a "Sorry, no events match your search." message when there are no search results.

## [1.0.0] - 08-01-2025

### Added

- **Event Overview**: Users can view event details by clicking on an event.
- **Event Management**: Users can edit or delete existing events directly from the event overview.
- **Add Event Modal**: Implemented a user-friendly modal to add new events.
- **Real-time Updates**: Integrated JSON Server to provide real-time updates to the event list.

### Installation

- Added detailed setup instructions for running the project with two terminals:
  - One terminal to run the Vite development server.
  - Another terminal to run the JSON server for event data.

### Technologies

- Introduced **Vite** as the build tool for efficient development.
- Added **JSON Server** to simulate an API for event data.
