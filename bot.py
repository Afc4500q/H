import telebot

# أدخل توكن البوت هنا
TOKEN = "7852639800:AAGnuurJQS3RLvwEumjXfvW8jAMiQOpqAM4"
bot = telebot.TeleBot(TOKEN)

# قائمة المنتجات
products = {
    "1": {"name": "ساعة ذكية", "price": "50$", "description": "ساعة ذكية مقاومة للماء"},
    "2": {"name": "سماعات بلوتوث", "price": "30$", "description": "سماعات بجودة عالية"},
    "3": {"name": "باور بنك", "price": "25$", "description": "شاحن محمول بسعة 10000mAh"}
}

# أمر /start
@bot.message_handler(commands=["start"])
def send_welcome(message):
    bot.send_message(message.chat.id, "مرحبًا بك في متجرنا! استخدم /products لعرض المنتجات.")

# عرض المنتجات
@bot.message_handler(commands=["products"])
def show_products(message):
    response = "📦 قائمة المنتجات المتاحة:\n"
    for key, product in products.items():
        response += f"{key}. {product['name']} - {product['price']}\n"
    response += "\nأرسل رقم المنتج لطلبه."
    bot.send_message(message.chat.id, response)

# استقبال الطلبات
@bot.message_handler(func=lambda message: message.text.isdigit() and message.text in products)
def order_product(message):
    product = products[message.text]
    bot.send_message(message.chat.id, f"✅ تم اختيار {product['name']}\nالسعر: {product['price']}\n{product['description']}\n\nأرسل /confirm لتأكيد الطلب.")

# تشغيل البوت
bot.polling()
