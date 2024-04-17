function Home(){

    return (
        <>
          <div className="vazio"></div>
          <div className="container">
            <img src="/FeedNac.png" className="banner-img" alt="Imagem feednac" />
          </div>
          <div className="button-container">
            <Button variant="outline-secondary" id="student-login-button">
              Sou aluno
            </Button>
            <Button variant="outline-secondary" id="professor-login-button">
              Sou professor
            </Button>
          </div>
          <div className='img-bottom-right'>
            <Image src="senac_logo_new.png" />
          </div>
        </>
      );
      
}