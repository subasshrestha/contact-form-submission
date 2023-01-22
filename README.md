# Contact Form Submission

## Installation
1. Clone the repository
2. Install the dependencies
```
npm install
```
3. Prepare the environment variables by creating a .env file in the root directory and copy the content of .env.example into it

4. Start the server
```
npm start
```

## Usage

### Send a message
```
POST /api/v1/messages
```
#### Request Body
```
{
    "name": "John Doe",
    "email": "example@gmail.com",
    "message": "Hello World"
}
```
#### Response
```
{
    "message": "Email sent successfully"
}
```
