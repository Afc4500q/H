<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سلة القواطي</title>
</head>
<body>
    <h1>سلة الكواطي</h1>
    <div id="cart-items"></div>

    <script>
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cart-items');

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>السلة فارغة</p>';
        } else {
            cartItems.forEach(item => {
                cartContainer.innerHTML += `
                    <div>
                        <h2>${item.name}</h2>
                        <p>السعر: ${item.minprice} - ${item.maxprice}</p>
                        <img src="${item.avatar}" alt="${item.name}" width="100">
                    </div>
                `;
            });
        }
    </script>
</body>
</html>
