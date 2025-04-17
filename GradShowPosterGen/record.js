// Variables for video recording
let mediaRecorder;
let recordedChunks = [];
let canvasStream;
let isRecording = false;

/**
 * Starts recording the canvas content as a video with higher quality
 */
function startRecording() {
  // Prevent starting another recording if one is in progress
  if (isRecording) {
    console.log('Recording already in progress');
    return;
  }
  
  // Get the canvas element
  const canvas = document.querySelector('canvas');
  
  // Create a media stream from the canvas with higher frame rate
  canvasStream = canvas.captureStream(60); // 60 FPS for smoother video
  
  // Set up media recorder with high quality settings
  mediaRecorder = new MediaRecorder(canvasStream, {
    mimeType: 'video/webm;codecs=vp9',
    videoBitsPerSecond: 40000000 // 8 Mbps for higher quality
  });
  
  // Event handler for when data is available
  mediaRecorder.ondataavailable = function(event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };
  
  // Event handler for when recording stops
  mediaRecorder.onstop = function() {
    // Create a blob from the recorded chunks
    const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a download link
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'poster-recording-' + new Date().toISOString().replace(/[:.]/g, '-') + '.webm';
    
    // Trigger download
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    recordedChunks = [];
    isRecording = false;
    
    console.log('Video recording saved!');
    
    // Update UI
    const saveVideoBtn = document.getElementById('saveVideo');
    if (saveVideoBtn) {
      saveVideoBtn.textContent = 'Start Recording';
      saveVideoBtn.classList.remove('recording');
    }
    
    const stopVideoBtn = document.getElementById('stopVideo');
    if (stopVideoBtn) {
      stopVideoBtn.disabled = true;
    }
  };
  
  // Start recording
  mediaRecorder.start();
  isRecording = true;
  console.log('Started recording canvas...');
  
  // Update UI
  const saveVideoBtn = document.getElementById('saveVideo');
  if (saveVideoBtn) {
    saveVideoBtn.textContent = 'Recording...';
    saveVideoBtn.classList.add('recording');
  }
  
  const stopVideoBtn = document.getElementById('stopVideo');
  if (stopVideoBtn) {
    stopVideoBtn.disabled = false;
  }
}

/**
 * Stops the current video recording and triggers download
 */
function stopRecording() {
  if (!isRecording || !mediaRecorder) {
    console.log('No recording in progress');
    return;
  }
  
  // Stop the media recorder
  mediaRecorder.stop();
  console.log('Stopped recording. Preparing download...');
}