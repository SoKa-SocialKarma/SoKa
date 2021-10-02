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
  NEW_CURRENT_USER_DATA: 'new-current-user-data',
  SET_CURRENT_SEARCH_RESULTS: 'set-current-search-results',
  BLOCK_CURRENT_NEWUSER: 'block-current-newuser',
  SET_MAIN_ELEMENT_: 'set-main-element',
  SET_DRAWER_ELEMENT: 'set-drawer-element',
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

    case ACTIONS.BLOCK_CURRENT_NEWUSER:
      return Object.assign(
        { ...globalState },
        { newUserBlocked: action.payload.data.data[0]['blocked'] }
      )

    case ACTIONS.NEW_CURRENT_USER_DATA:
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
    case ACTIONS.SET_DRAWER_ELEMENT:
      return Object.assign(
        { ...globalState },
        { drawerElement: action.payload.drawerElement }
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
    mainElement: {},
    drawerElement: {},
    newUserBlocked: false
  })

  // Login at Firebase and store user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      const getCurrentUserData = async user => {
        const data = await axios.get(`${API}/users?uuid=${user.uid}`)
        if (data.data !== 'No data found with the current id.!') {
          dispatch({
            type: ACTIONS.SET_CURRENT_USER_DATA,
            payload: { data: data }
          })
        } else {
          const data = await axios.post(`${API}/users?isNewUserBlocked=true`, {
            uuid: user.uid,
            blocked: true
          })
          dispatch({
            type: ACTIONS.BLOCK_CURRENT_NEWUSER,
            payload: { data: data }
          })
        }
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
    dispatch({
      type: ACTIONS.SET_MAIN_ELEMENT,
      payload: { mainElement: mainElement }
    })
  }
  function drawerSetter (drawerElement) {
    dispatch({
      type: ACTIONS.SET_DRAWER_ELEMENT,
      payload: { drawerElement: drawerElement }
    })
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

  // API Requests
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
        query += `${k}=${k !== 'availability' ? searchParams[k] : day}&`
      }
    })
    const response = await axios.get(query.slice(0, -1))
    dispatch({
      type: ACTIONS.SET_CURRENT_SEARCH_RESULTS,
      payload: { response: response }
    })
  }

  // Refreshing Current User Data after updating Profile
  async function getFreshUserData (userId) {
    const data = await axios.get(`${API}/users/${userId}`)
    dispatch({
      type: ACTIONS.NEW_CURRENT_USER_DATA,
      payload: { data: data }
    })
  }

  // Getting newUserData after answering Questionary
  async function getNewUserData (user) {
    const data = await axios.get(`${API}/users?uuid=${user.uid}`)
    dispatch({
      type: ACTIONS.NEW_CURRENT_USER_DATA,
      payload: { data: data }
    })
  }

  const authValue = {
    currentUser: globalState.currentUser,
    newUserBlocked: globalState.newUserBlocked,
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
    newUserBlocked: globalState.newUserBlocked,
    currentUserData: globalState.currentUserData,
    currentSearchResults: globalState.currentSearchResults,
    getResultsUsingSokaQuery,
    getFreshUserData,
    getNewUserData
  }

  const elementValue = {
    elementSetter,
    mainElement: globalState.mainElement,
    drawerSetter,
    drawerElement: globalState.drawerElement
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
