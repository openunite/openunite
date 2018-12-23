import React, { Component } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>

        <div className="flexContainer wrapper">
          <main>
            <h1>Not Found</h1>
          </main>
        </div>

        <Footer />
      </div>
    );
  }
}

export default NotFoundPage;
