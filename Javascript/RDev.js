let NanMetrify;
let graphic;
let random = Math.random() * 300 + 200;
let multiplier = 1000;

// Variables for scaling
let canvasWidth = 1800;
let canvasHeight = 600;
let textSizeValue = 390;

function preload() {
    NanMetrify = loadFont("../Assets/Fonts/NaNMetrify-B-Latin/NaNMetrifyBGigawide-Blck.woff");
}

function setup() {
    applyScaling(); // Apply scaling based on screen size
 
    let myCanvas = createCanvas(canvasWidth, canvasHeight);
    myCanvas.parent("#RD")

    graphic = createGraphics(canvasWidth, canvasHeight);

    graphic.textSize(textSizeValue);
    graphic.textAlign(CENTER, CENTER);
    graphic.fill("#2D78F2");
    graphic.textFont(NanMetrify);
    graphic.textStyle(100);

    graphic.text("R&D", canvasWidth / 2, canvasHeight / 3);
}

function draw() {
    background("#f1f1f1");
    const tileSize = 80;

    const targetMultiplier = constrain(50 - scrollY / 10, 15, 50);
    multiplier = lerp(multiplier, targetMultiplier, 0.035);

    for (let x = 0; x < canvasWidth / tileSize; x++) {
        for (let y = 0; y < canvasHeight / tileSize; y++) {
            const distortion = sin(frameCount * 0.05 + x * 0.5 + y * 1) * multiplier;

            const sx = x * tileSize + distortion;
            const sy = y * tileSize + distortion / 10;
            const sw = tileSize;
            const sh = tileSize;

            const dx = x * tileSize;
            const dy = y * tileSize;
            const dw = tileSize;
            const dh = tileSize;

            image(graphic, dx, dy, dw, dh, sx, sy, sw, sh);
        }
    }
}

function applyScaling() {
    if (windowWidth > 3800) { // Ultra-large screens
        canvasWidth = 3800;
        canvasHeight = 850;
        textSizeValue = 800;
    } else if (windowWidth > 2560) { // For larger screens
        canvasWidth = 2800;
        canvasHeight = 600;
        textSizeValue = 580;
    } else if (windowWidth > 1920) { // For medium-large screens
        canvasWidth = 2000;
        canvasHeight = 600;
        textSizeValue = 450;
    } else { // Default settings for smaller screens
        canvasWidth = 1800;
        canvasHeight = 600;
        textSizeValue = 390;
    }
}

// Resize canvas dynamically when the window is resized
function windowResized() {
    applyScaling();
    resizeCanvas(canvasWidth, canvasHeight);

    // Update graphics with the new dimensions
    graphic = createGraphics(canvasWidth, canvasHeight);
    graphic.textSize(textSizeValue);
    graphic.textAlign(CENTER, CENTER);
    graphic.fill("#2D78F2");
    graphic.textFont(NanMetrify);
    graphic.textStyle(100);

    graphic.text("R&D", canvasWidth / 2, canvasHeight / 3);
}

window.addEventListener("resize", () => {
    applyScaling(); // Update the canvas dimensions based on new screen size
    resizeCanvas(canvasWidth, canvasHeight);
    
    // Update the graphic context as well
    graphic = createGraphics(canvasWidth, canvasHeight);
    graphic.textSize(textSizeValue);
    graphic.textAlign(CENTER, CENTER);
    graphic.fill("#2D78F2");
    graphic.textFont(NanMetrify);
    graphic.textStyle(100);

    graphic.text("R&D", canvasWidth / 2, canvasHeight / 3);
});