// Self-invoking function to prevent polluting the global scope
(function() {
    // --- Color Analysis and Conversion Utilities ---

    /**
     * Parses a color string (hex, rgb, rgba) and returns an {r, g, b} object.
     * @param {string} colorStr The color string.
     * @returns {{r: number, g: number, b: number}|null}
     */
    function parseColor(colorStr) {
        if (!colorStr) return null;
        if (colorStr.startsWith('#')) {
            const hex = colorStr.substring(1);
            const bigint = parseInt(hex, 16);
            return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
        }
        if (colorStr.startsWith('rgb')) {
            const parts = colorStr.match(/(\d+(\.\d+)?)/g);
            if (parts && parts.length >= 3) {
                return { r: parseInt(parts[0]), g: parseInt(parts[1]), b: parseInt(parts[2]) };
            }
        }
        return null; // Unsupported format
    }

    /**
     * Calculates the relative luminance of a color.
     * @param {{r: number, g: number, b: number}} color The RGB color object.
     * @returns {number} Luminance value between 0 and 1.
     */
    function getLuminance(color) {
        if (!color) return 0;
        const a = [color.r, color.g, color.b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    // --- Core Dark Mode Logic ---

    const LUMINANCE_THRESHOLD = 0.5; // Threshold to decide if a color is "light"
    const DARK_PALETTE = {
        bg: '#1a1a1a',
        bgSecondary: '#2a2a2a',
        text: '#e0e0e0',
        textSecondary: '#b0b0b0',
        border: '#444'
    };
    const ORIGINAL_STYLES_ATTR = 'data-original-inline-style';
    const DARK_MODE_APPLIED_ATTR = 'data-dark-mode-applied';
    const COUNTDOWN_IDS = {
        wrapper: 'darkModeCountdown',
        display: 'darkModeCountdownDisplay',
        startButton: 'darkModeCountdownStart',
        resetButton: 'darkModeCountdownReset',
        minutesInput: 'darkModeCountdownMinutes',
        secondsInput: 'darkModeCountdownSeconds',
        minimizeButton: 'darkModeCountdownMinimize',
        header: 'darkModeCountdownHeader'
    };
    const COUNTDOWN_CLASSES = {
        blink: 'countdown-blink',
        invalid: 'countdown-invalid',
        minimized: 'countdown-minimized'
    };
    const COUNTDOWN_STYLE_ID = 'darkModeCountdownStyles';
    const countdownState = {
        elements: null,
        intervalId: null,
        overtimeIntervalId: null,
        remainingMs: 0,
        isRunning: false,
        overtimeStart: null,
        isMinimized: false
    };

    let mutationObserver = null;
    let observerScheduled = false;
    let isDarkModeActive = false;

    function runOnNextFrame(callback) {
        const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        if (raf) {
            raf(callback);
        } else {
            setTimeout(callback, 16);
        }
    }

    function scheduleDarkModeRefresh() {
        if (!isDarkModeActive || observerScheduled) return;
        observerScheduled = true;
        runOnNextFrame(() => {
            observerScheduled = false;
            applyDynamicDarkMode(true);
        });
    }

    function startMutationObserver() {
        if (mutationObserver || !document.body) return;
        mutationObserver = new MutationObserver(() => scheduleDarkModeRefresh());
        mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    function stopMutationObserver() {
        if (!mutationObserver) return;
        mutationObserver.disconnect();
        mutationObserver = null;
        observerScheduled = false;
    }

    /**
     * Applies or removes the dynamic dark mode styles.
     * @param {boolean} enable - True to enable dark mode, false to disable.
     */
    function applyDynamicDarkMode(enable) {
        const elements = document.querySelectorAll('body, body *');

        elements.forEach(el => {
            if (el.id === 'darkModeToggler' || el.id === COUNTDOWN_IDS.wrapper) return;

            if (enable) {
                const style = window.getComputedStyle(el);
                const bgColor = parseColor(style.backgroundColor);
                const textColor = parseColor(style.color);
                const borderColor = parseColor(style.borderColor);

                const bgLuminance = getLuminance(bgColor);

                if (bgLuminance > LUMINANCE_THRESHOLD) {
                    // Store original inline style if not already stored
                    if (!el.hasAttribute(ORIGINAL_STYLES_ATTR)) {
                        el.setAttribute(ORIGINAL_STYLES_ATTR, el.getAttribute('style') || '');
                    }
                    
                    el.style.setProperty('background-color', DARK_PALETTE.bgSecondary, 'important');
                    el.style.setProperty('color', DARK_PALETTE.text, 'important');

                    if (getLuminance(borderColor) > LUMINANCE_THRESHOLD) {
                       el.style.setProperty('border-color', DARK_PALETTE.border, 'important');
                    }
                    el.setAttribute(DARK_MODE_APPLIED_ATTR, 'true');
                }
            } else {
                // Revert styles only if we modified them
                if (el.hasAttribute(DARK_MODE_APPLIED_ATTR)) {
                    const originalStyle = el.getAttribute(ORIGINAL_STYLES_ATTR);
                    el.setAttribute('style', originalStyle);
                    el.removeAttribute(ORIGINAL_STYLES_ATTR);
                    el.removeAttribute(DARK_MODE_APPLIED_ATTR);
                }
            }
        });
        
        // Handle the root body and html elements
        if (enable) {
            document.documentElement.style.setProperty('background-color', DARK_PALETTE.bg, 'important');
            document.body.style.setProperty('background-color', DARK_PALETTE.bg, 'important');
            document.body.style.setProperty('color', DARK_PALETTE.text, 'important');
        } else {
            document.documentElement.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        }
    }

    // --- Countdown Widget Helpers ---
    function ensureCountdownStyles() {
        if (document.getElementById(COUNTDOWN_STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = COUNTDOWN_STYLE_ID;
        style.textContent = `
            #${COUNTDOWN_IDS.wrapper} {
                position: fixed;
                bottom: 20px;
                right: 90px;
                z-index: 10000;
                background-color: #1f1f1f;
                color: #f5f5f5;
                border: 1px solid #3d3d3d;
                border-radius: 12px;
                padding: 12px;
                width: 210px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                font-family: inherit;
                box-shadow: 0 2px 8px rgba(0,0,0,0.35);
                transition: border-color 0.3s ease, box-shadow 0.3s ease;
            }
            #${COUNTDOWN_IDS.wrapper}.countdown-blink #${COUNTDOWN_IDS.display} {
                animation: countdownBlink 1s steps(2, start) infinite;
            }
            #${COUNTDOWN_IDS.wrapper}.countdown-invalid {
                border-color: #ff4d4f;
                box-shadow: 0 0 0 2px rgba(255,77,79,0.4);
            }
            #${COUNTDOWN_IDS.wrapper}.countdown-minimized {
                width: 120px;
                padding: 8px;
                gap: 4px;
            }
            #${COUNTDOWN_IDS.wrapper}.countdown-minimized .countdown-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0;
            }
            #${COUNTDOWN_IDS.wrapper}.countdown-minimized .countdown-title {
                font-size: 0.7rem;
                margin: 0;
            }
            #${COUNTDOWN_IDS.wrapper}.countdown-minimized #${COUNTDOWN_IDS.display} {
                font-size: 1.2rem;
                margin-top: 2px;
            }
            #${COUNTDOWN_IDS.wrapper}.countdown-minimized .countdown-inputs,
            #${COUNTDOWN_IDS.wrapper}.countdown-minimized .countdown-controls,
            #${COUNTDOWN_IDS.wrapper}.countdown-minimized .countdown-overtime {
                display: none !important;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-header .countdown-title {
                flex: 1;
            }
            #${COUNTDOWN_IDS.wrapper} #${COUNTDOWN_IDS.minimizeButton} {
                background: none;
                border: none;
                color: #f5f5f5;
                cursor: pointer;
                padding: 4px 6px;
                font-size: 0.9rem;
                line-height: 1;
                border-radius: 4px;
                transition: background-color 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 24px;
                min-height: 24px;
            }
            #${COUNTDOWN_IDS.wrapper} #${COUNTDOWN_IDS.minimizeButton}:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            #${COUNTDOWN_IDS.display} {
                font-size: 1.6rem;
                font-weight: 600;
                text-align: center;
                letter-spacing: 1px;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-title {
                font-weight: 600;
                font-size: 0.9rem;
                text-align: center;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-overtime {
                font-size: 0.8rem;
                text-align: center;
                color: #d0d0d0;
                min-height: 16px;
                visibility: hidden;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-inputs,
            #${COUNTDOWN_IDS.wrapper} .countdown-controls {
                display: flex;
                gap: 8px;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-inputs input {
                flex: 1;
                padding: 6px 8px;
                font-size: 0.85rem;
                border: 1px solid #3d3d3d;
                border-radius: 8px;
                outline: none;
                background-color: #2b2b2b;
                color: #f5f5f5;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-inputs input:focus {
                border-color: #777;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-controls button {
                flex: 1;
                padding: 7px 8px;
                font-size: 0.85rem;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                transition: background-color 0.2s ease, color 0.2s ease;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-controls button.primary {
                background-color: #f2b705;
                color: #1a1a1a;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-controls button.secondary {
                background-color: #2b2b2b;
                color: #f5f5f5;
                border: 1px solid #3d3d3d;
            }
            #${COUNTDOWN_IDS.wrapper} .countdown-controls button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
            @keyframes countdownBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            @media (max-width: 640px) {
                #${COUNTDOWN_IDS.wrapper} {
                    right: 20px;
                    bottom: 80px;
                    width: calc(100% - 40px);
                    max-width: 320px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createCountdownElements() {
        const wrapper = document.createElement('div');
        wrapper.id = COUNTDOWN_IDS.wrapper;
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', 'Timer hitung mundur');

        const header = document.createElement('div');
        header.id = COUNTDOWN_IDS.header;
        header.className = 'countdown-header';

        const title = document.createElement('div');
        title.textContent = 'Hitung Mundur';
        title.className = 'countdown-title';

        const minimizeButton = document.createElement('button');
        minimizeButton.type = 'button';
        minimizeButton.id = COUNTDOWN_IDS.minimizeButton;
        minimizeButton.setAttribute('aria-label', 'Minimize timer');
        minimizeButton.setAttribute('title', 'Minimize timer');
        minimizeButton.textContent = '−';

        header.appendChild(title);
        header.appendChild(minimizeButton);

        const display = document.createElement('div');
        display.id = COUNTDOWN_IDS.display;
        display.textContent = '00:00';

        const overtimeDisplay = document.createElement('div');
        overtimeDisplay.className = 'countdown-overtime';
        overtimeDisplay.textContent = '+00:00';

        const inputsRow = document.createElement('div');
        inputsRow.className = 'countdown-inputs';

        const minutesInput = document.createElement('input');
        minutesInput.type = 'number';
        minutesInput.id = COUNTDOWN_IDS.minutesInput;
        minutesInput.placeholder = 'Menit';
        minutesInput.min = '0';
        minutesInput.max = '999';

        const secondsInput = document.createElement('input');
        secondsInput.type = 'number';
        secondsInput.id = COUNTDOWN_IDS.secondsInput;
        secondsInput.placeholder = 'Detik';
        secondsInput.min = '0';
        secondsInput.max = '59';

        inputsRow.appendChild(minutesInput);
        inputsRow.appendChild(secondsInput);

        const controlsRow = document.createElement('div');
        controlsRow.className = 'countdown-controls';

        const startButton = document.createElement('button');
        startButton.type = 'button';
        startButton.id = COUNTDOWN_IDS.startButton;
        startButton.className = 'primary';
        startButton.textContent = 'Mulai';

        const resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.id = COUNTDOWN_IDS.resetButton;
        resetButton.className = 'secondary';
        resetButton.textContent = 'Reset';

        controlsRow.appendChild(startButton);
        controlsRow.appendChild(resetButton);

        wrapper.appendChild(header);
        wrapper.appendChild(display);
        wrapper.appendChild(overtimeDisplay);
        wrapper.appendChild(inputsRow);
        wrapper.appendChild(controlsRow);

        return {
            wrapper,
            header,
            display,
            overtimeDisplay,
            minutesInput,
            secondsInput,
            startButton,
            resetButton,
            minimizeButton
        };
    }

    function clampInputValue(input, min, max) {
        if (!input) return;
        if (input.value === '') return;
        const numeric = parseInt(input.value, 10);
        if (Number.isNaN(numeric)) {
            input.value = '';
            return;
        }
        const clamped = Math.min(max, Math.max(min, numeric));
        if (clamped !== numeric) {
            input.value = clamped;
        }
    }

    function formatCountdown(ms) {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');
        return `${paddedMinutes}:${paddedSeconds}`;
    }

    function updateCountdownDisplay(ms) {
        if (!countdownState.elements) return;
        countdownState.elements.display.textContent = formatCountdown(ms);
    }

    function updateOvertimeDisplay(ms) {
        if (!countdownState.elements) return;
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        countdownState.elements.overtimeDisplay.textContent = `+${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function getInputDurationMs() {
        if (!countdownState.elements) return 0;
        const minutes = parseInt(countdownState.elements.minutesInput.value, 10);
        const seconds = parseInt(countdownState.elements.secondsInput.value, 10);
        const safeMinutes = Number.isNaN(minutes) ? 0 : Math.max(0, minutes);
        const safeSeconds = Number.isNaN(seconds) ? 0 : Math.max(0, Math.min(59, seconds));
        return (safeMinutes * 60 + safeSeconds) * 1000;
    }

    function setStartButtonLabel(label) {
        if (!countdownState.elements) return;
        countdownState.elements.startButton.textContent = label;
    }

    function showCountdownInputError() {
        if (!countdownState.elements) return;
        const { wrapper } = countdownState.elements;
        wrapper.classList.add(COUNTDOWN_CLASSES.invalid);
        setTimeout(() => {
            wrapper.classList.remove(COUNTDOWN_CLASSES.invalid);
        }, 600);
    }

    function stopCountdownInterval() {
        if (countdownState.intervalId) {
            clearInterval(countdownState.intervalId);
            countdownState.intervalId = null;
        }
    }

    function startCountdown() {
        if (!countdownState.elements || countdownState.remainingMs <= 0) return;

        stopCountdownBlink();
        stopCountdownInterval();
        stopOvertimeTicker();

        countdownState.isRunning = true;
        setStartButtonLabel('Jeda');

        const endTime = Date.now() + countdownState.remainingMs;
        countdownState.intervalId = window.setInterval(() => {
            countdownState.remainingMs = Math.max(0, endTime - Date.now());
            updateCountdownDisplay(countdownState.remainingMs);

            if (countdownState.remainingMs <= 0) {
                completeCountdown();
            }
        }, 200);
    }

    function pauseCountdown() {
        if (!countdownState.isRunning) return;
        stopCountdownInterval();
        countdownState.isRunning = false;
        setStartButtonLabel('Lanjut');
    }

    function resetCountdown() {
        stopCountdownInterval();
        stopOvertimeTicker();
        countdownState.isRunning = false;
        countdownState.remainingMs = 0;
        stopCountdownBlink();
        setStartButtonLabel('Mulai');
        updateCountdownDisplay(0);
    }

    function completeCountdown() {
        stopCountdownInterval();
        countdownState.isRunning = false;
        countdownState.remainingMs = 0;
        setStartButtonLabel('Mulai');
        updateCountdownDisplay(0);
        startCountdownBlink();
        startOvertimeTicker();
    }

    function startCountdownBlink() {
        if (!countdownState.elements) return;
        countdownState.elements.wrapper.classList.add(COUNTDOWN_CLASSES.blink);
    }

    function stopCountdownBlink() {
        if (!countdownState.elements) return;
        countdownState.elements.wrapper.classList.remove(COUNTDOWN_CLASSES.blink);
    }

    function handleCountdownToggle() {
        if (!countdownState.elements) return;

        if (countdownState.isRunning) {
            pauseCountdown();
            return;
        }

        if (countdownState.remainingMs <= 0) {
            const duration = getInputDurationMs();
            if (duration <= 0) {
                showCountdownInputError();
                return;
            }
            countdownState.remainingMs = duration;
            updateCountdownDisplay(duration);
        }

        startCountdown();
    }

    function handleCountdownReset() {
        resetCountdown();
    }

    function toggleMinimizeCountdown() {
        if (!countdownState.elements) return;
        countdownState.isMinimized = !countdownState.isMinimized;
        const { wrapper, minimizeButton } = countdownState.elements;
        
        if (countdownState.isMinimized) {
            wrapper.classList.add(COUNTDOWN_CLASSES.minimized);
            minimizeButton.textContent = '+';
            minimizeButton.setAttribute('aria-label', 'Maximize timer');
            minimizeButton.setAttribute('title', 'Maximize timer');
        } else {
            wrapper.classList.remove(COUNTDOWN_CLASSES.minimized);
            minimizeButton.textContent = '−';
            minimizeButton.setAttribute('aria-label', 'Minimize timer');
            minimizeButton.setAttribute('title', 'Minimize timer');
        }
    }

    function handleCountdownMinimize() {
        toggleMinimizeCountdown();
    }

    function startOvertimeTicker() {
        if (!countdownState.elements) return;
        stopOvertimeTicker();
        countdownState.overtimeStart = Date.now();
        countdownState.elements.overtimeDisplay.style.visibility = 'visible';
        updateOvertimeDisplay(0);
        countdownState.overtimeIntervalId = window.setInterval(() => {
            const elapsed = Date.now() - countdownState.overtimeStart;
            updateOvertimeDisplay(elapsed);
        }, 200);
    }

    function stopOvertimeTicker() {
        if (!countdownState.elements) return;
        countdownState.elements.overtimeDisplay.style.visibility = 'hidden';
        if (countdownState.overtimeIntervalId) {
            clearInterval(countdownState.overtimeIntervalId);
            countdownState.overtimeIntervalId = null;
        }
    }

    function initCountdownWidget() {
        if (!document.body) return null;
        if (countdownState.elements) return countdownState.elements.wrapper;

        ensureCountdownStyles();
        const elements = createCountdownElements();
        countdownState.elements = elements;

        elements.startButton.addEventListener('click', handleCountdownToggle);
        elements.resetButton.addEventListener('click', handleCountdownReset);
        elements.minimizeButton.addEventListener('click', handleCountdownMinimize);
        elements.minutesInput.addEventListener('input', () => clampInputValue(elements.minutesInput, 0, 999));
        elements.secondsInput.addEventListener('input', () => clampInputValue(elements.secondsInput, 0, 59));

        updateCountdownDisplay(0);
        return elements.wrapper;
    }

    // --- Script Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Create and inject the toggle button
        const toggler = document.createElement('button');
        toggler.id = 'darkModeToggler';
        toggler.setAttribute('aria-label', 'Toggle dark mode');
        toggler.setAttribute('title', 'Toggle dark mode');
        
        // Add inline styles for the toggle button
        toggler.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            padding: 10px;
            background-color: #2b2b2b;
            color: #f5f5f5;
            border: 1px solid #555;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            line-height: 1;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            transition: background-color 0.3s ease, color 0.3s ease;
        `;
        
        // Add hover effect
        toggler.addEventListener('mouseenter', () => {
            toggler.style.backgroundColor = '#3b3b3b';
            toggler.style.color = '#fefefe';
            toggler.style.borderColor = '#666';
        });
        toggler.addEventListener('mouseleave', () => {
            if (!isDarkModeActive) {
                toggler.style.backgroundColor = '#2b2b2b';
                toggler.style.color = '#f5f5f5';
                toggler.style.borderColor = '#555';
            }
        });
        
        document.body.insertBefore(toggler, document.body.firstChild);

        const countdownWidget = initCountdownWidget();
        if (countdownWidget) {
            document.body.insertBefore(countdownWidget, toggler.nextSibling);
        }

        // 2. Main toggle function
        function setDarkMode(isDark) {
            isDarkModeActive = isDark;
            localStorage.setItem('darkMode', isDark);
            toggler.textContent = isDark ? '☀️' : '🌙';
            
            // Update button appearance based on dark mode
            if (isDark) {
                toggler.style.backgroundColor = '#f2b705';
                toggler.style.color = '#1a1a1a';
                toggler.style.borderColor = '#f2b705';
            } else {
                toggler.style.backgroundColor = '#2b2b2b';
                toggler.style.color = '#f5f5f5';
                toggler.style.borderColor = '#555';
            }
            
            applyDynamicDarkMode(isDark);
            if (isDark) {
                startMutationObserver();
            } else {
                stopMutationObserver();
            }
        }

        // 3. Add click event listener
        toggler.addEventListener('click', () => {
            const isDarkMode = localStorage.getItem('darkMode') !== 'true';
            setDarkMode(isDarkMode);
        });

        // 4. Apply theme on initial load
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('darkMode');
        
        if (savedTheme === 'true' || (savedTheme === null && prefersDark)) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }

        window.addEventListener('pageshow', (event) => {
            if (!event.persisted) return;
            if (localStorage.getItem('darkMode') === 'true') {
                setDarkMode(true);
            }
        });
    });
})();
