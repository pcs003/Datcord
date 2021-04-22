import { connect } from 'react-redux';

import LandingPage from './landing';

const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};


export default connect(mapStateToProps)(LandingPage);
