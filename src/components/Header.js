import React from 'react';
import Container from 'react-bootstrap/Container'
import PropTypes from 'prop-types';


// import SignIn from '../SignIn/index';
// import GoogleIcon from '../Icons/Google';

// const Container = {
//     margin: 0 auto;
//     max-width: 960px;
//     padding: 1.45rem 1.0875rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// }


// const StyledLink = styled(Link)`
//   color: white;
//   text-decoration: none;
// `;

// const StyledGoogleIcon = styled(GoogleIcon)`
//   margin-right: 5px;
// `;

const BACKGROUND = 'background-color: #20232a';

const Header = ({ background, title, isAuthed, signIn, signOut }) => (
    <Container fluid="xl" style={{backgroundImage: "linear-gradient(116deg, #08AEEA 0%, #2AF598 100%)"}}>
      <h1>
        {title}
      </h1>
    </Container>
);

Header.defaultProps = {
  background: BACKGROUND,
};

Header.propTypes = {
  background: PropTypes.string,
//   signIn: PropTypes.func.isRequired,
//   signOut: PropTypes.func.isRequired,
  title: PropTypes.string,
//   isAuthed: PropTypes.bool,
};

export default Header;