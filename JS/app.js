import { pericles } from "./pericles.js";

let isRunning = true;
const htmlOutput = document.getElementById("output"); // Live view of the monkeys

// For findHighlightIframe() function
const iFrame = document.getElementById("iFrame");
let ogIframeContent = null;

let longestOutput = ''; // Longest collection of characters that exist within the play
let currentString = ''; // Current collection of random characters we are checking against the full play
let totalCharacters = 0; // Total characters typed

// The characters we are allowing our monkeys to be able to use.  Obtained by getting a set of all the characters used in the Pericles string.
const characters = [
  'A', 'C', 'T', ' ', '1', '\n', '=', 'h',  'o', 'r',
  'u', 's', '[', 'E', 'n', 't',  'e', 'G',  'w', '.',
  ']', 'O', 'W', 'R', 'i', 'g',  'a', 'l',  'd', ',',
  'F', 'm', 'c', "'", 'f', 'y',  'p', 'I',  'b', 'v',
  'H', 'k', 'q', 'M', ':', 'B',  'S', 'x',  ';', '!',
  'j', 'P', 'N', 'U', 'Y', 'L',  'z', '\t', 'J', '-',
  'D', '?', 'K', '2', '(', ')',  '3', '4',  'Z', '"',
  'Q', '5', 'V', '6'
];

// Function to return uptime for us to display.
function getReadableUptime() {
  const totalSeconds = performance.now() / 1000
  // const nodeTotalSeconds = process.uptime(); << for server
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  let hrs = "";
  if (hours < 10) {
    hrs = "0" + hours;
  } else {
    hrs = hours;
  }

  let mins = "";
  if (minutes < 10) {
    mins = "0" + minutes;
  } else {
    mins = minutes;
  }

  let secs = "";
  if (seconds < 10) {
    secs = "0" + seconds;
  } else {
  secs = seconds;
  }
  
  return `${hrs}:${mins}:${secs}`;
}

// Function to find and highlight the longestOutput
function findHighlightIframe(longestOutput) {  
  const innerDoc = iFrame.contentDocument || iFrame.contentWindow.document;
  const body = innerDoc.body;

  // Original iframe text to reset highlights
  if (!ogIframeContent ) {
    ogIframeContent  = body.innerHTML;
  }
  body.innerHTML = ogIframeContent;

  // ESCAPE special regex characters (like ?, (, ), .) so they don't break the script
  const escapedOutput = longestOutput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Apply new highlight, we use a specific ID for the FIRST match to scroll to it
  let firstMatchFound = false;
  const regex = new RegExp(`(${escapedOutput})`, 'g');
  
  body.innerHTML = body.innerHTML.replace(regex, (match) => {
    if (!firstMatchFound) {
      firstMatchFound = true;
      return `<mark id="first-match" class="highlight">${match}</mark>`;
    }
    return `<mark class="highlight">${match}</mark>`;
  });

  //Scroll to the first match
  const firstMatchElement = innerDoc.getElementById('first-match');
  if (firstMatchElement) {
    // block: 'center' so it doesn't hit the top of the frame
    firstMatchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function run() {
  if (!isRunning) return;
  
  // Display uptime
  document.getElementById("uptime").textContent = getReadableUptime();

  while (pericles.includes(currentString)) {
    // Do this check first so we don't add an extra erroneous character to the longestOutput string.
    if (currentString.length > longestOutput.length) {
      longestOutput = currentString;
      document.getElementById("longestText").textContent = longestOutput;

      longestLength = output.length;
      document.getElementById("longestLength").textContent = longestOutput.length;

      findHighlightIframe(longestOutput);
    }

    currentString += characters[Math.floor(Math.random() * 74)];
    totalCharacters++;
    document.getElementById("totalChars").textContent = totalCharacters;
  }

  htmlOutput.textContent += currentString; // Update at the conclusion of the longest string - saves on performance and adds a bit of randomness to the monkeybashes.
  htmlOutput.scrollTop = htmlOutput.scrollHeight; // Auto-scrolls the output as it's added for neatness.  Will find a way to toggle this so people can scroll up if they want.
  currentString = ''; // Reset the current string

  // Avoid cpu meltage/add randomness to the monkeybashes.
  setTimeout(run, Math.max(10, Math.floor(Math.random() * 50)));
}

run();