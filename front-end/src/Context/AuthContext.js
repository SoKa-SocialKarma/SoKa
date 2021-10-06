import React, { useContext, useState, useEffect, useReducer } from 'react'
import { auth } from '../firebase'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'
import { createAlbum } from '../Util/imageStore'

const AuthContext = React.createContext()
const APIContext = React.createContext()
const ElementContext = React.createContext()

const API = apiURL()

// Custom Hooks
export function useAuth() {
  return useContext(AuthContext)
}
export function useAPI() {
  return useContext(APIContext)
}
export function useElement() {
  return useContext(ElementContext)
}

export const ACTIONS = {
  SET_CURRENT_USER: 'set-current-user',
  SET_SOKA_BADGES: 'set-soka-badges',
  SET_SOKA_USERS: 'set-soka-users',
  SET_CURRENT_USER_DATA: 'set-current-user-data',
  NEW_CURRENT_USER_DATA: 'new-current-user-data',
  SET_CURRENT_SEARCH_RESULTS: 'set-current-search-results',
  BLOCK_CURRENT_NEWUSER: 'block-current-newuser',
  SET_CURRENT_REVIEWEE_DATA: 'set-current-reviewee-data',
  SET_MAIN_ELEMENT: 'set-main-element',
  RESET_STATE: 'reset-state'
}

function setGlobalState(globalState, action) {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_USER:
      return Object.assign(
        { ...globalState },
        { currentUser: action.payload.user }
      )
    case ACTIONS.SET_SOKA_BADGES:
      return Object.assign(
        { ...globalState },
        { sokaBadges: action.payload.data.data }
      )
    case ACTIONS.SET_SOKA_USERS:
      return Object.assign(
        { ...globalState },
        { sokaUsers: action.payload.data.data }
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

    case ACTIONS.SET_CURRENT_REVIEWEE_DATA:
      return Object.assign(
        { ...globalState },
        {
          currentRevieweeData: action.payload.data.data
            ? action.payload.data.data[0]
            : {}
        }

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
        {
          currentUser: null,
          currentUserData: {},
          currentSearchResults: [],
          currentRevieweeData: {}
        }

      )
    default:
      return globalState
  }
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [globalState, dispatch] = useReducer(setGlobalState, {
    currentUser: {},
    currentUserData: {},
    currentSearchResults: null,
    currentRevieweeData: {},
    mainElement: {},
    newUserBlocked: false,
    sokaUsers: [],
    sokaBadges: []
  })

  // Login Functions from FIREBASE
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logOut() {
    return auth.signOut()
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  function updateEmail(email) {
    return globalState.currentUser.updateEmail(email)
  }
  function updatePassword(password) {
    return globalState.currentUser.updatePassword(password)
  }
  function elementSetter(mainElement) {
    dispatch({
      type: ACTIONS.SET_MAIN_ELEMENT,
      payload: { mainElement: mainElement }
    })
  }
  function drawerSetter(drawerElement) {
    dispatch({
      type: ACTIONS.SET_DRAWER_ELEMENT,
      payload: { drawerElement: drawerElement }
    })
  }
  function resetState() {
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

  // Login at Firebase and store currentUserData & currentRevieweeData
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      const getCurrentUserData = async user => {
        const data = await axios.get(`${API}/users?uuid=${user.uid}`)
        if (data.data !== 'No data found with the current id.!') {
          await getCurrentRevieweeData(data.data[0].todoreview.reviewing.id)
          dispatch({
            type: ACTIONS.SET_CURRENT_USER_DATA,
            payload: { data: data }
          })
        } else {
          await getCurrentRevieweeData(0)
          const data = await axios.post(`${API}/users/`, {
            uuid: user.uid,
            blocked: true
          })
          dispatch({
            type: ACTIONS.BLOCK_CURRENT_NEWUSER,
            payload: { data: data }
          })
        }
      }

      async function getCurrentRevieweeData(id) {
        if (!id) {
          const data = [{}]
          dispatch({
            type: ACTIONS.SET_CURRENT_REVIEWEE_DATA,
            payload: { data: data }
          })
        } else {
          const data = await axios.get(`${API}/users/${id}`)
          dispatch({
            type: ACTIONS.SET_CURRENT_REVIEWEE_DATA,
            payload: { data: data }
          })
        }
      }

      user && getCurrentUserData(user)
      user && getSokaBadges()
      dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: { user: user } })
      setLoading(false)
    })
    return unsubscribe
  }, [])


  // API Requests
  async function getResultsUsingSokaQuery(searchParams) {
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
  async function getFreshUserData(userId) {
    const data = await axios.get(`${API}/users/${userId}`)
    dispatch({
      type: ACTIONS.NEW_CURRENT_USER_DATA,
      payload: { data: data }
    })
  }

  // Getting newUserData after answering Questionary
  async function getNewUserData(user) {
    const data = await axios.get(`${API}/users?uuid=${user.uid}`)
    dispatch({
      type: ACTIONS.NEW_CURRENT_USER_DATA,
      payload: { data: data }
    })
  }

  // Unblocking User after answering Questionary
  async function unblockNewUser(userUUID) {
    const data = await axios.post(`${API}/users/`, {
      uuid: userUUID,
      blocked: true,
      toggle: true
    })
    dispatch({
      type: ACTIONS.BLOCK_CURRENT_NEWUSER,
      payload: { data: data }
    })
  }

  // Getting Soka Badges
  async function getSokaBadges() {
    const data = await axios.get(`${API}/users?sokabadges=true`)
    dispatch({
      type: ACTIONS.SET_SOKA_BADGES,
      payload: { data: data }
    })
  }
  // Getting SokaUsers
  async function getSokaUsers() {
    const data = await axios.get(`${API}/users/`)
    dispatch({
      type: ACTIONS.SET_SOKA_USERS,
      payload: { data: data }
    })
  }


  // Creating Album for newUser at Firebase
  async function createFirebaseAlbum (user) {
    createAlbum(user.email)
  }
  
  // updating CurrentRevieweeData
  async function updateCurrentRevieweeData (id) {
    if (!id) {
      const data = [{}]
      dispatch({
        type: ACTIONS.SET_CURRENT_REVIEWEE_DATA,
        payload: { data: data }
      })
    } else {
      const data = await axios.get(`${API}/users/${id}`)
      dispatch({
        type: ACTIONS.SET_CURRENT_REVIEWEE_DATA,
        payload: { data: data }
      })
    }
  }

  // Exporting Functions and Variables
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
    currentRevieweeData: globalState.currentRevieweeData,
    sokaBadges: globalState.sokaBadges,
    sokaUsers: globalState.sokaUsers,
    updateCurrentRevieweeData,
    getResultsUsingSokaQuery,
    getFreshUserData,
    getNewUserData,
    getSokaUsers,
    unblockNewUser,
    createFirebaseAlbum
  }

  const elementValue = {
    elementSetter,
    mainElement: globalState.mainElement,
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
