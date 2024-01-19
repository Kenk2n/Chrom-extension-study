import { useEffect } from 'react';

export default function App() {
  const authStore = localStorage.getItem('auth-store');
  useEffect(() => {
    if (authStore) {
      chrome.runtime.sendMessage({type: 'auth-store', data: authStore});
    }
  }, [authStore]);
  return <div className="">content view</div>;
}
