var options = {
    controls: true,
    width: 800,
    height: 450,
    fluid: false,
    bigPlayButton: false,
    controlBar: {
        volumePanel: false,
        fullscreenToggle: false
    },
    plugins: {
        record: {
            audio: true,
            screen: true,
            debug: true,
            displayMilliseconds: false
        }
    }
};

// apply some workarounds for opera browser
applyVideoWorkaround();
applyScreenWorkaround();

var player = videojs('myScreenAudio', options, function() {
    // print version information at startup
    var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
    videojs.log(msg);
});

// error handling
player.on('deviceError', function() {
    console.log('device error:', player.deviceErrorCode);
});

player.on('error', function(element, error) {
    console.error(error);
});

// user clicked the record button and started recording
player.on('startRecord', function() {
    console.log('started recording!');
});

// user completed recording and stream is available
player.on('finishRecord', function() {
    // the blob object contains the recorded data that
    // can be downloaded by the user, stored on server etc.
    console.log('screen+audio recording ready: ', player.recordedData);
});