# react-hot-toast-stylex
### A fork from [timolins/react-hot-toast](https://github.com/timolins/react-hot-toast) with [facebook/stylex](https://github.com/facebook/stylex) instead of goober

## Features

- 🔥 **Hot by default**
- 🔩 **Easily Customizable**
- ⏳ **Promise API** - _Automatic loader from a promise_
- 🕊 **Lightweight** - _less than 5kb including styles_
- ✅ **Accessible**
- 🤯 **Headless Hooks** - _Create your own with [`useToaster()`](https://react-hot-toast.com/docs/use-toaster)_


## Installation

#### With pnpm

```sh
pnpm add react-hot-toast-stylex
```

#### With NPM

```sh
npm install react-hot-toast-stylex
```

## Getting Started

Add the Toaster to your app first. It will take care of rendering all notifications emitted. Now you can trigger `toast()` from anywhere!

```jsx
import toast, { Toaster } from 'react-hot-toast-stylex';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```

## Original Documentation

Find the full API reference on [official documentation](https://react-hot-toast.com/docs).
