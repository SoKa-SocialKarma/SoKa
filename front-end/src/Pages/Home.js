import styled from 'styled-components';
import { motion } from 'framer-motion';
import homeimg001 from '../Assets/homeimg001.svg';
import homeimg002 from '../Assets/homeimg002.svg';
// import { useElement } from '../Context/AuthContext'

function Home() {
  // const { mainElement } = useElement()

  // const landingImage = {
  //   width: mainElement.element?.clientWidth,
  //   height: mainElement.element?.clientHeight - 200 || 0
  //   height: '400px',
  //   marginBottom: '30px'
  // }

  const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  `;

  const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  padding: 3rem calc((100vw-1300px) / 2);
  `;

  const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5rem 2rem;

  h1{
    margin-bottom: 0.5rem;
    font-size: 5rem;
  }

  p{
    margin: 2rem 0;
    font-size: 2.7rem;
    line-height; 1.1;
  }
  `;

  const Image = styled.img`
  height: 400px;
  margin-bottom: 30px;
`;

  const ColumnRight = styled.div`
    padding: 1rem 2rem;
  `;


  return (
    <Section>
      <Container>
        <ColumnLeft id='bk-text'>
          <h1>Welcome to Social Karma!</h1>
          <p id='quote-font'>"Get what you give, while you hustle for that muscle!"</p>
        </ColumnLeft>
        <ColumnRight>
          <Image src={homeimg001} alt='two people exercising' />
          <Image src={homeimg002} alt='two people exercising' />
        </ColumnRight>
      </Container>
    </Section >
  )
}

export default Home
