# Dropbox Webhooks

## Overview

A Node.js application designed to run custom code in response to events from Dropbox. Specifically, it listens for webhook notifications from Dropbox indicating that files have been added, removed, or changed, and then performs custom actions in response to these events.

## Getting Started

### Prerequisites

- Node.js and Yarn installed on your machine
- A Dropbox App with appropriate permissions
- Optional: Ngrok for exposing your local development environment to the internet (for receiving webhooks from Dropbox)

### Setting Up Your Environment

1. **Install Dependencies**
   Navigate to the project directory and install the required npm packages:

   ```bash
   yarn install
   ```

2. **Start the Development Server**
   Use the following command to start the development server. It will restart automatically upon any code changes.

   ```bash
   yarn dev
   ```

3. **Expose Your Local Server**
   To receive webhooks from Dropbox, you need to expose your local development server to the internet. You can use Ngrok for this:
   ```bash
   ngrok http 3000
   ```
   This will provide you with a public URL that forwards to your local server.

### Configuring Dropbox Webhook

1. **Add Webhook URL to Dropbox App Console**
   - Go to the [Dropbox App Console](https://www.dropbox.com/developers/apps).
   - Choose your app, or create a new one if necessary.
   - In the settings for your app, find the 'Webhook URIs' section.
   - Add the public URL provided by Ngrok (or your production URL) followed by the webhook endpoint path (e.g., `https://<your-url>/dropbox-webhook`).

### Building the Docker Container

To containerize the application, ensuring it can run in any environment that supports Docker:

1. **Build the Docker Image**
   Run the following command in the project root directory:

   ```bash
   docker build -t my-dropbox-webhooks .
   ```

2. **Run the Docker Container**
   After building the image, start a container from the image:

   ```bash
   docker run -p 3000:3000 my-dropbox-webhooks
   ```

   This will start the application inside a Docker container, listening on port 3000.

## Next Steps

You can now extend the application to handle specific Dropbox events according to your needs. Implement the event handlers in the application logic, and ensure they respond as expected to the events emitted by Dropbox.

---

For further details on the Dropbox API and webhooks, refer to the [official Dropbox API documentation](https://www.dropbox.com/developers/documentation/http/documentation).
