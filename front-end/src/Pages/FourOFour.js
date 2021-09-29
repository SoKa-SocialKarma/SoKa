import '../Assets/FourOFour.scss'
import doHealthyHabits from '../Assets/DoHealthyHabits.svg'

const centerMe = {
  width: '100vw',
  height: '86vh',
  position: 'absolute',
  display: 'grid',
  placeItems: 'center',
  zIndex: '1'
}

const FourOFour = () => {
  return (
    <div>
      <img src={doHealthyHabits} alt='not-found' style={centerMe} />
      <article>
        <blockquote>
          Page
          <br />
          not
          <br />
          found
        </blockquote>
      </article>
    </div>
  )
}

export default FourOFour
