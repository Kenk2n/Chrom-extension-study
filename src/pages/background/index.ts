import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');


chrome.cookies.onChanged.addListener((changeInfo) => {
    if (
        changeInfo.cookie.domain === ".hypersales.ai" &&
        changeInfo.cookie.value &&
        !changeInfo.removed
    ) {
        console.log('Logged in to HyperSales');
        // Optionally, send a message to your Popup or Content Script
        chrome.runtime.sendMessage({ message: 'loggedIn' });
    }
});

chrome.cookies.onChanged.addListener((changeInfo) => {
    if (changeInfo.cookie.domain.includes('hypersales.ai') && !changeInfo.cookie.value) {
        if (changeInfo.removed) {
            // The refresh_token was removed, clear the auth-store data from extension storage
            chrome.storage.local.remove('auth-store', () => {
                console.log('auth-store data cleared from extension storage');
            });
        }
    }
});

reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');
