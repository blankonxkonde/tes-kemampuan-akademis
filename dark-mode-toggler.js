// Self-invoking function to prevent polluting the global scope
(function() {
    // Wait for the DOM to be fully loaded before running the script
    document.addEventListener('DOMContentLoaded', () => {
        // --- Core Functions ---

        // Function to apply the correct theme based on localStorage
        function applyTheme() {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            // Update the toggler icon after applying the theme
            if (toggler) {
                toggler.textContent = isDarkMode ? '☀️' : '🌙';
            }
        }

        // --- Script Initialization ---

        // 1. Inject the dark-mode.css file into the document's head
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'dark-mode.css'; // Assumes the CSS file is in the same directory
        document.head.appendChild(link);

        // 2. Create the toggle button element
        const toggler = document.createElement('button');
        toggler.id = 'darkModeToggler';
        toggler.setAttribute('aria-label', 'Toggle dark mode');
        toggler.setAttribute('title', 'Toggle dark mode');
        
        // 3. Add a click event listener to the button
        toggler.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            // Update the button's icon immediately on click
            toggler.textContent = isDarkMode ? '☀️' : '🌙';
        });

        // 4. Append the button to the page's body
        document.body.appendChild(toggler);

        // 5. Apply the correct theme as soon as the script runs
        applyTheme();
    });
})();
