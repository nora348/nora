
const btn = document.querySelector('#btn');
const list = document.querySelector('#usersList');

// 2. دالة جلب البيانات باستخدام Async/Await
//  async تجعل الدالة ترجع Promise، والـ await تجعلنا ننتظر النتيجة بهدوء
async function loadData() {
    try {
        // تغيير حالة الواجهة (State Management بسيطة)
        list.innerHTML = '<p class="text-center text-blue-500 animate-pulse">جاري جلب البيانات من السيرفر...</p>';

        // استخدام Fetch API لطلب بيانات من RESTful API خارجي
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // تحويل البيانات المستلمة إلى JSON
        const users = await response.json();

        // عرض البيانات في الصفحة
        renderUsers(users);

    } catch (error) {
        // في حال فشل الـ Promise ( يوجد إنترنت)
        list.innerHTML = '<p class="text-center text-red-500">حدث خطأ في الاتصال بالشبكة!</p>';
        console.error("خطأ:", error);
    }
}

// 3. دالة لعرض البيانات في الواجهة (DOM Manipulation)
function renderUsers(users) {
    list.innerHTML = ''; // تنظيف النص القديم
    users.forEach(user => {
        const userCard = `
            <div class="p-4 border-b border-gray-200 hover:bg-gray-50 transition shadow-sm rounded-md bg-white mb-2">
                <h3 class="font-bold text-lg text-gray-800">${user.name}</h3>
                <p class="text-gray-600 font-mono text-sm">${user.email}</p>
                <span class="text-xs text-blue-400 font-semibold uppercase tracking-wide">📍 ${user.address.city}</span>
            </div>
        `;
        list.innerHTML += userCard;
    });
}

// 4. إضافة مستمع للحدث (Event Listener)
btn.addEventListener('click', loadData);
