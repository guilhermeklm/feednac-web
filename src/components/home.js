import Image from 'react-bootstrap/Image';
import './Home.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="vazio"></div>
      <div className="container">
        <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
      </div>
      <div className="button-container">
        <Link to={`student`}>
          <button> Sou aluno</button>
        </Link>
        <Link to={`teacher`}>
          <button> Sou professor</button>
        </Link>
      </div>
      <div className='img-bottom-right'>
        <Image src="senac_logo_new.png" />
      </div>
    </>
  );
}

export default Home