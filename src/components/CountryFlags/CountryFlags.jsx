import styles from './CountryFlags.less';
import React from 'react';
import go from '../../services/RoutingManager';
import ServiceCallManager from '../../services/ServiceCallManager';
import Loading from '../common/Loading';
import Flag from './Flag';
import countries_hu from '../../assets/data/countries_hu.json';
import continents_hu from '../../assets/data/continents_hu.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CountryFlags extends React.PureComponent {
  state = {
    countries: [],
    selected: null,
    modal: false,
  };

  componentDidMount() {
    ServiceCallManager.call('https://restcountries.eu/rest/v2/all').then(countries => {
      this.setState({ countries });
      const ctyByRegion = {};
      countries.map(cty => {
        const region = cty.region !== '' ? cty.region : 'w/o';
        if (!Object.keys(ctyByRegion).includes(region)) {
          ctyByRegion[region] = [];
        }
        ctyByRegion[region].push(cty);
      });
      this.setState({ ctyByRegion });
    });
  }

  handleChange = event => {
    this.selectCountry(event.target.value);
  };

  selectCountry = code => {
    const { countries } = this.state;
    const selected = countries.find(country => country.numericCode === code);
    this.setState({ selected });
  };

  back = () => {
    go('Test');
  };

  toggle = code => {
    if (code) {
      this.selectCountry(code);
    }
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { countries, ctyByRegion, selected, modal } = this.state;
    if (!countries.length || !ctyByRegion) {
      return <Loading />;
    }

    return (
      <div className={styles.countires}>
        <h1>Countries</h1>
        {Object.keys(ctyByRegion).map(key => (
          <div key={key}>
            <h2>{continents_hu[key]}</h2>{' '}
            {ctyByRegion[key].map(({ numericCode, name, flag }) => (
              <div onClick={() => this.toggle(numericCode)} key={numericCode} className={styles.flags}>
                <img width="100%" src={flag} alt={name} />
              </div>
            ))}
          </div>
        ))}
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{selected && countries_hu[selected.alpha2Code]}</ModalHeader>
          <ModalBody>
            {selected && (
              <div className={styles.countryFlags}>
                <p>
                  Az ország neve: <strong>{countries_hu[selected.alpha2Code]}</strong>
                  <br />(angolul: {selected.name}, németül: {selected.translations['de']})
                </p>
                <p>
                  Földrész: {continents_hu[selected.region]}
                  <br />(angolul: {selected.region}) , {selected.subregion}{' '}
                </p>
                <Flag flag={selected.flag} />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
        {/*
        <select onChange={this.handleChange}>
          <option value={0}>-- Select Country --</option>
          {countries.map(({ numericCode, name }) => (
            <option key={numericCode} value={numericCode}>
              {name}
            </option>
          ))}
        </select>
        <br />
        {selected && <Flag flag={selected.flag} />}
        <br />
        */}
        <button className="btn btn-primary" onClick={this.back}>
          back
        </button>
      </div>
    );
  }
}

export default CountryFlags;
