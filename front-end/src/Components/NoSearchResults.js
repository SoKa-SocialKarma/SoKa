import { useHistory } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import '../Assets/NoSearchResults.css'

const NoSearchResults = () => {
  const { getSokaRequestQuery } = useAuth()
  const history = useHistory()

  const getSearchResults = async () => {
    await getSokaRequestQuery()
    history.push('/search-results')
  }

  return (
    <section>
      <div className='circle'></div>
      <h1 className='sorry'>
        <span>Sorry,</span>
        <br />
        <span>No</span>
        <br />
        <span>Results</span>
        <br />
        <span>were</span>
        <br />
        <span>Found</span>
      </h1>
      <button className='pushable' onClick={getSearchResults}>
        <span className='front'>Browse all</span>
      </button>
    </section>
  )
}

export default NoSearchResults
