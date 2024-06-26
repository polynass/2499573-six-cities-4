export const enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Main = '/',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const Cities = [
  {
    name: 'Paris',
    id: 1,
  },
  {
    name: 'Brussels',
    id: 2,
  },
  {
    name: 'Cologne',
    id: 3,
  },
  {
    name: 'Amsterdam',
    id: 4,
  },
  {
    name: 'Hamburg',
    id: 5,
  },
  {
    name: 'Dusseldorf',
    id: 6,
  },
];

export const TIMEOUT_SHOW_ERROR = 2000;

export const enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export const enum FavouriteStatus {
  Add = 1,
  Remove = 0,
}

export const enum NameSpace {
  Other = 'OTHER',
  Offers = 'OFFERS',
  User = 'USER',
}

export const PAGINATION = {
  minCommentLength: 49,
  maxCommentLength: 300,
  reviewLimit: 10,
  nearbyPointsLimit: 3,
};
