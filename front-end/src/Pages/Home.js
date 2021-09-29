import img from '../Assets/img.svg'
import { useElement } from '../Context/AuthContext'

function Home () {
  const { mainElement } = useElement()

  const landingImage = {
    width: mainElement.element?.clientWidth,
    height: mainElement.element?.clientHeight - 136 || 0
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
