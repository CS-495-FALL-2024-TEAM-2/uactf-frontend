# UA CTF Frontend

This is the frontend for the UA CTF (Capture The Flag) application. It's built using Next.js.


## Dependencies
The project utilizes the following dependencies:
- Next.js
- Tanstack Query
- Chakra UI
- Next UI

## Setup

1. Clone the repository
  ```
  git clone https://github.com/CS-495-FALL-2024-TEAM-2/uactf-frontend.git
  cd uactf-backend
  ```

2. Install dependencies:
  ```
  npm install
  ```

3. Set up environment variables
You need to provide the value for this `.env` format template
```
NEXT_PUBLIC_BACKEND_URL=
```

4. Build the application:
  ```
  npm run build
  ```

5. Start the application:
  ```
  npm run start
  ```

If you want to run it in dev mode:
  ```
  npm run dev
  ```

## Project Structure
The UA CTF frontend leverages Next.js with app router. There are public pages and protected pages.
The public pages do not require the users to login to access. Here are the public pages:
- `/login`: To login to the application using their emails and generated passwords.

- `/register`: For teachers and crimson defense members to register for an account to use the application.

- `/forgot-password`: For teachers and crimson defense members to retrieve a new password using their emails.

The protected pages require the users to login before being able to access them. Here are the protected pages:

- `/challenges`: For users to view challenges created. Users can also create and update the challenges from here.

- `/teams`: For teachers to view the teams they created and updated them. Teachers can also update the info of the students of the teams as well as upload their liability forms from here.

- `/competitions`: For admin to view the competitions they created. The admin can also update the competitions and activate as well as deactivate one.

- `/teachers`: For admin to view the teachers who registered.

- `approve-liability-release-form`: For admin to approve the uploaded liability forms.
