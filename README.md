# Instant Message App

## Getting started

Install dependencies:
`npm run install`

Start the app:
`npm run start`

See the app running in the browser:
`http://localhost:8001`

## Verifying the API when entering messages

Open the JavaScript console in your browser (assuming Chrome) after you enter a message. In the console, you should see `posted to api and got response:` with the JSON response following. The JSON response is the same as your original message that was submitted.

## Approach

### Separation between api and client.

The api and client are maintained in their own directories:

- `api/` contains the Express server for the API, from which you can GET and POST message data.
- `client/` contains the messaging app code from which you can

Currently, the api is implemented as an express server that reads a local json file. In the future, the api could be moved to a remote server, possibly with a database. Because of this, the client is completely unaware the implementation details of the api (other than how to interact with its external endpoints).

### JS for UI modules that works server side and at runtime.

Since a requirement of this app is to server side render content, there needs to be a way to build HTML that works server side and on the client. To this end, Browserify was useful because I could write the JS responsible for building the layout that works in both Node and the browser at runtime.

## Challenges

Server side rendering gets complicated for apps that are dependent on JavaScript for constructing their UI, especially when libraries like React are involved. Due to the time constraints of this challenge, I wanted to keep my tool chain as simple as possible. Though Gulp was ideal because it keeps file operations concrete and it is simple to just add individual features at a time.
