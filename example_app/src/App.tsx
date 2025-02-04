import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import toast, { Toaster } from 'react-hot-toast-stylex';
import * as stylex from '@stylexjs/stylex';
import './App.css';
import "./stylex.css";

const handleClick = () => {
  const promise = new Promise((res, rej) => {
    if (Math.random() < 0.85) {
      setTimeout(res, 1500);
    } else {
      setTimeout(rej, 3000);
    }
  });
  
  toast.promise(
    promise,
    {
      loading: 'Preparing toast',
      error: 'Whoops, it burnt',
      success: "Here's your toast",
    }
  );
};

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React-Hot-Toast-StyleX</h1>
      <div className="card">
        <button onClick={() => handleClick()}>
          Make me a toast
        </button>
      </div>
      <Toaster 
        position='bottom-left'
        toastOptions={{duration: 2000000, style: toasterStyles.toast}}
      />
    </>
  )
}

const toasterStyles = stylex.create({
  toast: {
    width: '200px',
    backgroundColor: '#ab4bfe',
    color: '#fffff',
    fontWeight: 600
  }
});

export default App
