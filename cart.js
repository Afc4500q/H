<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سلة الكحاب</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      direction: rtl;
    }
    .cart-item {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .cart-item img {
      width: 100px;
      height: 100px;
      object-fit: cover;
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

  <div class="container" id="cartItems"></div>

  <script>
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>السلة فارغة حاليًا!</p>';
    } else {
      cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}">
          <div>
            <h4>${product.name}</h4>
            <p>السعر: ${product.price}</p>
          </div>
                  <button class="remove-btn" onclick="removeFromCart(${product.id})">إزالة</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

// إزالة المنتج من السلة
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // تصفية المنتج الذي يطابق الـ id
  cart = cart.filter(product => product.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart)); // حفظ السلة في localStorage
  window.location.reload(); // إعادة تحميل الصفحة لتحديث السلة
}
</script>

</body>
</html>
