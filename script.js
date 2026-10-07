// ==================== البيانات الأساسية ====================

// بيانات السيارات
const carsData = [
    {
        id: 1,
        name: 'تويوتا كامري 2023',
        brand: 'Toyota',
        year: 2023,
        price: 450000,
        mileage: 15000,
        type: 'سيارة ركوب',
        image: '🚗',
        specs: ['2.5L', 'أتوماتيك', '200 حصان']
    },
    {
        id: 2,
        name: 'هيونداي كريتا 2024',
        brand: 'Hyundai',
        year: 2024,
        price: 380000,
        mileage: 5000,
        type: 'SUV',
        image: '🚙',
        specs: ['1.6L', 'أتوماتيك', '160 حصان']
    },
    {
        id: 3,
        name: 'نيسان ألتيما 2022',
        brand: 'Nissan',
        year: 2022,
        price: 320000,
        mileage: 45000,
        type: 'سيارة ركوب',
        image: '🚗',
        specs: ['2.0L', 'يدوي', '140 حصان']
    },
    {
        id: 4,
        name: 'مرسيدس C-Class 2023',
        brand: 'Mercedes',
        year: 2023,
        price: 650000,
        mileage: 20000,
        type: 'سيارة ركوب',
        image: '🚗',
        specs: ['2.0L', 'أتوماتيك', '260 حصان']
    },
    {
        id: 5,
        name: 'BMW X5 2024',
        brand: 'BMW',
        year: 2024,
        price: 890000,
        mileage: 2000,
        type: 'SUV',
        image: '🚙',
        specs: ['3.0L', 'أتوماتيك', '340 حصان']
    },
    {
        id: 6,
        name: 'فولكس واجن جولف 2022',
        brand: 'Volkswagen',
        year: 2022,
        price: 280000,
        mileage: 60000,
        type: 'سيارة ركوب',
        image: '🚗',
        specs: ['1.4L', 'يدوي', '125 حصان']
    }
];

// بيانات المزادات
const auctionsData = [
    {
        id: 1,
        name: 'مزاد تويوتا برادو',
        currentPrice: 380000,
        startPrice: 450000,
        timeLeft: '02:30:45',
        bids: 12,
        image: '🚙'
    },
    {
        id: 2,
        name: 'مزاد مرسيدس E-Class',
        currentPrice: 520000,
        startPrice: 650000,
        timeLeft: '05:15:30',
        bids: 8,
        image: '🚗'
    },
    {
        id: 3,
        name: 'مزاد BMW 3 Series',
        currentPrice: 380000,
        startPrice: 500000,
        timeLeft: '01:45:20',
        bids: 15,
        image: '🚗'
    },
    {
        id: 4,
        name: 'مزاد هيونداي IX35',
        currentPrice: 210000,
        startPrice: 280000,
        timeLeft: '03:20:10',
        bids: 7,
        image: '🚙'
    }
];

// ==================== وظائف البحث والتصفية ====================

function filterCars() {
    const carType = document.getElementById('carType').value;
    const priceMin = parseInt(document.getElementById('priceMin').value) || 0;
    const priceMax = parseInt(document.getElementById('priceMax').value) || Infinity;
    const year = parseInt(document.getElementById('year').value) || 0;

    const filteredCars = carsData.filter(car => {
        const typeMatch = carType === 'اختر النوع' || car.type === carType;
        const priceMatch = car.price >= priceMin && car.price <= priceMax;
        const yearMatch = year === 0 || car.year === year;

        return typeMatch && priceMatch && yearMatch;
    });

    displayCars(filteredCars);

    if (filteredCars.length === 0) {
        document.getElementById('carsList').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6B7280;">لم يتم العثور على سيارات تطابق معايير البحث</p>';
    }
}

// ==================== وظائف العرض ====================

function displayCars(cars = carsData) {
    const carsList = document.getElementById('carsList');
    carsList.innerHTML = '';

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div class="car-image">${car.image}</div>
            <div class="car-details">
                <h3>${car.name}</h3>
                <div class="car-specs">
                    <span>سنة: ${car.year}</span>
                    <span>كم: ${car.mileage.toLocaleString()}</span>
                </div>
                <div class="car-specs">
                    <span>${car.specs[0]}</span>
                    <span>${car.specs[1]}</span>
                </div>
                <div class="car-price">${car.price.toLocaleString()} ج.م</div>
                <div class="car-buttons">
                    <button class="btn-view" onclick="viewCarDetails(${car.id})">عرض التفاصيل</button>
                    <button class="btn-contact" onclick="contactSeller(${car.id})">تواصل</button>
                </div>
            </div>
        `;
        carsList.appendChild(carCard);
    });
}

function displayAuctions(auctions = auctionsData) {
    const auctionsList = document.getElementById('auctionsList');
    auctionsList.innerHTML = '';

    auctions.forEach(auction => {
        const auctionCard = document.createElement('div');
        auctionCard.className = 'auction-card';
        
        const discount = Math.round(((auction.startPrice - auction.currentPrice) / auction.startPrice) * 100);
        
        auctionCard.innerHTML = `
            <span class="auction-badge">خصم ${discount}%</span>
            <h3>${auction.name}</h3>
            <div class="auction-timer">
                ⏱️ ${auction.timeLeft}
            </div>
            <div class="auction-price">${auction.currentPrice.toLocaleString()} ج.م</div>
            <div class="auction-bids">
                📊 عدد المزايدات: ${auction.bids}
            </div>
            <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 1rem;">
                الس
                السعر الأولي: ${auction.startPrice.toLocaleString()} ج.م
            </p>
            <button onclick="joinAuction(${auction.id})">شارك في المزاد</button>
        `;
        auctionsList.appendChild(auctionCard);
    });
}

// ==================== وظائف التفاعل ====================

function viewCarDetails(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        alert(`
تفاصيل السيارة:
━━━━━━━━━━━━━━━━
اسم السيارة: ${car.name}
السعر: ${car.price.toLocaleString()} ج.م
سنة الصنع: ${car.year}
المسافة المقطوعة: ${car.mileage.toLocaleString()} كم
المحرك: ${car.specs[0]}
ناقل الحركة: ${car.specs[1]}
القوة: ${car.specs[2]}

للتواصل والمزيد من التفاصيل، يرجى الاتصال بنا عبر WhatsApp أو الهاتف.
        `);
    }
}

function contactSeller(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        const message = `مرحباً، أنا مهتم بشراء ${car.name} بسعر ${car.price.toLocaleString()} ج.م. هل يمكنك تقديم المزيد من المعلومات والصور؟`;
        const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

function joinAuction(auctionId) {
    const auction = auctionsData.find(a => a.id === auctionId);
    if (auction) {
        alert(`لقد انضممت إلى مزاد: ${auction.name}\n\nالسعر الحالي: ${auction.currentPrice.toLocaleString()} ج.م\n\nسيتم توجيهك إلى صفحة المزاد مباشرة.`);
    }
}

// ==================== حاسبة التقسيط ====================

function calculateInstallment() {
    const carPrice = parseFloat(document.getElementById('carPrice').value);
    const months = parseInt(document.getElementById('months').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);

    if (!carPrice || !months || !interestRate) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    // حساب الفائدة المركبة
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (carPrice * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                           (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - carPrice;

    // عرض النتائج
    const resultDiv = document.getElementById('calculatorResult');
    resultDiv.classList.add('show');

    document.getElementById('monthlyPayment').textContent = 
        monthlyPayment.toFixed(2).toLocaleString() + ' ج.م';
    document.getElementById('totalAmount').textContent = 
        totalAmount.toFixed(2).toLocaleString() + ' ج.م';
    document.getElementById('totalInterest').textContent = 
        totalInterest.toFixed(2).toLocaleString() + ' ج.م';

    // Scroll إلى النتائج
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==================== معالجة نموذج التواصل ====================

function handleContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // التحقق من صحة البيانات
    if (!name || !email || !phone || !message) {
        showFormMessage('يرجى ملء جميع الحقول', 'error');
        return;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }

    // التحقق من صحة الهاتف
    const phoneRegex = /^(\+20|0)[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        showFormMessage('يرجى إدخال رقم هاتف صحيح', 'error');
        return;
    }

    // محاكاة إرسال البيانات
    console.log({
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
    });

    // عرض رسالة النجاح
    showFormMessage('شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت.', 'success');

    // مسح النموذج
    document.getElementById('contactForm').reset();

    // في بيئة الإنتاج، يتم إرسال البيانات إلى الخادم
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, phone, message })
    // });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = type;
    
    setTimeout(() => {
        formMessage.className = '';
    }, 5000);
}

// ==================== إحصائيات متحركة ====================

function animateStats() {
    const stats = [
        { element: 'stat1', target: 15000, text: '15,000+' },
        { element: 'stat2', target: 50000, text: '50,000+' },
        { element: 'stat3', target: 10000, text: '10,000+' }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.element);
        let current = 0;
        const increment = stat.target / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                element.textContent = stat.text;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            }
        }, 30);
    });
}

// ==================== تحديث المزادات ====================

function updateAuctionTimers() {
    setInterval(() => {
        auctionsData.forEach(auction => {
            const timeParts = auction.timeLeft.split(':');
            let hours = parseInt(timeParts[0]);
            let minutes = parseInt(timeParts[1]);
            let seconds = parseInt(timeParts[2]);

            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }

            auction.timeLeft = 
                String(hours).padStart(2, '0') + ':' +
                String(minutes).padStart(2, '0') + ':' +
                String(seconds).padStart(2, '0');
        });

        displayAuctions();
    }, 1000);
}

// ==================== وظائف التمرير السلس ====================

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== تحميل البيانات عند بدء الصفحة ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚗 تم تحميل EgyptCarHub بنجاح!');
    
    // عرض السيارات
    displayCars();
    
    // عرض المزادات
    displayAuctions();
    
    // بدء تحديث المزادات
    updateAuctionTimers();
    
    // بدء إحصائيات متحركة عند الوصول إليها
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('stats-section')) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // معالجات الأزرار
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });

    // حساب التقسيط التلقائي عند التحميل
    calculateInstallment();
});

// ==================== وظائف إضافية ====================

// دالة البحث المتقدمة
function advancedSearch(keyword) {
    const results = carsData.filter(car => 
        car.name.toLowerCase().includes(keyword.toLowerCase()) ||
        car.brand.toLowerCase().includes(keyword.toLowerCase()) ||
        car.type.toLowerCase().includes(keyword.toLowerCase())
    );
    displayCars(results);
}

// دالة فرز السيارات
function sortCars(sortBy) {
    let sorted = [...carsData];
    
    switch(sortBy) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'year-new':
            sorted.sort((a, b) => b.year - a.year);
            break;
        case 'mileage':
            sorted.sort((a, b) => a.mileage - b.mileage);
            break;
        default:
            sorted = carsData;
    }
    
    displayCars(sorted);
}

// دالة إضافة سيارة إلى المفضلة (محاكاة)
function addToFavorites(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        localStorage.setItem(`favorite-${carId}`, JSON.stringify(car));
        alert(`تمت إضافة ${car.name} إلى المفضلة`);
    }
}

// دالة مشاركة السيارة
function shareCar(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        const shareText = `تحقق من ${car.name} على EgyptCarHub\nالسعر: ${car.price.toLocaleString()} ج.م\nhttps://egyptcarhub.com/car/${carId}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'EgyptCarHub',
                text: shareText,
                url: window.location.href
            });
        } else {
            // نسخ إلى الحافظة
            navigator.clipboard.writeText(shareText);
            alert('تم نسخ رابط السيارة إلى الحافظة');
        }
    }
}

// دالة الحصول على تقييم السيارة
function getCarRating(carId) {
    // محاكاة التقييمات
    const ratings = {
        1: 4.8,
        2: 4.6,
        3: 4.3,
        4: 4.9,
        5: 4.7,
        6: 4.4
    };
    return ratings[carId] || 4.5;
}

// دالة عرض التقييمات
function displayCarRating(carId) {
    const rating = getCarRating(carId);
    const stars = '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
    return `${stars} (${rating})`;
}

// دالة الحصول على الشركات الموصى بها
function getRecommendedDeals() {
    return carsData
        .sort((a, b) => b.price - a.price)
        .slice(0, 3);
}

// دالة حساب القيمة المتبقية للسيارة
function calculateResidualValue(carPrice, carAge) {
    // قيمة متبقية تقريبية: تنخفض 15% سنوياً
    return carPrice * Math.pow(0.85, carAge);
}

// دالة التحقق من أهلية التمويل
function checkFinancingEligibility(income, loanAmount) {
    const maxLoan = income * 0.4; // لا يتجاوز 40% من الدخل
    return loanAmount <= maxLoan;
}

// دالة الحصول على أقرب فرع
function findNearestBranch(latitude, longitude) {
    // محاكاة الفروع
    const branches = [
        { name: 'فرع القاهرة', lat: 30.0444, lng: 31.2357 },
        { name: 'فرع الجيزة', lat: 30.0131, lng: 31.2089 },
        { name: 'فرع المعادي', lat: 29.9706, lng: 31.3221 },
        { name: 'فرع 6 أكتوبر', lat: 30.0089, lng: 30.8800 }
    ];

    let nearest = branches[0];
    let minDistance = Infinity;

    branches.forEach(branch => {
        const distance = Math.sqrt(
            Math.pow(latitude - branch.lat, 2) + 
            Math.pow(longitude - branch.lng, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            nearest = branch;
        }
    });

    return nearest;
}

// دالة التحقق من توفر السيارة
function checkAvailability(carId) {
    return Math.random() > 0.2; // 80% متوفرة
}

// دالة حساب الضرائب
function calculateTaxes(carPrice) {
    // الضريبة التقريبية: 25% من سعر السيارة
    return carPrice * 0.25;
}

// دالة الحصول على قيمة التأمين السنوي
function getInsurancePrice(carPrice, carAge) {
    const baseInsurance = carPrice * 0.05; // 5% من السعر
    const ageMultiplier = 1 + (carAge * 0.02); // زيادة 2% لكل سنة
    return baseInsurance * ageMultiplier;
}

// دالة إنشاء تقرير السيارة
function generateCarReport(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return null;

    const carAge = new Date().getFullYear() - car.year;
    const residualValue = calculateResidualValue(car.price, carAge);
    const insurancePrice = getInsurancePrice(car.price, carAge);
    const taxes = calculateTaxes(car.price);

    return {
        car: car,
        carAge: carAge,
        residualValue: residualValue.toFixed(0),
        insurancePrice: insurancePrice.toFixed(0),
        taxes: taxes.toFixed(0),
        totalOwnershipCost: (car.price + insurancePrice + taxes).toFixed(0),
        rating: getCarRating(carId),
        available: checkAvailability(carId)
    };
}

// دالة عرض تقرير السيارة
function showCarReport(carId) {
    const report = generateCarReport(carId);
    if (!report) return;

    const reportText = `
📋 تقرير السيارة الشامل
━━━━━━━━━━━━━━━━━━━━━━━━
🚗 اسم السيارة: ${report.car.name}
💰 السعر: ${report.car.price.toLocaleString()} ج.م
📅 السنة: ${report.car.year}
⏱️ عمر السيارة: ${report.carAge} سنة
🛣️ المسافة: ${report.car.mileage.toLocaleString()} كم

💳 تكاليف الملكية
━━━━━━━━━━━━━━━━━━━━━━━━
💵 سعر السيارة: ${report.car.price.toLocaleString()} ج.م
🛡️ التأمين السنوي: ${report.insurancePrice} ج.م
🏛️ الضرائب المتوقعة: ${report.taxes} ج.م
📊 إجمالي التكاليف: ${report.totalOwnershipCost} ج.م
📉 القيمة المتبقية: ${report.residualValue} ج.م

⭐ التقييم: ${report.rating}/5
✅ الحالة: ${report.available ? 'متوفرة' : 'غير متوفرة'}
    `;

    alert(reportText);
}

// دالة الاشتراك في النشرة البريدية
function subscribeNewsletter() {
    const email = prompt('أدخل بريدك الإلكتروني للاشتراك في النشرة البريدية:');
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        localStorage.setItem('newsletter-email', email);
        alert('شكراً للاشتراك! ستتلقى أحدث العروض على بريدك الإلكتروني.');
    } else if (email) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
    }
}

// دالة تتبع الحالة
function trackOrderStatus(orderId) {
    const statuses = ['قيد المعالجة', 'تم التأكيد', 'جاهز للتسليم', 'تم التسليم'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return `
📦 حالة الطلب #${orderId}
━━━━━━━━━━━━━━━━
الحالة: ${randomStatus}
آخر تحديث: ${new Date().toLocaleString('ar-EG')}
    `;
}

// دالة طلب الخدمة
function requestService(serviceType) {
    alert(`تم استقبال طلب خدمة: ${serviceType}\nسيتم التواصل معك قريباً`);
}

// دالة حفظ البيانات محلياً
function saveUserData(userData) {
    localStorage.setItem('egyptcarhub-user', JSON.stringify(userData));
}

// دالة استرجاع بيانات المستخدم
function getUserData() {
    const data = localStorage.getItem('egyptcarhub-user');
    return data ? JSON.parse(data) : null;
}

// دالة مسح بيانات المستخدم
function clearUserData() {
    localStorage.removeItem('egyptcarhub-user');
}

// دالة الحصول على قائمة المفضلة
function getFavorites() {
    const favorites = [];
    for (let key in localStorage) {
        if (key.startsWith('favorite-')) {
            favorites.push(JSON.parse(localStorage[key]));
        }
    }
    return favorites;
}

// ==================== إحصائيات متقدمة ====================

function getMarketAnalysis() {
    return {
        totalListings: carsData.length,
        averagePrice: (carsData.reduce((sum, car) => sum + car.price, 0) / carsData.length).toFixed(0),
        mostPopularBrand: 'تويوتا',
        mostPopularType: 'سيارة ركوب',
        averageMileage: (carsData.reduce((sum, car) => sum + car.mileage, 0) / carsData.length).toFixed(0),
        priceRange: {
            min: Math.min(...carsData.map(c => c.price)),
            max: Math.max(...carsData.map(c => c.price))
        }
    };
}

// دالة الحصول على التوقعات
function getPriceForecasts(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return null;

    const carAge = new Date().getFullYear() - car.year;
    const nextYearPrice = car.price * Math.pow(0.85, 1);
    const next3YearsPrice = car.price * Math.pow(0.85, 3);

    return {
        currentPrice: car.price,
        nextYearForecast: nextYearPrice.toFixed(0),
        next3YearsForecast: next3YearsPrice.toFixed(0),
        depreciationRate: '15% سنوياً'
    };
}

// ==================== معلومات الامتثال القانوني ====================

const legalCompliance = {
    registrationNumber: 'CR-2024-001',
    taxId: 'TAX-2024-001',
    licenseExpiry: '2025-12-31',
    insuranceProvider: 'شركات التأمين المصرية المعتمدة',
    paymentGateways: ['Fawry', 'Vodafone Cash', 'Etisalat Money', 'Bank Transfers'],
    eInvoiceStatus: 'متكامل',
    dataProtection: 'متوافق مع قوانين حماية البيانات المصرية'
};

function displayLegalInfo() {
    console.log('معلومات الامتثال القانوني:', legalCompliance);
    return legalCompliance;
}

// ==================== أدوات الدعم والمساعدة ====================

const supportChannels = {
    whatsapp: '+20 123 456 7890',
    email: 'support@egyptcarhub.com',
    phone: '+20 2 1234 5678',
    liveChat: true,
    availability: '24/7'
};

function getSupportInfo() {
    return supportChannels;
}

function initiateChat(message) {
    console.log('بدء محادثة الدعم:', message);
    // يمكن ربط هذا ببرنامج الدعم الفعلي
    alert('تم توجيه رسالتك إلى فريق الدعم. سنرد عليك قريباً.');
}

// ==================== برنامج الولاء ====================

class LoyaltyProgram {
    constructor() {
        this.points = 0;
        this.tier = 'Bronze';
    }

    addPoints(amount) {
        this.points += amount;
        this.updateTier();
    }

    usePoints(amount) {
        if (this.points >= amount) {
            this.points -= amount;
            this.updateTier();
            return true;
        }
        return false;
    }

    updateTier() {
        if (this.points >= 1000) this.tier = 'Gold';
        else if (this.points >= 500) this.tier = 'Silver';
        else this.tier = 'Bronze';
    }

    getTierBenefits() {
        const benefits = {
            Bronze: 'خصم 5% على جميع الخدمات',
            Silver: 'خصم 10% + دعم أولويات',
            Gold: 'خصم 20% + دعم VIP + هدايا خاصة'
        };
        return benefits[this.tier];
    }
}

// إنشاء برنامج الولاء
const userLoyalty = new LoyaltyProgram();

// ==================== ميزات الذكاء الاصطناعي ====================

function getAIRecommendations(userPreferences) {
    const recommendations = carsData.filter(car => {
        return (
            (!userPreferences.maxPrice || car.price <= userPreferences.maxPrice) &&
            (!userPreferences.minYear || car.year >= userPreferences.minYear) &&
            (!userPreferences.type || car.type === userPreferences.type) &&
            (!userPreferences.maxMileage || car.mileage <= userPreferences.maxMileage)
        );
    });

    return recommendations.sort((a, b) => {
        // الفرز بناءً على الملاءمة
        return b.price - a.price;
    });
}

function getPriceComparison(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return null;

    const similarCars = carsData.filter(c => 
        c.type === car.type && 
        c.id !== carId &&
        Math.abs(c.year - car.year) <= 1
    );

    const avgPrice = similarCars.reduce((sum, c) => sum + c.price, 0) / similarCars.length;
    const comparison = {
        carPrice: car.price,
        marketAverage: avgPrice.toFixed(0),
        difference: (car.price - avgPrice).toFixed(0),
        pricePosition: car.price > avgPrice ? 'أعلى من المتوسط' : 'أقل من المتوسط',
        similarCars: similarCars.length
    };

    return comparison;
}

// ==================== وظائف التحليل ====================

function analyzeCarCondition(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return null;

    const carAge = new Date().getFullYear() - car.year;
    
    let conditionScore = 100;
    conditionScore -= (carAge * 5); // خصم 5 نقاط لكل سنة
    conditionScore -= (car.mileage / 5000); // خصم نقطة لكل 5000 كم

    const condition = {
        score: Math.max(0, Math.min(100, conditionScore)),
        rating: conditionScore >= 80 ? 'ممتاز' : conditionScore >= 60 ? 'جيد' : 'متوسط',
        recommendations: generateMaintenanceRecommendations(car)
    };

    return condition;
}

function generateMaintenanceRecommendations(car) {
    const carAge = new Date().getFullYear() - car.year;
    const recommendations = [];

    if (carAge >= 5) {
        recommendations.push('فحص شامل للمحرك والناقل');
    }
    if (car.mileage > 100000) {
        recommendations.push('تغيير زيت المحرك والفلاتر');
    }
    if (carAge >= 3) {
        recommendations.push('فحص نظام الفرامل والإطارات');
    }

    return recommendations.length > 0 ? recommendations : ['السيارة في حالة جيدة'];
}

// ==================== وظائف إضافية متقدمة ====================

// دالة تحويل العملات
function convertCurrency(amount, fromCurrency = 'EGP', toCurrency = 'USD') {
    const rates = {
        'EGP': 1,
        'USD': 0.032,
        'EUR': 0.029,
        'AED': 0.117
    };

    const amountInUSD = amount * rates[fromCurrency];
    return (amountInUSD / rates[toCurrency]).toFixed(2);
}

// دالة التنبيهات
class AlertManager {
    constructor() {
        this.alerts = [];
    }

    addAlert(type, message, duration = 5000) {
        const alert = {
            id: Date.now(),
            type: type, // 'success', 'error', 'warning', 'info'
            message: message,
            timestamp: new Date()
        };

        this.alerts.push(alert);

        setTimeout(() => {
            this.removeAlert(alert.id);
        }, duration);

        return alert;
    }

    removeAlert(id) {
        this.alerts = this.alerts.filter(a => a.id !== id);
    }

    getAlerts() {
        return this.alerts;
    }
}

const alertManager = new AlertManager();

// دالة إنشاء عرض سعر
function createQuote(carId, customerInfo) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return null;

    const quote = {
        quoteId: 'QT-' + Date.now(),
        car: car,
        customer: customerInfo,
        price: car.price,
        taxes: calculateTaxes(car.price),
        insurance: getInsurancePrice(car.price, 0),
        total: car.price + calculateTaxes(car.price) + getInsurancePrice(car.price, 0),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 أيام
        createdAt: new Date()
    };

    return quote;
}

// دالة طباعة الفاتورة
function printInvoice(quoteId) {
    const invoiceWindow = window.open('', '', 'height=600,width=800');
    
    const content = `
        <html>
            <head>
                <title>فاتورة EgyptCarHub</title>
                <style>
                    body { font-family: Arial; direction: rtl; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .details { margin-bottom: 20px; }
                    .line { border-bottom: 1px solid #ccc; margin: 10px 0; }
                    .total { font-size: 18px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>EgyptCarHub</h1>
                    <p>فاتورة رقم: ${quoteId}</p>
                </div>
                <div class="details">
                    <p><strong>السيارة:</strong> تويوتا كامري 2023</p>
                    <p><strong>السعر:</strong> 450,000 ج.م</p>
                    <p><strong>الضرائب:</strong> 112,500 ج.م</p>
                    <p><strong>التأمين:</strong> 22,500 ج.م</p>
                    <div class="line"></div>
                    <p class="total"><strong>الإجمالي:</strong> 585,000 ج.م</p>
                </div>
            </body>
        </html>
    `;

    invoiceWindow.document.write(content);
    invoiceWindow.document.close();
    invoiceWindow.print();
}

// دالة الحصول على ملخص اليوم
function getDailySummary() {
    return {
        date: new Date().toLocaleDateString('ar-EG'),
        totalCarsListed: carsData.length,
        activeAuctions: auctionsData.length,
        newListings: Math.floor(Math.random() * 10),
        successfulSales: Math.floor(Math.random() * 20),
        totalTransactions: Math.floor(Math.random() * 50)
    };
}

// ==================== معالج
