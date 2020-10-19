// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// Extra 6,7 & 8

import React from "react";
import ErrorBoundary from "react-error-boundary";
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from "../pokemon";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      There was an error:
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again </button>
    </div>
  );
}

function PokemonInfo({ pokemonName }) {
  const [{ status, pokemon, error }, setState] = React.useState({
    status: pokemonName ? "pending" : "idle",
    pokemon: null,
    error: null,
  });

  React.useEffect(() => {
    if (!pokemonName) return;
    setState({ status: "pending" });
    fetchPokemon(pokemonName).then(
      (pokemon) => setState({ pokemon, status: "resolved" }),
      (error) => setState({ error, status: "rejected" })
    );
  }, [pokemonName]);

  if (status === "idle") {
    return "Submit a pokemon";
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === "resolved") {
    return <PokemonDataView pokemon={pokemon} />;
  } else if (status === "rejected") {
    throw error;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallBackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={pokemonName}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;

// Extra 4 & 5: writing own Error Boundary

// class ErrorBoundary extends React.Component {
//   state = {error: null}

//   static getDerivedStateFromError(error) {
//     return {error}
//   }

//   // componentDidCatch(error, errorInfo) {
//   //   // You can also log the error to an error reporting service
//   //   logErrorToMyService(error, errorInfo);
//   // }

//   render() {
//     const {error} = this.state
//     console.log('Error Boundary', this.state.error)

//     if (error) {
//       return <this.props.FallBackComponent error={error} />
//     }

//     return this.props.children
//   }
// }

// function ErrorFallback({error}) {
//   return (
//     <div role="alert">
//       There was an error:
//       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//     </div>
//   )
// }

// function PokemonInfo({pokemonName}) {
//   const [{status, pokemon, error}, setState] = React.useState({
//     status: 'idle',
//     pokemon: null,
//     error: null,
//   })

//   React.useEffect(() => {
//     if (!pokemonName) return
//     setState({status: 'pending'})
//     fetchPokemon(pokemonName).then(
//       pokemon => setState({pokemon, status: 'resolved'}),
//       error => setState({error, status: 'rejected'}),
//     )
//   }, [pokemonName])

//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   } else if (status === 'rejected') {
//     throw error
//   }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <ErrorBoundary key={pokemonName} FallBackComponent={ErrorFallback}>
//           <PokemonInfo pokemonName={pokemonName} />
//         </ErrorBoundary>
//       </div>
//     </div>
//   )
// }

// Extra 3 : state object (nb use reducer a better option for this eg)

// function PokemonInfo({pokemonName}) {
//   const [{status, pokemon, error}, state, setState] = React.useState({
//     status: 'idle',
//     pokemon: null,
//     error: null,
//   })

//   React.useEffect(() => {
//     if (!pokemonName) return
//     setState({status: 'pending'})
//     fetchPokemon(pokemonName).then(
//       pokemon => setState({pokemon, status: 'resolved'}),
//       error => setState({error, status: 'rejected'}),
//     )
//   }, [pokemonName])

//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   } else if (status === 'rejected') {
//     return (
//       <div role="alert">
//         There was an error:
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   }
// }

// Extra 2: status

// function PokemonInfo({pokemonName}) {
//   const [pokemon, setPokemon] = React.useState(null)
//   const [status, setStatus] = React.useState('idle')
//   const [error, setError] = React.useState(false)

//   React.useEffect(() => {
//     if (!pokemonName) return
//     setPokemon(null)
//     setStatus('pending')
//     fetchPokemon(pokemonName).then(
//       pokemonData => {
//         setPokemon(pokemonData)
//         setStatus('resolved')
//       },
//       error => {
//         setError(error)
//         setStatus('rejected')
//       },
//     )
//   }, [pokemonName])

//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   } else if (status === 'rejected') {
//     return (
//       <div role="alert">
//         There was an error:
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   }
// }

// Exercise and Extra 1: handle errors

// import React from 'react'
// import {
//   fetchPokemon,
//   PokemonDataView,
//   PokemonForm,
//   PokemonInfoFallback,
// } from '../pokemon'

// function PokemonInfo({pokemonName}) {
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(false)

//   React.useEffect(() => {
//     if (!pokemonName) return
//     setPokemon(null)
//     fetchPokemon(pokemonName).then(
//       pokemonData => setPokemon(pokemonData),
//       error => setError(error),
//     )
//   }, [pokemonName])

//   if (error) {
//     return (
//       <div role="alert">
//         There was an error:
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   } else if (!pokemonName) {
//     return 'Submit a pokemon'
//   } else if (!pokemon) {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else {
//     return <PokemonDataView pokemon={pokemon} />
//   }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }

// export default App
