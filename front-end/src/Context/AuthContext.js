import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { apiURL } from '../Util/apiURL'
import axios from 'axios'

const AuthContext = React.createContext()
const API = apiURL()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [currentSearchResults, setCurrentSearchResults] = useState([])

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
    return currentUser.updateEmail(email)
  }

  function updatePassword (password) {
    return currentUser.updatePassword(password)
  }

  async function getSokaRequestQuery (searchParams = {}) {
    let query = `${API}/users?`
    Object.keys(searchParams).forEach(k => {
      let day = ''
      if (k === 'availability') {
        const shortedDay = searchParams[k].slice(0, 10).split('-')
        const month = String(Number(shortedDay[1]))
        day = [month, shortedDay[2], shortedDay[0]].join('/')
      }
      if (
        [
          'availability',
          'experience',
          'goal',
          'radius',
          'gender',
          'location'
        ].includes(k) &&
        searchParams[k] !== ''
      ) {
        query += `${k}=${!day ? searchParams[k] : day}&`
      }
    })

    const response = await axios.get(query.slice(0, -1))
    setCurrentSearchResults(response.data)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
    getSokaRequestQuery,
    currentSearchResults
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
