import { useState } from 'react'

export default function EditProfile () {
  const [details, setDetails] = useState({
    img: '',
    Availability: '',
    Activity: '',
    Goal: '',
    Experience: ''
  })

  const handleChange = event => {
    setDetails({ ...details, [event.target.id]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault()
  }
  return (
    <div>
      <h1>Edit page</h1>
      {/* //avoid refreshing page  */}
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor='img'>Image:</label>
          <input
            type='text'
            id='img'
            value={details.img}
            placeholder='http://'
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor='availability'>Availability:</label>
          <input
            type='date'
            id='availability'
            value={details.availability}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor='goals'>Goals:</label>
          <input
            type='text'
            id='goals'
            value={details.goals}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor='experience'>Experience:</label>
          <input
            type='text'
            id='experience'
            value={details.experience}
            onChange={handleChange}
          />
        </span>
        <span>
          <label htmlFor='activity'>Activity:</label>
          <input
            type='text'
            id='activity'
            value={details.activity}
            onChange={handleChange}
          />
        </span>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
