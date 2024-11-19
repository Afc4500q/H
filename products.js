

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


const apiUrl = "https://673a0d78a3a36b5a62f0945e.mockapi.io/products/api/products";

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();

    const container = document.getElementById("products-container");

    // عرض المنتجات
    products.forEach((product) => {
      const profit = (product.minprice/100 * 13); // حساب 13% من السعر الأدنى
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p><strong>أقل سعر:</strong> ${product.minprice}</p>
          <p><strong>أعلى سعر:</strong> ${product.maxprice}</p>
          <p><strong>الحالة:</strong> ${product.condition}</p>
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

// استدعاء البيانات عند تحميل الصفحة
fetchProducts();

let cart = JSON.parse(localStorage.getItem("cart")) || []; // تحميل السلة من localStorage إذا كانت موجودة

function addToCart(product) {
  // التحقق من وجود المنتج في السلة مسبقًا
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // زيادة الكمية إذا كان المنتج موجودًا
  } else {
    // إضافة المنتج الجديد مع تحديد الكمية
    cart.push({ ...product, quantity: 1 });
  }

  // تحديث السلة في localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت إضافة المنتج إلى السلة!");
}

// عرض المنتجات
function displayProducts(products) {
  const container = document.getElementById("productsContainer");

  products.forEach((product) => {
    const profit = (product.minprice * 0.13).toFixed(2);
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p><strong>أقل سعر:</strong> ${product.minprice}</p>
        <p><strong>أعلى سعر:</strong> ${product.maxprice}</p>
        <p><strong>الحالة:</strong> ${product.condition ? "متوفر" : "غير متوفر"}</p>
        <p><strong>أربح:</strong> ${profit}</p>
        <div class="buttons">
          <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">إضافة إلى السلة</button>
        </div>
      </div>
    `;
    container.innerHTML += productCard;
  });
}

// استدعاء المنتجات من API
async function fetchProducts() {
  try {
    const response = await fetch("https://673a0d78a3a36b5a62f0945e.mockapi.io/products/api/products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("خطأ في تحميل المنتجات:", error);
  }
}

fetchProducts();

let cart = JSON.parse(localStorage.getItem("cart")) || []; // تحميل السلة من localStorage إذا كانت موجودة

function addToCart(product) {
  // التحقق من وجود المنتج في السلة مسبقًا
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // زيادة الكمية إذا كان المنتج موجودًا
  } else {
    // إضافة المنتج الجديد مع تحديد الكمية
    cart.push({ ...product, quantity: 1 });
  }

  // تحديث السلة في localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت إضافة المنتج إلى السلة!");
}


    
 
