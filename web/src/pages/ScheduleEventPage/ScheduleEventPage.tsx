import React, { Component } from 'react';
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'

class ScheduleEventPage extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>

        <div className="flexContainer wrapper">
          Schedule event
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default ScheduleEventPage;
