import React, { useContext, useState, useEffect } from 'react'
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



export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currentUserData, setCurrentUserData] = useState({})
  const [currentSearchResults, setCurrentSearchResults] = useState([])
  
  const [loading, setLoading] = useState(true)
  const [element, setElement] = useState()


  // Login at Firebase and store user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      const getCurrentUserData = async (user) => {
        const data = await axios.get(`${API}/users?uuid=${user.uid}`)
        setCurrentUserData(data.data[0]) 
        //  console.log('AUTH USERDATA', currentUserData)
        }
        user && getCurrentUserData(user)
        setCurrentUser(user)
        setLoading(false)
      })
    return unsubscribe
  }, [])



  // // Using Firebase user.uid, get user data from API and store UserData
  // useEffect(()=>{
  //   const getCurrentUserData = async () => {
  //     const data = axios.get(`${API}/users?uuid=${currentUser?.uid}`)
  //     const userData = data.data[0]
  //     const result = await Promise.all([data, userData])
  //     console.log("CONTEXT RESULT AFTER AWAIT")
  //     console.log(result)
  //     setCurrentUserData(result[1]) 
  //   }
  //   return getCurrentUserData()
  // },[])



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
    return currentUser.updateEmail(email)
  }

  function updatePassword (password) {
    return currentUser.updatePassword(password)
  }

  function elementSetter (element) {
    setElement(element)
  }


  // API Request
  const queryKeys = ['availability','experience','goal','radius','gender','location']

  async function getResultsUsingSokaQuery (searchParams) {
    let query = `${API}/users?`
    let day = ''

    Object.keys(searchParams).forEach(k => {
      
      if (k === 'availability') {
        const shortedDay = searchParams[k].slice(0, 10).split('-')
        const month = String(Number(shortedDay[1]))
        day = [month, shortedDay[2], shortedDay[0]].join('/')
      }

      if ( queryKeys.includes(k) && searchParams[k] !== '') {
        query += `${k}=${!day ? searchParams[k] : day}&`
      }

    })

    const response = await axios.get(query.slice(0, -1))
    setCurrentSearchResults(response.data)
  }



  const authValue = {
    currentUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  const apiValue = {
    currentUser,
    currentUserData,
    setCurrentUserData,
    setCurrentSearchResults,
    currentSearchResults,
    getResultsUsingSokaQuery,
  }

  const elementValue ={     
    elementSetter,
    element,
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
