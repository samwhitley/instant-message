# Better Messages

## Getting started

Install dependencies:
`npm run install`

Start the app:
`npm run start`

See the app running in the browser:
`http://localhost:9001`

## Verifying the API when entering messages

Open the JavaScript console in your browser (assuming Chrome) after you enter a message. In the console, you should see `posted to api and got response:` with the JSON response following. The JSON response is the same as your original message that was submitted.

## Approach

### Separation between api and client.

The api and client are maintained in their own directories:

* `api/` contains the Express server for the API, from which you can GET and POST message data.
* `client/` contains the messaging app code from which you can 

Currently, the api is implemented as an express server that reads a local json file. In the future, the api could be moved to a remote server, possibly with a database. Because of this, the client is completely unaware the implementation details of the api (other than how to interact with its external endpoints).

### JS for UI modules that works server side and at runtime.

Since a requirement of this app is to server side render content, there needs to be a way to build HTML that works server side and on the client. To this end, Browserify was useful because I could write the JS responsible for building the layout that works in both Node and the browser at runtime.

## Challenges

Server side rendering gets complicated for apps that are dependent on JavaScript for constructing their UI, especially when libraries like React are involved. Due to the time constraints of this challenge, I wanted to keep my tool chain as simple as possible. Though Gulp was ideal because it keeps file operations concrete and it is simple to just add individual features at a time.

## Incomplete areas

This app is not complete, and I haven't implemented all of the features in the requirements or gotten the UI to where I would want it to be. The following items are unfinished:

- Click/tap event on messages that show the last active time
- Image handling in posts - these should be displayed under the message body as images
- Interactive character limit - this should count down as the user enters characters into the text box
- UI polish - currently the app lacks animations and transitions
- Mobile polish - I would like to add breakpoints to get the font sizes and spacing ideal for mobile. Currently, it's usable on mobile but not great
- Validation - right now, the validation on the messages is very simple. I'd like a more robust solution to ensure that people aren't sending malicious code in their messages.
