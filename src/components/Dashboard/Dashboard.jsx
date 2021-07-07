import styles from './Dashboard.less';
import React from 'react';
//import { getParams } from '../../services/Matcher';
import translate from '../../services/TranslationManager';
import orders from '../../assets/data/orders.json';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
//import { Button } from 'reactstrap';

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.visibleOrders = orders.filter(obj => obj.caid !== '00000000');
    this.state = {
      showModal: false,
      session: null,
    };
  }

  translations = {
    title: translate('dash.title'),
  };

  recorded = rec => {
    return `${rec.substring(0, 10)} ${rec.substring(11, 19)}`;
  };

  getData = () => {
    if (this.state.session) {
      const obj = this.visibleOrders.find(obj => obj._session === this.state.session);
      const selProdNames = obj.selected.map(obj => obj.name);
      const recProdNames = obj.recommended.map(obj => obj.name);

      selProdNames.map((prod, idx) => {
        if (!recProdNames.includes(prod)) {
          obj.selected[idx].diff = true;
        }
        return prod;
      });

      recProdNames.map((prod, idx) => {
        if (!selProdNames.includes(prod)) {
          obj.recommended[idx].diff = true;
        }
        return prod;
      });

      return (
        <div>
          <div className={styles.needs}>
            <ListGroup>
              <ListGroupItem active>Selected needs</ListGroupItem>
              {obj.needs.map((need, key) => <ListGroupItem key={`need-${key}`}>{need}</ListGroupItem>)}
            </ListGroup>
          </div>
          <table className={styles.prodtable}>
            <tbody>
              <tr>
                <td className={styles.td}>
                  <ListGroup>
                    <ListGroupItem active>Selected products</ListGroupItem>
                    {obj.selected.map((prod, key) => (
                      <ListGroupItem key={`prod-${key}`} color={prod.diff ? 'info' : ''}>
                        {prod.count ? `${prod.count} x ` : ''}
                        {prod.name}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </td>
                <td className={styles.td}>
                  <ListGroup>
                    <ListGroupItem active>Recommended products</ListGroupItem>
                    {obj.recommended.map((prod, key) => (
                      <ListGroupItem key={`prod-${key}`} color={prod.diff ? 'danger' : ''}>
                        {prod.count ? `${prod.count} x ` : ''}
                        {prod.name}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  toggle = (event, session) => {
    this.setState({
      showModal: !this.state.showModal,
      session: session || null,
    });
  };

  render() {
    return (
      <div className={styles.dashboard}>
        <Modal isOpen={this.state.showModal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>Detailed overview</ModalHeader>
          <ModalBody>{this.getData()}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <h1>{this.translations.title}</h1>
        <Table striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>GPN</th>
              <th>gender</th>
              <th>Income</th>
              <th>Assets</th>
              <th>Lifecycle</th>
              <th>Recorded</th>
              <th>Ref</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.visibleOrders.map((obj, key) => (
              <tr key={`row${key}`}>
                <th scope="row">{key + 1}</th>
                <td>{obj.caid}</td>
                <td>{obj.profile.gender_cd}</td>
                <td>{obj.profile.annual_income_cd}</td>
                <td>{obj.profile.assets_cd}</td>
                <td>{obj.profile.lifecycle_cd}</td>
                <td>{this.recorded(obj._recorded)}</td>
                <td>{obj.ref}</td>
                <td>
                  <Button color="info" onClick={e => this.toggle(e, obj._session)}>
                    details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Dashboard;
