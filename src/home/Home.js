import React, { Component } from 'react';
import './Home.css';

class News extends Component {
  render() {
    return (
      <div className="home-container">
        <div className='body'>
          <div className='news'>
            {/*Box 1*/}
            <div className='news-boxes'>
              <a href='home'>
                <h2 className='news-title'>Bierbrauer erobern die Welt: Neuer Rekord bei internationalen Bierauszeichnungen</h2>
                <h3 className='news-content'>Brauereien aus aller Welt räumen bei globalen Bierwettbewerben ab.</h3>
              </a>
              <p className='news-meta'>Veröffentlicht: 10.04.2023</p>
            </div>
            <hr className='hr-style' />
            {/*Box 2*/}
            <div className='news-boxes'>
              <a href='home'>
                <h2 className='news-title'>Brauerei-Innovationen: Neueste Trends und Geschmackserlebnisse für Bierliebhaber</h2>
                {/*<h3 className='news-content'></h3>*/}
              </a>
              <p className='news-meta'>Veröffentlicht: 23.03.2023</p>
            </div>
            <hr className='hr-style' />
            {/*Box 3*/}
            <div className='news-boxes'>
              <a href='home'>
                <h2 className='news-title'>Craft Beer Revolution: Wie handwerkliche Brauereien die Bierlandschaft verändern</h2>
                <h3 className='news-content'>Kleine, unabhängige Brauereien setzen mit ihren einzigartigen Bieren und innovativen Ansätzen neue Maßstäbe.</h3>
              </a>
              <p className='news-meta'>Veröffentlicht 20.03.2023</p>
            </div>
            <hr className='hr-style' />
            {/*Box 4*/}
            <div className='news-boxes'>
              <a href='home'>
                <h2 className='news-title'>Nachhaltiges Bierbrauen: Umweltbewusste Praktiken und Trends in der Brauindustrie</h2>
                <h3 className='news-content'>Immer mehr Brauereien setzen auf Nachhaltigkeit.</h3>
              </a>
              <p className='news-meta'>Veröffentlicht 01.03.2023</p>
            </div>
            <hr className='hr-style' />
            <div className='news-pager'>
              <div className='op-button'>
                <a className='op' href='home'>Older Posts</a>
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