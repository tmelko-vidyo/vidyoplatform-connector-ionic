import { Component } from "@angular/core";

declare var VidyoPlugin: any;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {

  portal: string = "*.vidyocloud.com";
  roomKey: string = "your room key";
  displayName: string = "your name";
  pin: string = "";

  constructor() {}

  connect() {
    console.log(
      "Connect " +
        this.portal +
        ":" +
        this.roomKey +
        ":" +
        this.displayName +
        " with pin: ;" +
        this.pin
    );

    /* Pass the callback to the native side */
    VidyoPlugin.setCallback(this.onVidyoEvent);

    VidyoPlugin.connect([
      this.portal,
      this.roomKey,
      this.displayName,
      this.pin,
      8,
      "debug@VidyoClient info@VidyoConnector warning",
    ]);
  }

  extractLog() {
    VidyoPlugin.extractLog();
  }

  onVidyoEvent = {
    onEvent: function (response) {
      let event = response.event;

      switch (event) {
        case "Connected":
          console.log("JS layer: connected to the conference");
          break;

        case "Disconnected":
          let disconnectReason = response.value;
          console.log(
            "JS layer: disconnected from the conference. Reason: " +
              disconnectReason
          );
          break;

        case "Failure":
          let failureReason = response.value;
          console.log(
            "JS layer: Failure during connection. Reason: " + failureReason
          );
          break;

        case "CameraStateUpdated":
          let cameraState = response.state;
          console.log(
            "JS layer: Received camera state updated. Muted: " + cameraState
          );
          break;

        case "MicrophoneStateUpdated":
          let micState = response.state;
          console.log(
            "JS layer: Received microphone state updated. Muted: " + micState
          );
          break;

        case "ParticipantJoined":
          let joined = response.participant;
          console.log("JS layer: Participant joined: " + joined);
          break;

        case "ParticipantLeft":
          let left = response.participant;
          console.log("JS layer: Participant left: " + left);
          break;
      }
    },
  };
}
