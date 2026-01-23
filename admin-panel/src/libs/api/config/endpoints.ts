export const API_ENDPOINTS = {
  auth: {
    login: "/admin/login",
    logout: "/admin/logout",
    refresh: "/admin/refresh",
    me: "/admin/me",
  },
  users: {
    all: "/users",
  },
  products: {
    getAll: "/products",
    getById: "/products/:id",
    create: "/products/create",
    update: "/products/:id",
  },
  comments: {
    all: "/comment",
    byProduct: "/comment/:id",
    delete: "/comment/:id",
  },
  categories: {
    all: "/product/",
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