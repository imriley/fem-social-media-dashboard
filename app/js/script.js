const darkBtn = document.getElementById('dark');
const lightBtn = document.getElementById('light');
const radioButtons = document.querySelectorAll('.toggle__wrapper input');

/*
When the radio buttons are clicked, it checks which
radio button is checked and changes the color mode accordingly
*/
radioButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('button clicked');
        darkBtn.checked ? setDarkMode() : setLightMode();
    });
});

const setDarkMode = () => {
    document.querySelector('body').classList = 'dark';
    localStorage.setItem('colorMode', 'dark');
};

const setLightMode = () => {
    document.querySelector('body').classList = 'light';
    localStorage.setItem('colorMode', 'light');
};

const colorModeFromLocalStorage = () => {
    return localStorage.getItem('colorMode');
};

const colorModeFromPreferences = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' // light is default if preference does not match anything
};

/*
Loads the color mode from local storage, if the page is loaded for the first time
the color mode set on the preference is used and color mode in the local storage
is set as 'default'
*/
const loadAndUpdateColor = () => {
    // local storage has precedence over the prefers-color-scheme
    const color = colorModeFromLocalStorage() || colorModeFromPreferences();
    color == 'dark' ? darkBtn.click() : lightBtn.click();
};

/*
This event is emitted when the prefers-color-scheme is changed
It also reflects the media query, if it matches, then the new color is dark else it is light
*/
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    event.matches ? darkBtn.click() : lightBtn.click();
});

// Loads the color mode on startup
loadAndUpdateColor();