### Vidyoplatform Connector Ionic-Cordova

1. Download/Clone and prepare plugin: https://github.com/tmelko-vidyo/vidyoplatform-connector-cordova-plugin
> Place Android libs at: /src/androd/lib/

> Place iOS framework at: /src/ios/

(Different as for vidy.io connector plugin)

2. Add Android & iOS platforms:

> $ ionic cordova platform add android

> $ ionic cordova platform add ios

3. Add plugin from local folder:

> $ ionic cordova plugin add "path-to-plugin"
  
4. Build & Run ionic project:

> $ ionic cordova build android

> $ ionic cordova run android

> $ ionic cordova build ios

> $ ionic cordova run ios
