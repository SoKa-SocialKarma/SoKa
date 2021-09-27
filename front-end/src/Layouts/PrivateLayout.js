import { useEffect, useState } from 'react'
import { useAPI } from '../Context/AuthContext'

import Navbar from '../Components/Navbar'

const PrivateLayout = ({ component }) => {
  const { currentUserData } = useAPI()
  const [id, setId] = useState(0)

  useEffect(() => {
    setId(currentUserData && currentUserData.id)
  }, [currentUserData])

  return (
    <>
      {currentUserData ? (
        <Navbar children={component} id={id} />
      ) : (
        <Navbar children={component} id={id} />
      )}
    </>
  )
}

export default PrivateLayout
