<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سلة المشتريات</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .container {
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .cart-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .cart-item {
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #fff;
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .cart-item img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
    }
    .cart-item-info {
      margin-top: 10px;
      text-align: center;
    }
    .price {
      font-weight: bold;
      color: #28a745;
    }
    .remove-btn {
      margin-top: 10px;
      padding: 5px 10px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .remove-btn:hover {
      background-color: #c82333;
    }
    .empty-cart {
      text-align: center;
      font-size: 18px;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>سلة المشتريات</h1>
    <div class="cart-items" id="cartItemsContainer">جارٍ تحميل السلة...</div>
  </div>

  <script>
    // استرجاع السلة من localStorage
    function loadCart() {
      const cartItemsContainer = document.getElementById('cartItemsContainer');
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='empty-cart'>سلتك فارغة.</p>";
        return;
      }

      cartItemsContainer.innerHTML = ""; // تفريغ المحتوى الحالي

      cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart-item';

        // إعداد الصور من المصفوفة
        let imagesHtml = '';
        if (product.images && product.images.length > 0) {
          imagesHtml = `<img src="${product.images[0].trim()}" alt="صورة المنتج">`;
        }

        productDiv.innerHTML = `
          ${imagesHtml || `<img src="https://via.placeholder.com/300" alt="صورة افتراضية">`}
          <div class="cart-item-info">
            <h2>${product.name}</h2>
            <p><span class="price">السعر الأدنى:</span> ${product.minprice} - <span class="price">السعر الأعلى:</span> ${product.maxprice}</p>
            <button class="remove-btn" onclick="removeFromCart('${product.id}')">إزالة من السلة</button>
          </div>
        `;
        cartItemsContainer.appendChild(productDiv);
      });
    }

    // إزالة المنتج من السلة
    function removeFromCart(productId) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // إزالة المنتج الذي يحتوي على المعرف المحدد
      cart = cart.filter(product => product.id !== productId);

      // تحديث السلة في localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // إعادة تحميل السلة
      loadCart();
    }

    // جلب السلة عند تحميل الصفحة
    loadCart();
  </script>
</body>
</html>
