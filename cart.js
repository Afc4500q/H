<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>عشتار | السلة</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
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
    header .logo {
      font-size: 30px;
      font-weight: bold;
    }
    header .icons {
      display: flex;
      gap: 15px;
    }
    header .icons i {
      font-size: 24px;
      cursor: pointer;
      color: white;
    }
    .container {
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }
    .cart-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .cart-item {
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #fff;
      overflow: hidden;
      position: relative;
    }
    .cart-item img {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }
    .cart-item .details {
      padding: 10px;
      text-align: center;
    }
    .cart-item .details h3 {
      color: #333;
      margin-bottom: 10px;
    }
    .cart-item .details .price {
      font-size: 18px;
      color: #28a745;
      font-weight: bold;
    }
    .cart-item .details .discount {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #ff4747;
      color: white;
      border-radius: 50%;
      padding: 5px 10px;
    }
    .cart-item .remove-btn {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #ff4747;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 5px;
    }
    .cart-summary {
      margin-top: 20px;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .cart-summary .total {
      font-size: 24px;
      color: #28a745;
      font-weight: bold;
    }
    .cart-summary .checkout-btn {
      background-color: #003b49;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      font-size: 18px;
      width: 100%;
      margin-top: 10px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">عشتار</div>
    <div class="icons">
      <i class="fas fa-user"></i>
      <i class="fas fa-question-circle"></i>
      <i class="fas fa-shopping-cart" onclick="window.location.href='cart.html'"></i>
    </div>
  </header>

  <div class="container">
    <h1>السلة</h1>
    <div class="cart-items" id="cartItemsContainer">جارٍ تحميل السلة...</div>

    <div class="cart-summary">
      <p class="total">إجمالي السعر: <span id="totalPrice">0</span> دينار</p>
      <button class="checkout-btn" onclick="window.location.href='checkout.html'">إتمام الشراء</button>
    </div>
  </div>

  <script>
    // جلب المنتجات من السلة من localStorage وعرضها
    function loadCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItemsContainer = document.getElementById('cartItemsContainer');
      const totalPriceElement = document.getElementById('totalPrice');
      cartItemsContainer.innerHTML = ''; // تفريغ المحتوى القديم
      let totalPrice = 0;

      cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // إعداد الصور من المصفوفة
        let imagesHtml = '';
        if (product.images && product.images.length > 0) {
          imagesHtml = `<img src="${product.images[0].trim()}" alt="صورة المنتج">`;
        }

        // إضافة تفاصيل المنتج
        cartItem.innerHTML = `
          ${imagesHtml || `<img src="https://via.placeholder.com/300" alt="صورة افتراضية">`}
          <div class="details">
            <h3>${product.name}</h3>
            <p class="price">السعر: ${product.minprice} - ${product.maxprice}</p>
            <div class="discount">خصم</div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">حذف</button>
        `;

        // حساب الإجمالي
        totalPrice += product.minprice; // يمكن تعديل هذا إذا كنت تريد حساب السعر بشكل مختلف

        cartItemsContainer.appendChild(cartItem);
      });

      totalPriceElement.textContent = totalPrice;
    }

    // إزالة المنتج من السلة
    function removeFromCart(index) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart(); // إعادة تحميل السلة بعد الحذف
    }

    // تحميل السلة عند فتح الصفحة
    loadCart();
  </script>
</body>
</html>
