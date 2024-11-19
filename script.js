const apiURL = "https://673a394a339a4ce445179ae7.mockapi.io/User";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  // التحقق من ملء الحقول
  if (!username || !password) {
    errorDiv.textContent = "يرجى ملء جميع الحقول.";
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
      // تسجيل الدخول ناجح: حفظ بيانات المستخدم في LocalStorage
      const loggedUser = {
        username: user.username,
        userId: user.id,  // تخزين ID المستخدم
        // يمكن إضافة معلومات أخرى إذا كانت موجودة في API
      };

      // تخزين البيانات بشكل آمن باستخدام JSON
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      // الانتقال إلى صفحة المنتجات
      window.location.href = "products.html";
    } else {
      // خطأ في البيانات المدخلة
      errorDiv.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
    }
  } catch (error) {
    console.error("Error fetching API:", error);
    errorDiv.textContent = "حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى.";
  }
}
