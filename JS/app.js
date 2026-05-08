import { pericles } from "./pericles.js";

let isRunning = true;
let longestOutput = '';
let currentString = '';
let totalCharacters = 0;

const htmlOutput = document.getElementById("output");

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

function run() {
  if (!isRunning) return;

  document.getElementById("uptime").textContent = getReadableUptime();

  while (pericles.includes(currentString)) {
    if (currentString.length > longestOutput.length) {
      longestOutput = currentString;
      document.getElementById("longestText").textContent = longestOutput;

      longestLength = output.length;
      document.getElementById("longestLength").textContent = longestOutput.length;
    }
    currentString += characters[Math.floor(Math.random() * 74)];
    totalCharacters++;
    document.getElementById("totalChars").textContent = totalCharacters;

  }

  htmlOutput.textContent += currentString;
  htmlOutput.scrollTop = htmlOutput.scrollHeight;
  currentString = '';

  setTimeout(run, Math.max(10, Math.floor(Math.random() * 50)));
}

run();