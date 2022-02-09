import casual from 'casual';

casual.seed(777);

const fakeProduct = () => ({
  id: 'abc123',
  price: 50000,
  name: 'The Sickest Trombone',
  make: 'Huffy',
  model: 'Big Boy',
  productType: 'instrument',
  category: 'trombone',
  description: 'A wicked sick product!',
  photos: [{
    id: 123,
    altText: 'a wicked sick product',
    image: {
      publicUrlTransformed: 'product.jpg',
    },
  }],
  status: 'IN-STOCK',
});

const fakeUser = (overrides) => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  orders: [],
  cart: [],
  cartCount: 2,
  ...overrides,
});

const fakeCartItem = (overrides) => ({
  __typename: 'CartItem',
  id: '123456',
  product: fakeProduct(),
  quantity: 1,
  user: fakeUser(),
  ...overrides,
})

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  fakeProduct,
  fakeUser,
  fakeCartItem,
  LocalStorageMock
};
