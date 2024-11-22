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
      background-color: #003b49; /* لون أزرق بوابة عشتار */
      color: #f1c40f; /* لون ذهبي */
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header .logo {
      font-size: 30px;
      font-weight: bold;
    }
    header .icons {
      display: flex;
      gap: 15px;
    }
    header .icons i {
      font-size: 20px;
      cursor: pointer;
    }
    .container {
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 30px;
    }
    .cart-item {
      display: flex;
      gap: 20px;
      align-items: center;
      background: #fff;
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .cart-item img {
      width: 100px;
      height: 100px;
      object-fit: contain;
      border-radius: 5px;
    }
    .cart-item .info {
      flex: 1;
    }
    .cart-item .info h4 {
      margin: 0;
      color: #333;
    }
    .cart-item .info p {
      margin: 5px 0;
      color: #555;
    }
    .remove-btn {
      background-color: #ff4747;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 14px;
    }
    .remove-btn:hover {
      background-color: #d62c2c;
    }
    .empty-cart {
      text-align: center;
      color: #555;
      font-size: 20px;
      margin-top: 50px;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">عشتار</div>
    <div class="icons">
      <i class="fa fa-home" onclick="window.location.href='index.html'"></i>
      <i      class="fa fa-user" onclick="alert('صفحة الحساب الشخصي قيد الإنشاء!')"></i>
      <i class="fa fa-shopping-cart"></i>
    </div>
  </header>

  <div class="container">
    <div id="cartItems" class="cart-items">
      <!-- سيتم عرض المنتجات هنا -->
    </div>
    <div id="emptyCartMessage" class="empty-cart" style="display: none;">
      السلة فارغة حاليًا!
    </div>
  </div>

  <script>
    // جلب المنتجات من السلة (localStorage)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    // التحقق إذا كانت السلة فارغة
    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
    } else {
      emptyCartMessage.style.display = 'none';

      // عرض المنتجات في السلة
      cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // محتوى المنتج
        cartItem.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}">
          <div class="info">
            <h4>${product.name}</h4>
            <p>السعر: ${product.minprice} - ${product.maxprice}</p>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${product.id})">إزالة</button>
        `;

        cartItemsContainer.appendChild(cartItem);
      });
    }

    // إزالة منتج من السلة
    function removeFromCart(productId) {
      // فلترة المنتجات واستبعاد المنتج المحدد
      const updatedCart = cart.filter(product => product.id !== productId);

      // تحديث localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // إعادة تحميل الصفحة لتحديث السلة
      alert('تم إزالة المنتج من السلة');
      window.location.reload();
    }
  </script>
</body>
</html>
