import { Component } from '@angular/core';

declare var VidyoPlugin: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  portal: string = "*.vidyocloud.com";
  roomKey: string = "your room key";
  displayName: string = "your name";
  pin: string = "";

  constructor() {
  }

  connect() {
    console.log("Connect" + this.portal + ":" + this.roomKey + ":" + this.displayName + " pin: " + this.pin);

    /* Pass the callback to the native side */
    VidyoPlugin.setCallback(this.onVidyoEvent);
    
    VidyoPlugin.connect([this.portal, this.roomKey, this.displayName, this.pin]);
  };

  onVidyoEvent = {

    onEvent: function (response) {
      let event = response.event;

      switch (response.event) {
        case 'Connected':
          console.log('JS layer: connected to the conference');
          break;

        case 'Disconnected':
          let reason = response.reason;
          console.log('JS layer: disconnected from the conference. Reason: ' + reason);
          break;

        case 'Failure':
          reason = response.reason;
          console.log('JS layer: Failure during connection. Reason: ' + reason);
          break;

        case 'CameraStateUpdated':
          let muted = response.muted;
          console.log('JS layer: Received camera state updated. Muted: ' + muted);
          break;

        case 'MicrophoneStateUpdated':
          muted = response.muted;
          console.log('JS layer: Received microphone state updated. Muted: ' + muted);
          break;
      }
    }
  };
}