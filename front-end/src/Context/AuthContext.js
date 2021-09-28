import React, { useContext, useState, useEffect, useReducer } from 'react'
import { auth } from '../firebase'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

const AuthContext = React.createContext()
const APIContext = React.createContext()
const ElementContext = React.createContext()

const API = apiURL()

// Custom Hooks
export function useAuth () {
  return useContext(AuthContext)
}
export function useAPI () {
  return useContext(APIContext)
}
export function useElement () {
  return useContext(ElementContext)
}


export const ACTIONS = {
  SET_CURRENT_USER: 'set-current-user',
  SET_CURRENT_USER_DATA: 'set-current-user-data',
  SET_CURRENT_SEARCH_RESULTS: 'set-current-search-results',
  SET_MAIN_ELEMENT_: 'set-main-element',
  RESET_STATE: 'reset-state'
}

function setGlobalState (globalState, action) {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_USER:
      return Object.assign(
        { ...globalState },
        { currentUser: action.payload.user }
      )
    case ACTIONS.SET_CURRENT_USER_DATA:
      return Object.assign(
        { ...globalState },
        { currentUserData: action.payload.data.data[0] }
      )
    case ACTIONS.SET_CURRENT_SEARCH_RESULTS:
      return Object.assign(
        { ...globalState },
        { currentSearchResults: action.payload.response.data }
      )
    case ACTIONS.SET_MAIN_ELEMENT:
      return Object.assign(
        { ...globalState },
        { mainElement: action.payload.mainElement }
      )
    case ACTIONS.RESET_STATE:
      return Object.assign(
        { ...globalState },
        { currentUser: null, currentUserData: {}, currentSearchResults: [] }
      )
    default:
      return globalState
  }
}

export function AuthProvider ({ children }) {
  const [loading, setLoading] = useState(true)
  const [globalState, dispatch] = useReducer(setGlobalState, {
    currentUser: null,
    currentUserData: {},
    currentSearchResults: null,
    mainElement: {}
  })

  // Login at Firebase and store user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      const getCurrentUserData = async user => {
        const data = await axios.get(`${API}/users?uuid=${user.uid}`)
        dispatch({
          type: ACTIONS.SET_CURRENT_USER_DATA,
          payload: { data: data }
        })
      }
      user && getCurrentUserData(user)
      dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: { user: user } })
      setLoading(false)
    })
    return unsubscribe
  }, [])

  //     const data = axios.get(`${API}/users?uuid=${currentUser?.uid}`)
  //     const userData = data.data[0]
  //     const result = await Promise.all([data, userData])

  // Login Functions from FIREBASE
  function signUp (email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function logIn (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logOut () {
    return auth.signOut()
  }
  function resetPassword (email) {
    return auth.sendPasswordResetEmail(email)
  }
  function updateEmail (email) {
    return globalState.currentUser.updateEmail(email)
  }
  function updatePassword (password) {
    return globalState.currentUser.updatePassword(password)
  }
  function elementSetter (mainElement) {
    dispatch({ type: ACTIONS.SET_MAIN_ELEMENT, payload: { mainElement: mainElement } })
  }
  function resetState () {
    dispatch({ type: ACTIONS.RESET_STATE })
  }


  const queryKeys = [
    'availability',
    'experience',
    'goal',
    'radius',
    'gender',
    'location'
  ]

  // API Request
  async function getResultsUsingSokaQuery (searchParams) {
  
    let query = `${API}/users?`
    let day = ''

    Object.keys(searchParams).forEach(k => {
      if (k === 'availability') {
        const shortedDay = searchParams[k].slice(0, 10).split('-')
        const month = String(Number(shortedDay[1]))
        day = [month, shortedDay[2], shortedDay[0]].join('/')
      }

      if (queryKeys.includes(k) && searchParams[k] !== '') {
        query += `${k}=${!day ? searchParams[k] : day}&`
      }
    })

    const response = await axios.get(query.slice(0, -1))
    dispatch({
      type: ACTIONS.SET_CURRENT_SEARCH_RESULTS,
      payload: { response: response }
    })
  }

  const authValue = {
    currentUser: globalState.currentUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
    resetState
  }

  const apiValue = {
    currentUser: globalState.currentUser,
    currentUserData: globalState.currentUserData,
    currentSearchResults: globalState.currentSearchResults,
    getResultsUsingSokaQuery
  }

  const elementValue = {
    elementSetter,
    mainElement: globalState.mainElement
  }

  return (
    <AuthContext.Provider value={authValue}>
      <APIContext.Provider value={apiValue}>
        <ElementContext.Provider value={elementValue}>
          {!loading && children}
        </ElementContext.Provider>
      </APIContext.Provider>
    </AuthContext.Provider>
  )
}
