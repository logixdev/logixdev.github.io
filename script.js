const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function applyTheme(theme) {
    if (theme === 'light-mode') {
        document.body.classList.add('light-mode');
        toggleSwitch.checked = true;
    } else {
        document.body.classList.remove('light-mode');
        toggleSwitch.checked = false;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        applyTheme('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        applyTheme('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Initial theme load
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // System is in dark mode, apply dark theme by default
    applyTheme('dark-mode');
} else {
    // System is in light mode, apply light theme by default
    applyTheme('light-mode');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only update if no explicit user preference is saved
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            applyTheme('dark-mode');
        } else {
            applyTheme('light-mode');
        }
    }
});

// Handle version display
const versionMeta = document.querySelector('meta[name="version"]');
const versionInfoSpan = document.getElementById('version-info');

if (versionMeta && versionInfoSpan) {
    const rawVersion = versionMeta.getAttribute('content');
    // Generate a longer string to hash by combining with a fixed prefix
    const stringToHash = `logixdev-version-${rawVersion}`;
    // Simple non-cryptographic hash for display
    const shortHash = btoa(stringToHash).substring(0, 10).replace(/=/g, ''); // Base64 encode and take first 10 chars, remove padding
    versionInfoSpan.textContent = shortHash;
}