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
            if (el.id === 'darkModeToggler') return;

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
            background-color: #fff;
            color: #1a1a1a;
            border: 1px solid #ccc;
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
            toggler.style.backgroundColor = '#333';
            toggler.style.color = '#fff';
            toggler.style.borderColor = '#555';
        });
        toggler.addEventListener('mouseleave', () => {
            if (!isDarkModeActive) {
                toggler.style.backgroundColor = '#fff';
                toggler.style.color = '#1a1a1a';
                toggler.style.borderColor = '#ccc';
            }
        });
        
        document.body.insertBefore(toggler, document.body.firstChild);

        // 2. Main toggle function
        function setDarkMode(isDark) {
            isDarkModeActive = isDark;
            localStorage.setItem('darkMode', isDark);
            toggler.textContent = isDark ? '☀️' : '🌙';
            
            // Update button appearance based on dark mode
            if (isDark) {
                toggler.style.backgroundColor = '#333';
                toggler.style.color = '#fff';
                toggler.style.borderColor = '#555';
            } else {
                toggler.style.backgroundColor = '#fff';
                toggler.style.color = '#1a1a1a';
                toggler.style.borderColor = '#ccc';
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
