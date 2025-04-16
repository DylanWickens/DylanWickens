let headlineInput = document.getElementById("headline");
let h1FontSizeInput = document.getElementById("h1FontSize");
let h2FontSizeInput = document.getElementById("h2FontSize");
let tilesXInput = document.getElementById("tilesX");
let tilesYInput = document.getElementById("tilesY");
let h1LineHeightSlider = document.getElementById("h1LineHeight");
let h2LineHeightSlider = document.getElementById("h2LineHeight");
let useSinInput = document.getElementById("useSin");
let waveAmplitudeInput = document.getElementById("waveAmplitude");
let waveFrequencyInput = document.getElementById("waveFrequency");
let applyXOffsetInput = document.getElementById("applyXOffset");

let pg;
let font, fontBold;
let TILESX, TILESY, TILEW, TILEH, gutter, margin;
let words = [],
  wordIndex,
  fullString;
let fontSize, lineHeight;

var c;
let baseCanvasWidth;

function preload() {
  font = loadFont("./fonts/NaNMetrifyB-VF.woff");
  fontBold = loadFont("./fonts/NaNMetrifyBUltrawide-Med.woff");
}

function setup() {
  c = createCanvas(900, 900);
  c.parent("canvasWrapper");
  pg = createGraphics(c.width, c.height);

  baseCanvasWidth = 500;
}

function draw() {
  TILESX = tilesXInput.value;
  TILESY = tilesYInput.value;

  gutter = c.width * (4.41 / baseCanvasWidth);
  margin = c.width * (14 / baseCanvasWidth);

  fontSize = parseFloat(h2FontSizeInput.value);

  lineHeight =
    parseFloat(h1FontSizeInput.value) * parseFloat(h1LineHeightSlider.value);

  TILEW = (width - margin * 2 - gutter * (TILESX - 1)) / TILESX;
  TILEH = (height - margin * 2 - gutter * (TILESY - 1)) / TILESY;
  wordIndex = 0;

  background("#f1f1f1");

  for (let y = 0; y < TILESY; y++) {
    for (let x = 0; x < TILESX; x++) {
      noFill();
      rect(
        margin + x * (TILEW + gutter),
        margin + y * (TILEH + gutter),
        TILEW,
        TILEH
      );
      noStroke();
      fill(0);
      textFont(font);
      textSize(fontSize);

      let tileX = margin + x * (TILEW + gutter);
      let tileY = margin + y * (TILEH + gutter);
      let textY;

      let useSin = useSinInput.checked;
      let waveAmplitude = parseFloat(waveAmplitudeInput.value);
      let waveFrequency = parseFloat(waveFrequencyInput.value);
      let multiplier = applyXOffsetInput.checked ? x + 1 : 1;
      let upwardWave, downwardWave;

      if (useSin) {
        upwardWave =
          sin(radians(frameCount * waveFrequency)) * waveAmplitude * multiplier;
        downwardWave =
          -sin(radians(frameCount * waveFrequency)) *
          waveAmplitude *
          multiplier;
      } else {
        upwardWave =
          tan(radians(frameCount * waveFrequency)) * waveAmplitude * multiplier;
        downwardWave =
          -tan(radians(frameCount * waveFrequency)) *
          waveAmplitude *
          multiplier;
      }

      push();
      if (x % 2 === 0) {
        translate(0, upwardWave);
        textY = tileY + TILEH - fontSize * 1.4;
      } else {
        translate(0, downwardWave);
        textY = tileY + fontSize;
      }

      // let lineSpacing = fontSize * 1.1;
      let lineSpacing = parseFloat(h2LineHeightSlider.value);

      drawCenterJustifiedText("Upper Studio 23rd May", tileX, textY, TILEW, [
        "Upper Studio",
        "23rd May",
      ]);

      drawCenterJustifiedText(
        "School of Communication",
        tileX,
        textY + lineSpacing,
        TILEW,
        ["School of", "Communication"]
      );
      pop();
    }
  }
  push();
  textAlign(CENTER, CENTER);
  textFont(fontBold);
  textSize(parseFloat(h1FontSizeInput.value));
  textLeading(lineHeight);
  fill("#0000ff");
  text(headlineInput.value, width / 2, height / 2);
  pop();

}

function drawCenterJustifiedText(str, x, y, width, groups) {
  if (Array.isArray(groups)) {
    let group1 = groups[0];
    let group2 = groups[1];
    let width1 = textWidth(group1);
    let width2 = textWidth(group2);
    let availableSpace = width - width1 - width2;
    text(group1, x, y);
    text(group2, x + width1 + availableSpace, y);
    return;
  }
  let words = str.split(" ");
  let totalWordsWidth = 0;
  for (let word of words) {
    totalWordsWidth += textWidth(word);
  }
  let spaceBetweenWords = (width - totalWordsWidth) / (words.length - 1);
  let currentX = x;
  for (let i = 0; i < words.length; i++) {
    text(words[i], currentX, y);
    currentX += textWidth(words[i]) + spaceBetweenWords;
  }
}

function saveImage() {
  // "myArtwork" is the base name, and "png" is the file type
  saveCanvas("myArtwork", "png");
}
