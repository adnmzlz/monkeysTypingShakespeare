import { pericles } from "./pericles.js";

let isRunning = true;

// Modal stuff
const modal = document.getElementById("about-modal");
const aboutBtn = document.getElementById("aboutBtn");
const span = document.getElementsByClassName("close")[0];

// Live view of the monkeys
const htmlOutput = document.getElementById("output"); 

// For findHighlightIframe() function
const iFrame = document.getElementById("iFrame");
const iframeDoc = iFrame.contentDocument || iFrame.contentWindow.document;
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

// About button - opens the modal
aboutBtn.onclick = function() {
  modal.showModal();
}
// About modal - close button
span.onclick = function() {
  modal.close();
}
// Close modal when clicking outside it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.close();
  }
}

// Function to return uptime for us to display.
function getReadableUptime() {
  const totalSeconds = performance.now() / 1000;
  // const nodeTotalSeconds = process.uptime(); << for server
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let dys = "";
  if (days > 1) {
    dys = days + " days, ";
  } else if (days === 1) {
    dys = days + " day, ";
  }
  
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
  
  return `${dys}${hrs}:${mins}:${secs}`;
}

// Function to find and highlight the longestOutput
function findHighlightIframe(longestOutput) {    
  const body = iframeDoc.body;

  // Original iframe text to reset highlights
  if (!ogIframeContent ) {
    ogIframeContent = body.innerHTML;
  }
  body.innerHTML = ogIframeContent;

  // ESCAPE special regex characters so they don't break the script
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
  const firstMatchElement = iframeDoc.getElementById('first-match');
  if (firstMatchElement) {
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

      let longestLength = output.length;
      document.getElementById("longestLength").textContent = longestOutput.length;

      findHighlightIframe(longestOutput);
    }

    currentString += characters[Math.floor(Math.random() * 74)];
    totalCharacters++;
    document.getElementById("totalChars").textContent = totalCharacters;
  }

  // Highlight added text if it matches the longestOutput, otherwise add the text unstyled
  if (currentString.includes(longestOutput)) {
    const highlighted = document.createElement('mark');
    highlighted.textContent = longestOutput;
    htmlOutput.appendChild(highlighted);

    const lastChar = document.createTextNode(currentString.at(-1));
    htmlOutput.appendChild(lastChar);
  } else {
    htmlOutput.appendChild(document.createTextNode(currentString)); 
  }
  
  // Auto-scrolls the output as it's added
  htmlOutput.scrollTop = htmlOutput.scrollHeight; 
  currentString = ''; // Reset currentString

  // Avoid cpu meltage/add randomness to the monkeybashes.
  setTimeout(run, Math.max(10, Math.floor(Math.random() * 50)));
}

// Make sure iframe has loaded before running
if (iframeDoc.readyState === 'complete') {
  run();
} else {
  iFrame.addEventListener('load', run);
}