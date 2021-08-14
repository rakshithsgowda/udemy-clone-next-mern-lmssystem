import { useReducer, createContext,useEffect } from 'react'

// inital state
const intialState = {
  user: null,
}

// create CONTEXT
const Context = createContext()

// root reducer function
const rootReducer = (state, actions) => {
  switch (actions.type) {
    case 'LOGIN':
      return {
        ...state,
        user: actions.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

// context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState)

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload:JSON.parse(window.localStorage.getItem('user'))
    })
  },[])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export { Context, Provider }
