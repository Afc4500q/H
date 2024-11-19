function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartContainer");

  cartContainer.innerHTML = ""; // تنظيف المحتوى

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>السلة فارغة</p>";
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p><strong>أقل سعر:</strong> ${item.minprice}</p>
        <p><strong>أعلى سعر:</strong> ${item.maxprice}</p>
        <p><strong>الكمية:</strong> ${item.quantity}</p>
      </div>
    `;
    cartContainer.innerHTML += cartItem;
  });
}

// عرض المنتجات عند تحميل الصفحة
displayCartItems();
