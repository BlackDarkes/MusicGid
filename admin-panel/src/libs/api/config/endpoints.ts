export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  users: {
    all: "/users",
  },
  products: {
    all: "/products",
    comments: "/products/:id/comments",
  },
  categories: {
    all: "/categories",
  },
  brands: {
    all: "/brands",
  },
  instrumentTypes: {
    all: "/instrument-types",
  },
  orders: {
    all: "/orders",
    status: "/orders/status",
    paymentsMethods: "/orders/payments-methods",
  },
}