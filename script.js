// Function to convert time input to seconds
function convertToSeconds(hours, minutes, seconds) {
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to display time in HH:MM:SS format
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Function to create a new timer element
function createTimerElement(timerId, timeRemaining) {
  const timerDiv = document.createElement("div");
  timerDiv.classList.add("timer");
  timerDiv.innerHTML = `
        <div class="time-remaining">${formatTime(timeRemaining)}</div>
        <button class="stop-btn" data-timer-id="${timerId}">Delete</button>
    `;
  return timerDiv;
}

// Function to start a new timer
function startNewTimer(hours, minutes, seconds) {
  const totalSeconds = convertToSeconds(hours, minutes, seconds);
  let timeRemaining = totalSeconds;

  const timerId = setInterval(() => {
    timeRemaining--;

    // Update the timer display
    const timerElement = document.getElementById(`timer-${timerId}`);
    if (timerElement) {
      timerElement.querySelector(".time-remaining").textContent =
        formatTime(timeRemaining);
    }

    // Check if the timer has reached zero
    if (timeRemaining === 0) {
      clearInterval(timerId);
      // Handle timer end display design and audio alert here
      // You can change the class of the timer element to update its appearance
      // and play an audio alert using the Audio object
    }
  }, 1000);

  // Add the new timer to the active timers display
  const activeTimersSection = document.getElementById("active-timers");
  const newTimerElement = createTimerElement(timerId, timeRemaining);
  newTimerElement.setAttribute("id", `timer-${timerId}`);
  activeTimersSection.appendChild(newTimerElement);
}

// Event listener for the 'Start New Timer' button
document.getElementById("start-timer-btn").addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  // Validate user input before starting a new timer
  if (hours < 0 || minutes < 0 || seconds < 0) {
    alert(
      "Invalid time input. Please enter positive values for hours, minutes, and seconds."
    );
    return;
  }

  startNewTimer(hours, minutes, seconds);

  // Reset the input fields
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
});

// Event listener for the 'Stop Timer' buttons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("stop-btn")) {
    const timerId = event.target.dataset.timerId;
    clearInterval(timerId);
    const timerElement = document.getElementById(`timer-${timerId}`);
    if (timerElement) {
      timerElement.remove();
    }
  }
});
