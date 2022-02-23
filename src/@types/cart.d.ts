interface Cart {
  id: number;
  title: string;
  slug: string;
  images?: string;
  quantity: number;
  price: number;
}

// Get list cart

interface ResGetListCartApi extends Res {
  data: {
    carts: Cart[];
    total: number;
  };
}

interface ResGetListCart extends ActionRedux {
  payload: ResGetListCartApi;
}

// Add cart item

interface ResAddCartApi extends Res {
  data: {
    cart: Cart;
  };
}

interface ResAddCart extends ActionRedux {
  payload: ResAddCartApi;
}

// Update cart item

interface ResUpdateCartApi extends Res {
  data: {
    id: number;
    cart: Cart;
  };
}

interface ResUpdateCart extends ActionRedux {
  payload: ResUpdateCartApi;
}

// Remove cart item

interface ResRemoveCartApi extends Res {
  data: {
    id: number;
  };
}

interface ResRemoveCart extends ActionRedux {
  payload: ResRemoveCartApi;
}

// Increase quantity

interface ResIncreaseQuantityCartApi extends Res {
  data: {
    id: number;
    quantity: number;
  };
}

interface ResIncreaseQuantityCart extends ActionRedux {
  payload: ResIncreaseQuantityCartApi;
}

// Decrease quantity

interface ResDecreaseQuantityCartApi extends Res {
  data: {
    id: number;
    quantity: number;
  };
}

interface ResDecreaseQuantityCart extends ActionRedux {
  payload: ResDecreaseQuantityCartApi;
}
