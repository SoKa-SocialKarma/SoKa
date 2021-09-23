import img from '../Assets/img.svg'
import { useAuth } from '../Context/AuthContext'

function Home () {
  const { mainElement } = useAuth()

  const landingImage = {
    width: mainElement?.clientWidth,
    height: mainElement?.clientHeight - 136
  }

  return (
    <>
      <img src={img} alt='homeimg' style={landingImage} />
      <div id='bk-text'>
        <h1>Welcome to Social Karma!!</h1>
        <h2>"Get what you give, while you hustle for that muscle!"</h2>
      </div>
    </>
  )
}

export default Home
