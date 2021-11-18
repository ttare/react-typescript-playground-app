import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Header, Icon, Menu, Segment, Visibility } from 'semantic-ui-react';
import { Profile } from 'types';
import { ALBUMS_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL } from 'pages/routeNames';
import Avatar from '../Avatar';

interface Props {
  user: Profile;
  logout: () => void;
}

const HomepageHeading: React.FC<Omit<Props, 'logout'>> = ({ user }) => (
  <Container text>
    <Header
      as="h1"
      content="Image Sharing App"
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as="h2"
      content="Do whatever you want when you want to."
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
      }}
    />
    {user ? (
      <Link to={ALBUMS_URL}>
        <Button primary size="huge">
          Go to your albums
          <Icon name="arrow right" />
        </Button>
      </Link>
    ) : (
      <Link to={LOGIN_URL}>
        <Button primary size="huge">
          Create account and upload your photos
          <Icon name="arrow right" />
        </Button>
      </Link>
    )}
  </Container>
);

const Navbar: React.FC<Props> = ({ user, logout }) => {
  const [fixed, setFixed] = useState<boolean>();

  const location = useLocation();

  const hideFixedMenu = () => setFixed(false);
  const showFixedMenu = () => setFixed(true);

  const isHomepage = location.pathname === '/';

  return (
    <div>
      <Visibility once={false} onBottomPassed={showFixedMenu} onBottomPassedReverse={hideFixedMenu}>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: isHomepage ? 700 : undefined, padding: '1em 0em' }}
          vertical>
          <Menu fixed={fixed ? 'top' : undefined} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
            <Container>
              <Menu.Item as="span" active={isHomepage}>
                <Link to="/">Home</Link>
              </Menu.Item>
              {user ? (
                <React.Fragment>
                  <Menu.Item as="span" active={location.pathname === ALBUMS_URL}>
                    <Link to={ALBUMS_URL}>Albums</Link>
                  </Menu.Item>
                  <Menu.Item as="span" active={location.pathname === PROFILE_URL}>
                    Profile
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Avatar user={user} avatar />
                    <Button as="a" inverted={!fixed} style={{ marginLeft: '1em' }} onClick={logout}>
                      Logout
                    </Button>
                  </Menu.Item>
                </React.Fragment>
              ) : (
                <Menu.Item position="right">
                  <Button inverted={!fixed}>
                    <Link to={LOGIN_URL}>Log in</Link>
                  </Button>
                  <Button inverted={!fixed} style={{ marginLeft: '0.5em' }}>
                    <Link to={REGISTER_URL}>Sign Up</Link>
                  </Button>
                </Menu.Item>
              )}
            </Container>
          </Menu>
          {isHomepage && <HomepageHeading user={user} />}
        </Segment>
      </Visibility>
    </div>
  );
};

export default Navbar;
