export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  USERS: {
    PROFILE: "/user",
  },
  CART: {
    BASE: "/cart",
    ITEMS: "/cart/:id"
  },
  COMMENTS: {
    BASE: "/comments",
  },
  PRODUCT: {
    BASE: "/product",
    SEARCH: "/product/search",
    CATEGORY: "/product/category",
    ITEM: "/product/:id",
  },
  CATEGORY: {
    BASE: "/category",
  },
  BRANDS: {
    BASE: "/brannd",
  },
  ORDER: {
    BASE: "/order",
    ITEM: "/order/:id"
  }
} as const;