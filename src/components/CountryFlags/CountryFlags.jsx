import styles from './CountryFlags.less';
import React from 'react';
import go from '../../services/RoutingManager';
import ServiceCallManager from '../../services/ServiceCallManager';
import Loading from '../common/Loading';
import Flag from './Flag';
import countries_hu from '../../assets/data/countries_hu.json';
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
    const { countries, selected, modal } = this.state;
    if (!countries.length) {
      return <Loading />;
    }

    return (
      <div className={styles.countires}>
        <h1>Countries</h1>

        {countries.map(({ numericCode, name, flag }) => (
          <div onClick={() => this.toggle(numericCode)} key={numericCode} className={styles.flags}>
            <img width="100%" src={flag} alt={name} />
          </div>
        ))}
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{selected && countries_hu[selected.alpha2Code]}</ModalHeader>
          <ModalBody>
            <p>
              Az ország neve: <strong>{selected && countries_hu[selected.alpha2Code]}</strong> (angolul:{' '}
              {selected && selected.name})
            </p>
            <p>Földrész: </p>
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
        {selected && <Flag country={selected} />}
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
