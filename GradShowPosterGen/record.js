function saveImage() {
    // Get the current timestamp for unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Save the canvas as a PNG file with timestamp in filename
    saveCanvas('p5js-canvas-' + timestamp, 'png');
    
    console.log('Canvas image saved!');
  }
  
  // Variables for video recording
  let mediaRecorder;
  let recordedChunks = [];
  let canvasStream;
  let isRecording = false;
  
  /**
   * Starts recording the canvas content as a video
   */
  function startRecording() {
    // Prevent starting another recording if one is in progress
    if (isRecording) {
      console.log('Recording already in progress');
      return;
    }
    
    // Get the canvas element
    const canvas = document.querySelector('canvas');
    
    // Create a media stream from the canvas
    canvasStream = canvas.captureStream(30); // 30 FPS
    
    // Initialize the MediaRecorder with the canvas stream
    mediaRecorder = new MediaRecorder(canvasStream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 2500000 // 2.5 Mbps
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
      a.download = 'p5js-recording-' + new Date().toISOString().replace(/[:.]/g, '-') + '.webm';
      
      // Trigger download
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      recordedChunks = [];
      isRecording = false;
      
      console.log('Video recording saved!');
    };
    
    // Start recording
    mediaRecorder.start();
    isRecording = true;
    console.log('Started recording canvas...');
    
    // Update UI to show recording state
    document.getElementById('saveVideo').classList.add('recording');
    document.getElementById('stopVideo').disabled = false;
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
    
    // Reset UI
    document.getElementById('saveVideo').classList.remove('recording');
    document.getElementById('stopVideo').disabled = true;
    
    console.log('Stopped recording. Preparing download...');
  }