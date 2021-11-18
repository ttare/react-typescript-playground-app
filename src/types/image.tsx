import { User } from './user';

export type ImageDetails = {
  id: number;
  name: string;
  createdAt: Date;
  tags: Tag[];
  watchers: User[];
  publisher: User;
  likes: number;
  dislikes: number;
  likedByYou?: boolean;
  dislikedByYou?: boolean;
};

export type Tag = {
  id: number;
  name: string;
};

export type Suggestion = Tag & {
  user: boolean;
};

export type TagOptionType = {
  label: string;
  value: number;
  user: boolean;
};

export type TagOptionGroup = {
  label: string;
  options: TagOptionType[];
};

export type AddImage = {
  name: string;
  tags: string[];
  watchers: number[];
};

export type AddImageValues = {
  name: string;
  tags: TagOptionType[];
};
