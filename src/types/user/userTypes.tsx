export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

type Role = {
  id: number;
  name: Roles;
};

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export type Profile = User & {
  access_token: string;
  active: boolean;
  enabled: boolean;
  role: Record<Roles, boolean>;
  roles: Role[];
};
