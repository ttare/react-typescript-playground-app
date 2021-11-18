import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { Profile } from 'types';
import { TemplateHelper } from 'templates';
import { PROFILE_URL } from 'pages/routeNames';

type Props = {
  user: Profile;
  avatar?: boolean;
};

const Avatar: React.FC<Props> = ({ avatar, user }) => (
  <Link to={TemplateHelper.route(PROFILE_URL, user.id)}>
    <Image src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" avatar={avatar} />
    <span>{user.name}</span>
  </Link>
);

export default Avatar;
