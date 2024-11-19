const apiURL = "https://673a0d78a3a36b5a62f0945e.mockapi.io/products/api/products";

// عرض بيانات المستخدم في نافذة الحساب
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
document.getElementById("user-id").textContent = loggedUser?.id || "غير متوفر";
document.getElementById("user-name").textContent = loggedUser?.username || "غير متوفر";
document.getElementById("user-password").textContent = loggedUser?.password || "غير متوفر";
document.getElementById("user-balance").textContent = loggedUser?.balance || "غير متوفر";
document.getElementById("user-orders").textContent = loggedUser?.orders || "غير متوفر";

// إظهار/إخفاء نافذة الحساب
const accountModal = document.getElementById("account-modal");
document.getElementById("account-btn").addEventListener("click", () => {
  accountModal.style.display = "block";
});
document.getElementById("close-modal").addEventListener("click", () => {
  accountModal.style.display = "none";
});

// جلب المنتجات وعرضها
async function fetchProducts() {
  const container = document.getElementById("products-container");

  try {
    const response = await fetch(apiURL);
    const products = await response.json();

    products.forEach((product) => {
      const profit = (product.min_price * 0.13).toFixed(2);
      const productCard = `
        <div class="product-card">
          <img src="${products.image}" alt="${products.name}">
          <h3>${products.name}</h3>
          <p><strong>أقل سعر:</strong> ${products.minprice}</p>
          <p><strong>أعلى سعر:</strong> ${products.maxprice}</p>
          <p><strong>الحالة:</strong> ${products.condition}</p>
          <p><strong>أربح:</strong> ${profit}</p>
          <div class="buttons">
            <button>بيع لزبون</button>
            <button>إضافة إلى السلة</button>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();
