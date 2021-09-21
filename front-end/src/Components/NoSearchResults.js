import { useHistory } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const NoSearchResults = () => {
  const { getSokaRequestQuery } = useAuth()
  const history = useHistory()

  const getSearchResults = async () => {
    await getSokaRequestQuery()
    history.push('/search-results')
  }

  return (
    <div>
      <h1>No Results were found</h1>
      <button onClick={getSearchResults}>Browse All</button>
    </div>
  )
}

export default NoSearchResults
