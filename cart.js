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
   function displayCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];  // جلب السلة من localStorage
  
  // إذا كانت السلة فارغة
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }
  
  // عرض المنتجات في السلة
  let cartItems = document.getElementById('cart-items');  // افترض أن لديك عنصر بـ id "cart-items" لعرض السلة
  cartItems.innerHTML = '';  // إعادة تعيين المحتوى لعرض المنتجات الجديدة

  cart.forEach(item => {
    let productDiv = document.createElement('div');
    productDiv.classList.add('cart-item');
    
    // يمكنك إضافة محتويات المنتج هنا مثل الاسم والسعر والصورة
    productDiv.innerHTML = `
      <p>${item.name}</p>
      <p>${item.minprice} - ${item.maxprice}</p>
      <img src="${item.images[0]}" alt="${item.name}" style="width: 100px;">
      <button onclick="removeFromCart(${item.id})">إزالة من السلة</button>
    `;
    
    cartItems.appendChild(productDiv);  // إضافة العنصر إلى السلة
  });
}

// إظهار السلة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayCart);
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // إزالة المنتج من السلة باستخدام الـ id
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));  // حفظ التغييرات في localStorage
  
  // إعادة تحميل السلة لتحديث العرض
  displayCart();
}
  </script>
</body>
</html>
