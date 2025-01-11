export type propIcon = {
  name: string;
  className?: string;
  size: number;
};

export type Post = {
  id: number;
  userId?: number;
  title: String;
  body: String;
  autor: String;
  avatar: string;
  createdAt: String;
};

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export type Todo = {
  userId: number;
  id: number;
  title: String;
  completed: Boolean;
};

export type Comment = {
  postId: number;
  id: number;
  name: String;
  email: String;
  body: String;
};

export type Album = {
  userId: number;
  id: number;
  titel: String;
};
