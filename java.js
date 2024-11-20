 // Fetch API للمنتجات
        const productsContainer = document.querySelector('.products');

        async function fetchProducts() {
            const response = await fetch('https://673a0d78a3a36b5a62f0945e.mockapi.io/products/api/products'); // ضع رابط الـ API هنا
            const products = await response.json();
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>السعر: من ${product.minprice} إلى ${product.maxprice} دينار</p>
                    <button onclick="addToCart(${product.id})">إضافة إلى السلة</button>
                       <button onclick="openModal(${product.id})">بيع لزبون</button>
                `;
                productsContainer.appendChild(productCard);
            });
        }


        // فتح نافذة حسابي
function openAccountModal() {
    const modal = document.getElementById('accountModal');
    modal.style.display = 'flex';
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('userData');
    
    if (!userData) {
        alert('يرجى تسجيل الدخول أولاً!');
        window.location.href = '/login.html'; // توجيه المستخدم لصفحة تسجيل الدخول
        return;
    }

    const user = JSON.parse(userData); // تحويل النص المخزن إلى كائن

    // عرض البيانات في الصفحة
    document.getElementById('username').textContent = user.username;
    document.getElementById('email').textContent = user.email;
});

// إغلاق نافذة الحساب
function closeModal() {
    const modal = document.getElementById('accountModal');
    modal.style.display = 'none';
}

// لتخزين اسم المستخدم في LocalStorage عند تسجيل الدخول
// مثال: تخزين اسم المستخدم عند تسجيل الدخول
// localStorage.setItem('userName', 'اسم المستخدم');
        // فتح نافذة بيع الزبون
        function openModal() {
            document.getElementById('customerModal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('customerModal').style.display = 'none';
        }

        // إرسال بيانات الزبون إلى بوت Telegram
        document.getElementById('customerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const botToken = '7571233461:AAH8lJsUeuKV_L57A42C6pE5i7FFi1_LIak'; // استبدل بـ Token البوت الخاص بك
            const chatId = '1434047374'; // ضع الـ Chat ID الخاص بك

            const message = `
                اسم الزبون: ${data.name}
                رقم الهاتف: ${data.phone}
                المحافظة: ${data.province}
                المدينة: ${data.city}
                المنطقة: ${data.region}
                اسم المستخدم: ${userName}
            `;

            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message }),
            });

            closeModal();
            alert('تم إرسال المعلومات بنجاح!');
        });

        // إضافة المنتج إلى السلة
        function addToCart(productId) {
            // السلة محفوظة في LocalStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('تم إضافة المنتج إلى السلة!');
        }

        // تحميل المنتجات عند فتح الصفحة
        fetchProducts();
