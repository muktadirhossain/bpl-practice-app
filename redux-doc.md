For Next.js 14 with the new App Router, the setup is quite similar, but with a few adjustments. In the App Router, you’ll typically use server components and client components together, and the setup for `Provider` placement changes slightly.

Here’s the updated code to integrate the Redux store, Cart Slice, and RTK Query for the Next.js 14 App Router structure:

---

### Step 1: Setting Up Redux Store with the App Router

If you haven't already, install the necessary dependencies:

```bash
npm install @reduxjs/toolkit react-redux
```

In the `app` directory, create a `store.js` file to set up the Redux store.

**`store.js`**

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer from './slices/cartSlice';
import { productApi } from './services/productApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);
```

Then, to provide the store to your app, create a `Provider` component in the `app` directory.

**`app/providers.js`**

```javascript
"use client";

import { Provider } from 'react-redux';
import { store } from './store';

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```

Now, wrap your app’s layout in this provider in the `layout.js` file.

**`app/layout.js`**

```javascript
import './globals.css';
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

### Step 2: Create the Cart Slice

Next, create a `cartSlice.js` in the `slices` folder to manage cart state.

**`slices/cartSlice.js`**

```javascript
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

### Step 3: Create the Product API with RTK Query

Create an API service for fetching product data.

**`services/productApi.js`**

```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
```

---

### Step 4: Implement Add to Cart in Product Section

For the Product List component, which will fetch products and allow adding them to the cart, you’ll create this as a client component because it needs to use Redux.

**`app/components/ProductList.js`**

```javascript
"use client";

import { useGetProductsQuery } from '../services/productApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', margin: '8px' }}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
```

---

### Step 5: Build the Cart Section to Display Cart Items

Now create a `Cart` component to display items in the cart. This component should also be a client component since it interacts with the Redux store.

**`app/components/Cart.js`**

```javascript
"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../slices/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Cart</h2>
      <p>Total Items: {totalQuantity}</p>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
};

export default Cart;
```

---

### Putting It All Together

In the App Router, you can use server components at the route level and render the `ProductList` and `Cart` client components within it.

**`app/page.js`**

```javascript
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function Home() {
  return (
    <div>
      <h1>Product Store</h1>
      <ProductList />
      <Cart />
    </div>
  );
}
```

This setup aligns with Next.js 14’s App Router and successfully integrates Redux and RTK Query for state and API management. Now, your "Add to Cart" and Cart sections will work seamlessly within the App Router context.