import React, { Component } from 'react';
import { InputGroup, Button, Popover, Menu } from '@blueprintjs/core';

import './EventSearch.scss';

export interface City {
  id: number;
  name: string;
}

class EventSearch extends Component {
  state = {
    filters: {
      cityId: 1,
      distance: 5,
      distanceUnit: 'km',
    },
    distanceOptions: [ 1, 2, 5, 10, 50 ],
    cities: [ 
      {
        id: 1,
        name: 'Berlin',
      },
      {
        id: 2,
        name: 'Buenos Aires',
      },
    ]
  };

  componentDidMount() {
    // Load cities
  }

  updateDistance(e: any, distance: number) {
    const state = this.state;
    state.filters.distance = distance;
    this.setState(state);
  }

  updateCity(e: any, cityName: string) {
    const state = this.state;
    const city = state.cities.find((city: City) => city.name === cityName);

    if (city) {
      state.filters.cityId = city.id;
      this.setState(state);
    }
  }

  handleSearch() {
    alert('Searched!')
  }

  render() {
    return (
      <div>
        <div className="searchContainer">
          <InputGroup 
            large 
            placeholder="Find an event" 
            className="search" 
            leftIcon="search" 
          />
          
          <div className="text">within</div>
          
          <Popover>
            <Button 
              className="selector" 
              large 
              minimal
            >
              {this.state.filters.distance} {this.state.filters.distanceUnit}
            </Button>

            <Menu>
              {this.state.distanceOptions.map(distance => {
                return (
                  <Menu.Item 
                    key={distance}
                    text={distance + ' ' + this.state.filters.distanceUnit} 
                    onClick={(e: any) => this.updateDistance(e, distance)} 
                  /> 
                );
              })}
            </Menu>
          </Popover>

          <div className="text">of</div>

          <InputGroup 
            large
            placeholder="City"
            defaultValue={this.state.cities[0].name}
            onChange={(e: any) => this.updateCity(e, e.target.value)}
          />

          <Button
            icon="arrow-right"
            minimal
            className="searchButton"
            onClick={this.handleSearch}
          />
        </div>
      </div>
    );
  }
}

export default EventSearch;
