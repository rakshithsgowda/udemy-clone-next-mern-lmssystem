import axios from 'axios'
import { useReducer, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'
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

  // router
  const router = useRouter()

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    })
  }, [])

  axios.interceptors.response.use(
    function (response) {
      // any status code tyhat lie within the range of 2xx cause this function to trigger
      return response
    },
    function (error) {
      // any status code that falls outside the range of 2xx cause this fucntion to trigger
      let res = error.response
      if (res.status === 401 && res.config && !res.config.__isRetryrequest) {
        return new Promise((resolve, reject) => {
          axios
            .get('/api/logout')
            .then((data) => {
              console.log('/401 erro > logout')
              dispatch({ type: 'LOGOUT' })
              window.localStorage.removeItem('user')
              router.push('/login')
            })
            .catch((err) => {
              console.log('AXIOS INTERCEPTORS ERR', err)
              reject(error)
            })
        })
      }
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token')
      // console.log('CSRF', data)
      axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken
    }
    getCsrfToken()
  }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export { Context, Provider }
