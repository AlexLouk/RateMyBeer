import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './Home.css';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentForms: {}
    };
  }

  handleCommentButtonClick = (index) => {
    this.setState((prevState) => ({
      commentForms: {
        ...prevState.commentForms,
        [index]: true
      }
    }));
  };

  handleCommentChange = (event, index) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      commentForms: {
        ...prevState.commentForms,
        [index]: value
      }
    }));
  };

  handleSubmitComment = (event, index) => {
    event.preventDefault();
    const comment = this.state.commentForms[index];
    // Hier kannst du den Kommentar an das Backend senden oder die gewünschte Aktion ausführen
    console.log('Kommentar:', comment);
    // Zurücksetzen des Kommentarfelds und Schließen des Textfelds
    this.setState((prevState) => ({
      commentForms: {
        ...prevState.commentForms,
        [index]: ''
      }
    }));
  };
  render() {
    const { commentForms } = this.state;
    return (
      <div className="con">
        {/*<div className='header'>
          <div className='title'>
            <h1>RateMyBeer News</h1>
          </div>
        </div>*/}
        <div className='body'>
          <div className='news'>
            {/*Box 1*/}
            <div className='news-boxes'>
              <a target='_blank' href='https://getraenke-news.de/kleine-brauereien-brauchen-eine-stimme/'>
                <h2 className='news-title'>Kleinere Brauerei brauchen eine Stimme</h2>
                <h3 className='news-content'>Unter dem Motto „Beer & Dine“ haben der Deutsche Brauer-Bund erstmals gemeinsam zu einem Abendempfang eingeladen.</h3>
              </a>
              <p className='news-meta'>Veröffentlicht: 10.04.2023</p>
              {commentForms[0] ? (
                <form onSubmit={(event) => this.handleSubmitComment(event, 0)}>
                  <textarea
                    value={commentForms[0]}
                    onChange={(event) => this.handleCommentChange(event, 0)}
                    placeholder="Kommentar eingeben"
                  />
                  <Button variant="primary" type="submit">Absenden</Button>
                </form>
              ) : (
                <Button variant="primary" onClick={() => this.handleCommentButtonClick(0)}>Kommentar</Button>
              )}
              <Button variant="primary">"LikeIcon"</Button>{' '}
            </div>
            <hr className='hr-style' />
            {/*Box 2*/}
            <div className='news-boxes'>
              <a target='_blank' href='https://getraenke-news.de/waldhaus-waechst-weiter/'>
                <h2 className='news-title'>Waldhaus wächst weiter</h2>
                <h3 className='news-content'>Die Brauerei Waldhaus aus dem Südschwarzwald meldet für 2022 ein Absatzplus von 3,6 Prozent auf 105.000 Hektoliter.</h3>
              </a>
              <p className='news-meta'>Veröffentlicht: 23.03.2023</p>
              {commentForms[1] ? (
                <form onSubmit={(event) => this.handleSubmitComment(event, 1)}>
                  <textarea
                    value={commentForms[1]}
                    onChange={(event) => this.handleCommentChange(event, 1)}
                    placeholder="Kommentar eingeben"
                  />
                  <Button variant="primary" type="submit">Absenden</Button>
                </form>
              ) : (
                <Button variant="primary" onClick={() => this.handleCommentButtonClick(1)}>Kommentar</Button>
              )}
              <Button variant="primary">"LikeIcon"</Button>{' '}
            </div>
            <hr className='hr-style' />
            {/*Box 3*/}
            <div className='news-boxes'>
              <a target='_blank' href='https://www.welt.de/wirtschaft/article245223826/Berlin-Brandenburg-Brauereiverband-rechnet-mit-teuerstem-Biergarten-Sommer-aller-Zeiten.html'>
                <h2 className='news-title'>Brauereiverband rechnet mit „teuerstem Biergarten-Sommer aller Zeiten“</h2>
                <h3 className='news-content'>Der noch zu Jahresbeginn als „utopisch“ geltende Bierpreis von 7,50 Euro für den halben Liter in ersten Schankbetrieben sei bereits durchbrochen.</h3>
              </a>
              <p className='news-meta'>Veröffentlicht 20.03.2023</p>
              {commentForms[2] ? (
                <form onSubmit={(event) => this.handleSubmitComment(event, 2)}>
                  <textarea
                    value={commentForms[2]}
                    onChange={(event) => this.handleCommentChange(event, 2)}
                    placeholder="Kommentar eingeben"
                  />
                  <Button variant="primary" type="submit">Absenden</Button>
                </form>
              ) : (
                <Button variant="primary" onClick={() => this.handleCommentButtonClick(2)}>Kommentar</Button>
              )}
              <Button variant="primary">"LikeIcon"</Button>{' '}
            </div>
            <hr className='hr-style' />
            {/*Box 4*/}
            <div className='news-boxes'>
              <a target='_blank' href='https://www.welt.de/wissenschaft/article243761097/Schaumkrone-auf-dem-Bier-So-wird-optimal-gezapft.html'>
                <h2 className='news-title'>So entsteht die perfekte Schaumkrone</h2>
                <h3 className='news-content'>Manchmal hat ein Bier zu viel Schaum, manchmal zu wenig. Der Prozess der Schaumentstehung ist überaus komplex und hängt von vielen Parametern ab.</h3>
              </a>
              <p className='news-meta'>Veröffentlicht 01.03.2023</p>
              {commentForms[3] ? (
                <form onSubmit={(event) => this.handleSubmitComment(event, 3)}>
                  <textarea
                    value={commentForms[3]}
                    onChange={(event) => this.handleCommentChange(event, 3)}
                    placeholder="Kommentar eingeben"
                  />
                  <Button variant="primary" type="submit">Absenden</Button>
                </form>
              ) : (
                <Button variant="primary" onClick={() => this.handleCommentButtonClick(3)}>Kommentar</Button>
              )}
              <Button variant="primary">"LikeIcon"</Button>{' '}
            </div>
            <hr className='hr-style' />
            <div className='news-pager'>
              <div>
                <Button variant="secondary">Older Posts</Button>{' '}
              </div>
            </div>
          </div>
          <hr className='hr-style' />
        </div>
      </div>
    );
  }
}

export default News;