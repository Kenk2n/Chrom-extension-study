import React, {useState, useEffect} from 'react';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
    const [loginInfo, setLoginInfo] = useState({ name: '', email: '' });
    const logo = "https://d32rooxyos7z7x.cloudfront.net/asset/hyper_full_logo.png"

    useEffect(() => {
        const messageListener = (message, sender, sendResponse) => {
            if (message.type === 'auth-store') {
                const authStoreData = JSON.parse(message.data);
                // setLoginInfo({
                //     name: authStoreData.state.memberInfo.name,
                //     email: authStoreData.state.memberInfo.email
                // });

                // Store the received data in Chrome extension's storage
                chrome.storage.local.set({ 'auth-store': {
                        name: authStoreData.state.memberInfo.name,
                        email: authStoreData.state.memberInfo.email
                    } }, () => {
                    console.log('auth-store data saved in extension storage');
                });
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);

        // Cleanup
        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, []);

    useEffect(() => {
        // Retrieve 'auth-store' info from the Chrome extension's local storage
        chrome.storage.local.get(['auth-store'], (result) => {
            if (result['auth-store'] && result['auth-store'].state && result['auth-store'].state.memberInfo) {
                setLoginInfo({
                    name: result['auth-store'].state.memberInfo.name,
                    email: result['auth-store'].state.memberInfo.email
                });
                console.log('auth-store data retrieved from extension storage');
            }
        });

        // ... message listener setup if needed ...
    }, []);

    const theme = useStorage(exampleThemeStorage);
    const handleLogin = () => {
        chrome.tabs.create({ url: 'https://app.hypersales.ai/login' });
    };

  return (
    <div className="App">
      <header className="App-header" >
          <div style={{width:200, margin:"auto"}} className="text-red-500">
        <img src={logo} className="App-logo" alt="logo" /></div>

      </header>
        <button onClick={handleLogin}>Login to HyperSales</button>
        <div>
            Name: {loginInfo.name}
            Email: {loginInfo.email}
        </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
