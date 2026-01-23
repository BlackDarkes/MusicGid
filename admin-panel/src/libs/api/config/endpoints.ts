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
    getAll: "/product",
    getById: "/product/:id",
    getByCategory: "/product/category/:category",
    getByBrand: "/product/brand/:brand",
    create: "/product/create",
    update: "/product/:id",
    delete: "/product/:id",
  },
  brand: {
    getAll: "/brand",
    getById: "/brand/:id",
    create: "/brand",
    update: "/brand/:id",
    delete: "/brand/:id",
  },
  category: {
    getAll: "/category",
    getById: "/category/:id",
    create: "/category",
    update: "/category/:id",
    delete: "/category/:id",
  },
  instrumentType: {
    getAll: "/instrument-type",
    getById: "/instrument-type/:id",
    create: "/instrument-type",
    update: "/instrument-type/:id",
    delete: "/instrument-type/:id",
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