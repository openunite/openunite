import React, { Component } from 'react';
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import EventSearch from '../../components/event/EventSearch';
import EventList from '../../components/event/EventList';
import EventCalendar from '../../components/event/EventCalendar';

import './HomePage.scss';

class HomePage extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
          
          <div className="hero">
            <div className="wrapper">
              <h1>Explore events nearby</h1>
              <EventSearch />
            </div>
          </div>
        </header>

        <div className="flexContainer wrapper">
          <main>
            <EventList />
          </main>

          <aside>
            <EventCalendar />
          </aside>
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default HomePage;
