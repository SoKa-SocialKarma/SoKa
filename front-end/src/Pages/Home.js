import img from "../Assets/img.svg"

function Home () {
  return (
    <body>
        <div id="bk-img">
        <img src={img} alt="homeimg" />
        </div>
        <div id="bk-text">
        <br />
          <h1>Welcome to Social Karma!!</h1>
          <h2>"Get what you give, while you hustle for that muscle!"</h2>
        </div>

    </body>
  )
}

export default Home
