# JavaScript Hacks and Tricks

Welcome to the repository for our Next.js application that showcases a curated collection of JavaScript hacks and tricks. This platform allows developers to share their ingenious solutions and explore hacks submitted by others in the community. Whether you're a beginner or a seasoned expert, this resource is designed to help enhance your coding skills with practical, real-world JavaScript examples.

## Features

- **Browse Hacks**: Users can navigate through tabs like Hot, New, and Top Tricks to find useful and innovative JavaScript hacks.
- **Submit Hacks**: Contributors can easily add new hacks to the platform, sharing their knowledge and tips with the community.
- **User Interaction**: Users can view detailed pages for each hack, providing insights and potential use cases for each piece of code.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS Version)
- npm (comes with Node.js)

### Installing

1. Clone the repo:

   ```bash
   git clone https://github.com/mohit9889/code-hack-next.git
   ```

2. Navigate to the project directory:

   ```bash
   cd code-hack-next
   ```

3. Install NPM packages:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Next.js app in development mode. Open http://localhost:3000 to view it in the browser.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

- `BASE_URL` - The base URL where your application is hosted.
- `API_BASE_URL` - The base path where your API is accessible.

### Example `.env` File

```plaintext
# Configuration for the Next app
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:4000/api/v1
```

### Built With

- Next.js - The React framework for production
- Node.js - Server Environment
