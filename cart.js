<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سلة المنتجات</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f4f4f4;
        }
        .cart-item {
            background-color: white;
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .cart-item img {
            max-width: 100px;
            border-radius: 8px;
        }
        .cart-item-details {
            flex: 1;
            padding-left: 15px;
        }
        .cart-item h2 {
            margin: 0;
            font-size: 18px;
        }
        .cart-item p {
            margin: 5px 0;
        }
        .quantity-controls {
            display: flex;
            align-items: center;
        }
        .quantity-controls input {
            width: 40px;
            text-align: center;
            margin-right: 10px;
        }
        .cart-item button {
            padding: 8px 15px;
            background-color: #ff4b5c;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .cart-item button:hover {
            background-color: #f44336;
        }
        #total-price {
            font-size: 20px;
            font-weight: bold;
            margin-top: 30px;
        }
        #empty-cart, #sell-button {
            padding: 10px 20px;
            background-color: #00c853;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }
        #empty-cart:hover, #sell-button:hover {
            background-color: #1b5e20;
        }
    </style>
</head>
<body>
    <h1>سلة المنتجات</h1>
    <div id="cart-items"></div>
    <div id="total-price">الإجمالي: 0.00</div>
    <button id="empty-cart">إفراغ السلة</button>
    <button id="sell-button">بيع</button>

    <script>
        // تحديث السلة
        function updateCart() {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const cartContainer = document.getElementById('cart-items');
            const totalPriceContainer = document.getElementById('total-price');

            cartContainer.innerHTML = ''; // إعادة تحميل السلة من جديد

            let totalPrice = 0;

            if (cartItems.length === 0) {
                cartContainer.innerHTML = '<p>السلة فارغة</p>';
                totalPriceContainer.innerHTML = 'الإجمالي: 0.00';
            } else {
                cartItems.forEach((item, index) => {
                    const itemTotalPrice = item.minprice * item.quantity;
                    totalPrice += itemTotalPrice;

                    const cartItemElement = document.createElement('div');
                    cartItemElement.classList.add('cart-item');
                    cartItemElement.innerHTML = `
                        <img src="${item.avatar}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h2>${item.name}</h2>
                            <p>السعر: ${item.minprice} - ${item.maxprice}</p>
                            <div class="quantity-controls">
                                <button onclick="updateQuantity(${index}, -1)">-</button>
                                <input type="text" value="${item.quantity}" readonly>
                                <button onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                        </div>
                        <button onclick="removeItem(${index})">حذف المنتج</button>
                    `;
                    cartContainer.appendChild(cartItemElement);
                });

                totalPriceContainer.innerHTML = `الإجمالي: ${totalPrice.toFixed(2)} دينار`;
            }
        }

        // تحديث الكمية
        function updateQuantity(index, change) {
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cartItems[index];

            // إذا كانت الكمية غير معرفة أو فارغة نقوم بتعيين الكمية إلى 1
            if (item.quantity === undefined || item.quantity === null) {
                item.quantity = 1;
            }

            // تعديل الكمية، مع التأكد من أنها لا تصبح أقل من 1
            item.quantity = Math.max(1, item.quantity + change);

            // تحديث السلة في localStorage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            updateCart(); // تحديث السلة
        }

        // إزالة المنتج من السلة
        function removeItem(index) {
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.splice(index, 1); // حذف المنتج من السلة
            localStorage.setItem('cart', JSON.stringify(cartItems)); // تخزين السلة الجديدة

            updateCart(); // تحديث السلة بعد الحذف
        }

        // إفراغ السلة
        document.getElementById('empty-cart').onclick = () => {
            localStorage.removeItem('cart'); // إفراغ السلة
            updateCart(); // تحديث السلة بعد الإفراغ
        };

        // بيع - إرسال البيانات إلى بوت تلغرام
        document.getElementById('sell-button').onclick = () => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const totalPrice = cartItems.reduce((total, item) => total + (item.minprice * item.quantity), 0);

            // نافذة إدخال الاسم
            const name = prompt("من فضلك أدخل اسمك الثلاثي:");

            if (name && cartItems.length > 0) {
                let message = `اسم العميل: ${name}\n`;
                cartItems.forEach(item => {
                    message += `\nالمنتج: ${item.name}\nالكمية: ${item.quantity}\nالسعر: ${item.minprice} دينار\n`;
                });
                message += `\nالإجمالي: ${totalPrice.toFixed(2)} دينار`;

                // إرسال البيانات إلى بوت تلغرام
                const token = "7571233461:AAH8lJsUeuKV_L57A42C6pE5i7FFi1_LIak";
                const chatId = "1434047374";
                const url = `https://api.telegram.org/bot${token}/sendMessage`;

                fetch(`${url}?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.ok) {
                            alert("تم إرسال الطلب بنجاح!");
                        } else {
                            alert("حدث خطأ أثناء إرسال الطلب.");
                        }
                    })
                    .catch(error => {
                        alert("فشل في إرسال البيانات.");
                        console.error(error);
                    });
            } else {
                alert("من فضلك أدخل اسمك!");
            }
        };

        // تحديث السلة عند تحميل الصفحة
        updateCart();
    </script>
</body>
</html>
