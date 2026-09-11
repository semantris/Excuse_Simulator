// ==========================================
// Excuse Simulator — intro.js
// Adds a little randomness so the floating
// bubbles never drift the exact same way twice.
// ==========================================

function randomizeBubbles() {
  const bubbles = document.querySelectorAll(".bubble");

  bubbles.forEach(bubble => {
    const duration = 11 + Math.random() * 6; // 11s - 17s
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.left = `${Math.random() * 80 + 5}%`;
  });
}

document.addEventListener("DOMContentLoaded", randomizeBubbles);