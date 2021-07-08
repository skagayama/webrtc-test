/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

let id;
const button = document.querySelector('button');
button.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  id = setInterval(() => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  }, 50);
};

const slider = document.querySelector('input');
slider.onchange = function (e) {
  console.log(e.target.value);
  clearInterval(id);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  id = setInterval(() => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  }, e.target.value);
};

const constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
