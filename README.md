# Unity .NET + Node.js Websocket Example

A Unity .NET client and a Node.js server example.

## Server Setup

In your terminal navigate into the server folder and run

```bash
npm i
```

which will install the two dependancies for the server.

## Server Usage

In the server folder run

```bash
npm run start
```

that'll start an interactive terminal and the Websocket server running on port `3333`.

Once the server is running you can type commands to your clients and send with enter.

Stop the server with `CTRL + C`.

## Client Setup

(run the server first)

In Unity, add the `WebsocketController.cs` script to a GameObject in your scene and run the scene.

Watch the console in Unity for incoming commands from your Websocket server.

## Notes

For more complex commands and payloads you'll probably want to look at JSON encoding and decoding (or not, you could send everything as CSV!).

In C# this is a real pain (types, man... who needs 'em?), but this should help you get started:
https://docs.unity3d.com/Manual/JSONSerialization.html
