import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useAPI } from '../Context/AuthContext'
import '../Assets/NoSearchResults.css'

const NoSearchResults = () => {
  const { getResultsUsingSokaQuery, currentSearchResults } = useAPI()
  const [mustRedirect, setMustRedirect] = useState(false)

  useEffect(() => {
    if (currentSearchResults) {
      setMustRedirect(true)
    }
  }, [currentSearchResults])

  const getSearchResults = async () => {
    await getResultsUsingSokaQuery([])
  }

  return (
    <section>
      {mustRedirect && <Redirect to='/search-results' />}
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
