# Sample Full Stack Experience

## Problem Statement

Developers and testers need to use devices and virtual machines to deploy and test applications. Sometimes, multiple team members use the same assets, causing services and applications to misbehave for others, since one team member might alter configurations or applications for their testing. These devices and virtual machines are limited in number, so team members need to share asset usage efficiently.

### Running the application

The application comes with a shell script which requires the following to run.
Application backend runs on port 5000 by default and frontend on 3000.

#### Requirements

- Node.js **v22.19.0** or later
- npm (comes with Node.js)

#### How to start

##### Script

On Linux/MacOS(while in directory)

```bash
chmod +x server.sh
./start.sh
```

On Windows

```bash
start.bat
```

##### Manually

for backend(while in directory)

```bash
cd backend
npm install
npm run dev
```

for frontend(while in directory)

```bash
cd frontend
npm install
npm run dev
```
