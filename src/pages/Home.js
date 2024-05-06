import Image from 'react-bootstrap/Image';
import './Home.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const styles = {
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centraliza os botões horizontalmente
    justifyContent: 'center', // Centraliza os botões verticalmente
  },
  button: {
    width: '340px', // Os botões ocuparão 100% da largura do contêiner pai
    height: '50px', // Altura fixa dos botões (você pode ajustar conforme necessário)
    marginBottom: '1px'
  },
};

function Home() {
  return (
    <>
      <div className="vazio"></div>
      <div className="container">
        <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
      </div>
      <div style={styles.buttonContainer}>
        <Link to={`teacher`}>
          <Button style={styles.button} variant="dark"> Sou professor </Button>
        </Link>
        <Link to={`student`}>
          <Button style={styles.button} variant="dark"> Sou aluno </Button>
        </Link>
      </div>
      <div className='img-bottom-right'>
        <Image src="senac_logo_new.png" />
      </div>
    </>
  );
}

export default Home