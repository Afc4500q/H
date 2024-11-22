<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سلة المنتجات</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      direction: rtl;
    }
    header {
      background-color: #003b49;
      color: #f1c40f;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cart-item {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .cart-item img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
    .remove-btn {
      background-color: red;
      color: white;
      padding: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">عشتار</div>
    <div class="icons">
      <i class="fa fa-shopping-cart"></i>
    </div>
  </header>

  <div class="container">
    <div id="cartItems"></div>
    <div id="emptyCartMessage" style="display: none;">السلة فارغة حاليًا!</div>
  </div>

  <script>
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
    } else {
      emptyCartMessage.style.display = 'none';
      cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}">
          <div>
            <h4>${product.name}</h4>
            <p>السعر: ${product.minprice} - ${product.maxprice}</p>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${product.id})">إزالة</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
    }

    function removeFromCart(productId) {
      const updatedCart = cart.filter(product => product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('تم إزالة المنتج من السلة');
      window.location.reload();
    }
  </script>
</body>
</html>
