document.addEventListener('DOMContentLoaded', () => {
    const textAreaEl = document.getElementById("text-area");
    const totalEl = document.getElementById("Total-Characters");
    const remainingEl = document.getElementById("Remaining-container");
    const maxLength = parseInt(textAreaEl.getAttribute("maxlength"));

    // Initialize counters
    updateCounter();

    // Add event listeners for various input methods
    textAreaEl.addEventListener("input", updateCounter);
    textAreaEl.addEventListener("paste", updateCounter);
    textAreaEl.addEventListener("cut", updateCounter);

    function updateCounter() {
        const currentLength = textAreaEl.value.length;
        const remaining = maxLength - currentLength;

        // Update total characters
        totalEl.textContent = currentLength;

        // Update remaining characters with color coding
        remainingEl.textContent = remaining;
        
        // Add visual feedback based on remaining characters
        if (remaining < maxLength * 0.1) { // Less than 10% remaining
            remainingEl.style.color = "var(--danger-color)";
        } else if (remaining < maxLength * 0.3) { // Less than 30% remaining
            remainingEl.style.color = "var(--warning-color)";
        } else {
            remainingEl.style.color = "var(--primary-color)";
        }

        // Add animation class for visual feedback
        totalEl.classList.add('pulse');
        remainingEl.classList.add('pulse');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            totalEl.classList.remove('pulse');
            remainingEl.classList.remove('pulse');
        }, 300);
    }

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        .pulse {
            animation: pulse 0.3s ease-in-out;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});