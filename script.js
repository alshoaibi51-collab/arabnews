// تهيئة الموقع
document.addEventListener('DOMContentLoaded', function() {
    // عرض التاريخ والوقت العربي
    function updateDateTime() {
        const dateElement = document.getElementById('date-display');
        const now = new Date();
        
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        const dateString = now.toLocaleDateString('ar-EG', options);
        const timeString = now.toLocaleTimeString('ar-EG', {hour12: true});
        
        dateElement.textContent = `${dateString} | ${timeString}`;
    }
    
    // تحديث التاريخ كل ثانية
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // تبديل الوضع المظلم
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // تحميل الوضع المخزن
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // تفعيل القائمة المتنقلة
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });
    
    // محاكاة تغيير حالة الطقس
    function updateWeather() {
        const cities = ['القاهرة', 'الرياض', 'دبي', 'الدار البيضاء', 'عمّان'];
        const conditions = ['مشمس', 'غائم جزئياً', 'صاف', 'ممطر', 'عاصف'];
        const temps = [22, 25, 28, 30, 32, 35];
        
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const randomTemp = temps[Math.floor(Math.random() * temps.length)];
        
        document.querySelector('.weather-temp').textContent = `${randomTemp}°`;
        document.querySelector('.weather-desc').textContent = randomCondition;
        document.querySelector('.weather-location').textContent = randomCity;
        
        // تحديث سرعة الرياح والرطوبة
        document.querySelector('.weather-item:nth-child(1) span:last-child').textContent = 
            `${Math.floor(Math.random() * 20) + 5} كم/س`;
        document.querySelector('.weather-item:nth-child(2) span:last-child').textContent = 
            `${Math.floor(Math.random() * 40) + 30}%`;
        
        // تحديث درجات الحرارة
        const minTemp = randomTemp - 3;
        const maxTemp = randomTemp + 3;
        document.querySelector('.weather-item:nth-child(3) span:last-child').textContent = 
            `${minTemp}° - ${maxTemp}°`;
    }
    
    // تحديث الطقس كل 30 ثانية (محاكاة)
    updateWeather();
    setInterval(updateWeather, 30000);
    
    // محاكاة زيادة عدد المشاهدات عند النقر على المقالات
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            const viewsElement = this.querySelector('.fa-eye');
            if (viewsElement) {
                const viewsContainer = viewsElement.closest('span');
                const currentViews = parseInt(viewsContainer.textContent.replace(/\D/g, ''));
                viewsContainer.textContent = viewsContainer.textContent.replace(/\d+/, currentViews + 1);
            }
        });
    });
    
    // تفعيل نموذج الاشتراك في النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert(`شكراً لك على اشتراكك في النشرة البريدية! سيصلك آخر الأخبار على ${email}`);
            emailInput.value = '';
        }
    });
    
    // إضافة تأثير التمرير السلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // محاكاة تحديث الأخبار العاجلة
    const breakingNewsTexts = [
        "انطلاق فعاليات مؤتمر الأمن السيبراني العربي بمشاركة 30 دولة | ارتفاع أسعار الذهب عالمياً بنسبة 1.5% في تعاملات اليوم | بدء التصويت في الانتخابات البرلمانية في الكويت",
        "توقيع اتفاقية تعاون استراتيجي بين مصر والإمارات في مجال الطاقة المتجددة | المنتخب التونسي يفوز على نظيره الجزائري في بطولة المغرب الدولية | إطلاق خدمة 5G في المدن الرئيسية بالمملكة العربية السعودية",
        "وزراء الخارجية العرب يبحثون مستجدات القضية الفلسطينية في اجتماع طارئ | انعقاد القمة الاقتصادية العربية في الرياض الأسبوع المقبل | إعلان نتائج الثانوية العامة في مصر"
    ];
    
    let currentBreakingIndex = 0;
    const breakingMarquee = document.querySelector('.breaking-content marquee');
    
    function updateBreakingNews() {
        if (breakingMarquee) {
            breakingMarquee.textContent = breakingNewsTexts[currentBreakingIndex];
            currentBreakingIndex = (currentBreakingIndex + 1) % breakingNewsTexts.length;
        }
    }
    
    // تحديث الأخبار العاجلة كل 20 ثانية (محاكاة)
    setInterval(updateBreakingNews, 20000);
});
// اختبار الروابط
function testLinks() {
    console.log('===== اختبار الروابط =====');
    
    // جمع جميع الروابط
    const allLinks = document.querySelectorAll('a');
    console.log(`إجمالي الروابط: ${allLinks.length}`);
    
    // التحقق من الروابط الداخلية
    const internalLinks = Array.from(allLinks).filter(link => {
        const href = link.getAttribute('href');
        return href && (
            href.includes('.html') || 
            href.startsWith('#') || 
            href === '/' || 
            href === ''
        );
    });
    
    console.log(`الروابط الداخلية: ${internalLinks.length}`);
    
    // اختبار كل رابط
    internalLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim() || link.innerHTML;
        
        console.log(`\n${index + 1}. ${text}`);
        console.log(`   الرابط: ${href}`);
        
        // التحقق من وجود الملف للروابط .html
        if (href && href.includes('.html') && !href.startsWith('http')) {
            testFileExists(href);
        }
    });
    
    // إضافة زر اختبار في الصفحة
    if (!document.getElementById('test-links-btn')) {
        const testBtn = document.createElement('button');
        testBtn.id = 'test-links-btn';
        testBtn.textContent = '🔗 اختبار الروابط';
        testBtn.style.position = 'fixed';
        testBtn.style.bottom = '80px';
        testBtn.style.left = '20px';
        testBtn.style.zIndex = '1000';
        testBtn.style.padding = '10px 15px';
        testBtn.style.backgroundColor = '#1a5fb4';
        testBtn.style.color = 'white';
        testBtn.style.border = 'none';
        testBtn.style.borderRadius = '5px';
        testBtn.style.cursor = 'pointer';
        
        testBtn.addEventListener('click', function() {
            const results = runLinkTests();
            alert(results);
        });
        
        document.body.appendChild(testBtn);
    }
}

// اختبار وجود الملف
function testFileExists(filename) {
    fetch(filename)
        .then(response => {
            if (response.ok) {
                console.log(`   ✅ الملف موجود: ${filename}`);
            } else {
                console.log(`   ❌ الملف غير موجود: ${filename}`);
            }
        })
        .catch(error => {
            console.log(`   ❌ خطأ في الوصول: ${filename}`);
        });
}

// تشغيل اختبار شامل
function runLinkTests() {
    const tests = [];
    
    // اختبار 1: الروابط الرئيسية
    const mainLinks = [
        { id: 'home-link', file: 'index.html' },
        { id: 'news-link', file: 'news.html' },
        { id: 'article-link', file: 'article.html' }
    ];
    
    mainLinks.forEach(link => {
        const element = document.querySelector(`a[href="${link.file}"]`);
        if (element) {
            tests.push(`✅ ${link.file} - موجود`);
        } else {
            tests.push(`❌ ${link.file} - غير موجود`);
        }
    });
    
    // اختبار 2: الروابط في التذييل
    const footerLinks = document.querySelectorAll('.footer a');
    tests.push(`✅ روابط التذييل: ${footerLinks.length} رابط`);
    
    // اختبار 3: روابط التنقل
    const navLinks = document.querySelectorAll('.nav-links a');
    tests.push(`✅ روابط التنقل: ${navLinks.length} رابط`);
    
    return tests.join('\n');
}

// تشغيل اختبار الروابط عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأخير بسيط لتحميل كل شيء
    setTimeout(() => {
        testLinks();
    }, 1000);
});