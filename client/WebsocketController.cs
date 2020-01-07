using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using UnityEngine;

public class WebsocketController : MonoBehaviour {
    public String address = "ws://localhost:3333";

    Uri u;
    ClientWebSocket cws = null;
    ArraySegment<byte> buf = new ArraySegment<byte> (new byte[1024]);

    void Start () {
        u = new Uri (address);
        Connect ();
    }

    async void Connect () {
        cws = new ClientWebSocket ();
        try {
            await cws.ConnectAsync (u, CancellationToken.None);
            if (cws.State == WebSocketState.Open) {
                Debug.Log ("connected to " + address);
            }

            SayHello ();
            GetStuff ();
        } catch (Exception e) {
            Debug.Log ("oh sh- " + e.Message);
        }
    }

    async void SayHello () {
        ArraySegment<byte> b = new ArraySegment<byte> (Encoding.UTF8.GetBytes ("hello"));
        await cws.SendAsync (b, WebSocketMessageType.Text, true, CancellationToken.None);
    }

    void ParseCommand (String command) {
        if (command == "clear") {
            Debug.Log ("clear? CLEAR WHAT?? you clear.");
            // do something based on the clear command
            // call another class' method maybe?
        }
    }

    // this is a recursive function, it waits for a message
    // then decodes it, calls itself again to wait for the
    // next message.
    // 
    // as it's async it doesn't hog the main thread.
    async void GetStuff () {
        WebSocketReceiveResult r = await cws.ReceiveAsync (buf, CancellationToken.None);
        String command = Encoding.UTF8.GetString (buf.Array, 0, r.Count);
        Debug.Log ("Got: " + command);
        ParseCommand (command);
        GetStuff ();
    }
}