const apiURL = "https://673a394a339a4ce445179ae7.mockapi.io/User";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  // التحقق من ملء الحقول
  if (!username || !password) {
    errorDiv.textContent = "Please fill out all fields.";
    return;
  }

  try {
    // جلب البيانات من الـ API
    const response = await fetch(apiURL);
    const users = await response.json();

    // البحث عن المستخدم المدخل
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // تسجيل الدخول ناجح
      errorDiv.textContent = "";
      alert("Login successful!");
      window.location.href = "products.html"; // الانتقال إلى صفحة المنتجات
    } else {
      // خطأ في البيانات المدخلة
      errorDiv.textContent = "Invalid username or password.";
    }
  } catch (error) {
    console.error("Error fetching API:", error);
    errorDiv.textContent = "An error occurred. Please try again.";
  }
}
