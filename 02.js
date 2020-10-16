// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect, useState } from "react";

function useLocalStorageState(
  key,
  defaultValue = "",
  { serialise = JSON.stringify, deserialise = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialise(valueInLocalStorage);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key); // won't trigger a re-render

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialise(state));
  }, [key, serialise, state]);

  return [state, setState];
}

function Greeting({ initialName = "" }) {
  const [name, setName] = useLocalStorageState("name", initialName);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting initialName="Mitch" />;
}

export default App;

// lazy initialisation - will only run on first render

// Exercise

// function Greeting({initialName = ''}) {
//   const [name, setName] = useState(
//     // Extra 1 lazy initialisation - will only run on first render
//     () => window.localStorage.getItem('name') || initialName,
//   )

//   useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name]) // Extra 2 dependency array - uses Object.is

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// Extra 3
// a custom hook is a hook built using other hooks

// function useLocalStorageState(key, defaultValue) {
//   const [state, setState] = useState(
//     () => window.localStorage.getItem(key) || defaultValue,
//   )

//   useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])

//   return [state, setState]
// }

// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorageState('name', initialName)

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }
