// تطبيق Flatpickr على حقول التاريخ
const initialConceptInput = flatpickr("#initialConcept", {
    locale: "ar",
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: function (selectedDates) {
        const nextDay = new Date(selectedDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        finalDeadlineInput.set("minDate", nextDay);
        validateDates();
    },
});

const finalDeadlineInput = flatpickr("#finalDeadline", {
    locale: "ar",
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: validateDates,
});

// التحقق من صحة التواريخ
function validateDates() {
    const initialConcept = document.getElementById("initialConcept").value;
    const finalDeadline = document.getElementById("finalDeadline").value;

    if (!initialConcept || !finalDeadline) return;

    const initialDate = new Date(initialConcept);
    const finalDate = new Date(finalDeadline);

    if (initialDate > finalDate) {
        alert("تاريخ التصور المبدئي يجب أن يكون قبل الموعد النهائي.");
        initialConceptInput.clear();
        finalDeadlineInput.clear();
    }

    if (initialDate.getTime() === finalDate.getTime()) {
        alert("لا يمكن أن يكون تاريخ التصور المبدئي والموعد النهائي متطابقين.");
        initialConceptInput.clear();
        finalDeadlineInput.clear();
    }
}

// إدارة الملفات المرفوعة
let uploadedFiles = [];

document.getElementById("logoUpload").addEventListener("change", function (e) {
    const maxSize = 10 * 1024 * 1024;
    const files = Array.from(e.target.files);
    const hasInvalid = files.some(file => file.size > maxSize);
    
    document.getElementById("fileWarning").classList.toggle("show", hasInvalid);
    
    uploadedFiles = files.filter(file => file.size <= maxSize);
    updateFileList();
    e.target.value = "";
});

function updateFileList() {
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = uploadedFiles.map(file => `
        <li title="${file.name}">
            <i class="fas fa-file"></i> 
            ${file.name} (${(file.size/1024).toFixed(2)} كيلوبايت)
        </li>
    `).join("");
}

// إظهار/إخفاء الحقول الإضافية
document.querySelectorAll('[id^="other"]').forEach(el => {
    el.addEventListener("change", e => {
        const targetId = e.target.id.replace("other", "") + "Input";
        document.getElementById(targetId).style.display = e.target.checked ? "block" : "none";
    });
});

// تفعيل اختيار الميزانية
document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", () => {
        document.querySelectorAll(".choice").forEach(c => {
            c.classList.remove("selected");
            c.style.transform = "scale(1)";
        });
        choice.classList.add("selected");
        choice.style.transform = "scale(1.05)";
    });
});

// التحقق من الحقول الإلزامية
function setupValidation() {
    const fields = document.querySelectorAll("input[required], textarea[required]");
    
    fields.forEach(field => {
        field.addEventListener("input", () => hideError(field));
        field.addEventListener("blur", () => validateField(field));
    });
}

function validateForm(event) {
    let isValid = true;
    let firstError = null;
    
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");
    
    document.querySelectorAll("input[required], textarea[required]").forEach(field => {
        if (!validateField(field) && !firstError) firstError = field;
    });

    const budgetError = document.getElementById("budgetError");
    if (!document.querySelector(".choice.selected")) {
        budgetError.style.display = "block";
        isValid = false;
        if (!firstError) firstError = document.querySelector(".budget-section");
    }

    if (!isValid) {
        event.preventDefault();
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError?.focus();
    }
}

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    let isValid = true;

    if (field.required && !field.value.trim()) {
        showError(errorElement, errorMessages[field.id]);
        isValid = false;
    } 
    else if (field.id === 'email' && !validateEmail(field.value)) {
        showError(errorElement, 'البريد الإلكتروني غير صحيح');
        isValid = false;
    }
    else if (field.id === 'phone' && !phoneRegex.test(field.value)) {
        showError(errorElement, 'رقم الهاتف غير صحيح');
        isValid = false;
    }
    else {
        hideError(field);
    }

    return isValid;
}

function showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.style.display = "block";
    element.previousElementSibling?.classList.add("error-field");
}

function hideError(field) {
    const error = document.getElementById(`${field.id}Error`);
    if (error) {
        error.style.display = "none";
        field.classList.remove("error-field");
    }
}

// إدارة مربعات الألوان
let colorCounter = 0;

document.getElementById('addColorButton').addEventListener('click', e => {
    e.preventDefault();
    addColorField();
    
});

function addColorField() {
    colorCounter++;
    const newColor = `
        <div class="color-input-wrapper">
            <input type="color" id="color${colorCounter}" name="color${colorCounter}" value="#d32f2f">
        </div>
    `;
    document.getElementById('addColorButton').insertAdjacentHTML('beforebegin', newColor);
    setupColorEvents(document.getElementById(`color${colorCounter}`));
}


function setupColorEvents(element) {
    element.addEventListener('contextmenu', e => {
        e.preventDefault();
        addDeleteButton(element);
    });

    let timer;
    element.addEventListener('touchstart', e => {
        timer = setTimeout(() => addDeleteButton(element), 500);
    });
    element.addEventListener('touchend', () => clearTimeout(timer));
}

function addDeleteButton(element) {
    const existingBtn = document.querySelector('.delete-color-button');
    if (existingBtn) existingBtn.remove();

    const btn = document.createElement('button');
    btn.className = 'delete-color-button emoji';
    btn.textContent = '×';
    btn.onclick = () => {
        element.parentElement.remove();
        btn.remove();
    };
    element.parentElement.after(btn);
}
// ------ التحقق أثناء الكتابة ------
document.getElementById('email').addEventListener('input', function() {
    validateField(this);
});

document.getElementById('phone').addEventListener('input', function() {
    validateField(this);
});

// أحداث عامة
document.getElementById('briefForm').addEventListener('submit', validateForm);
window.addEventListener('DOMContentLoaded', setupValidation);
document.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("focus", () => {
        document.querySelectorAll(".choice, button").forEach(el => el.classList.add("disable-interaction"));
    });
    input.addEventListener("blur", () => {
        document.querySelectorAll(".choice, button").forEach(el => el.classList.remove("disable-interaction"));
    });
});

// التحقق من البريد الإلكتروني
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// ------ الثوابت والمتغيرات ------
const errorMessages = {
    name: 'يرجى إدخال الاسم',
    phone: 'يرجى إدخال رقم الهاتف',
    email: 'يرجى إدخال البريد الإلكتروني',
    projectName: 'يرجى إدخال اسم المشروع',
    projectDescription: 'يرجى إدخال نبذة عن المشروع',
    projectType: 'يرجى إدخال نوع المشروع',
    initialConcept: 'يرجى اختيار تاريخ التصور المبدئي',
    finalDeadline: 'يرجى اختيار الموعد النهائي',
    budget: 'يرجى اختيار ميزانية'
};

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

// ------ الدوال المساعدة ------
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.style.display = 'block';
    element.previousElementSibling?.classList.add('error-field');
}

function hideError(field) {
    const error = document.getElementById(`${field.id}Error`);
    if (error) {
        error.style.display = 'none';
        field.classList.remove('error-field');
    }
}

// ------ التحقق الرئيسي ------
function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    let isValid = true;

    if (field.required && !field.value.trim()) {
        showError(errorElement, errorMessages[field.id]);
        isValid = false;
    } 
    else if (field.id === 'email' && !validateEmail(field.value)) {
        showError(errorElement, 'البريد الإلكتروني غير صحيح');
        isValid = false;
    }
    else if (field.id === 'phone' && !phoneRegex.test(field.value)) {
        showError(errorElement, 'رقم الهاتف غير صحيح');
        isValid = false;
    }
    else {
        hideError(field);
    }

    return isValid;
}

// ------ إعداد الأحداث ------
function setupValidation() {
    const fields = document.querySelectorAll("input[required], textarea[required]");
    
    fields.forEach(field => {
        field.addEventListener("input", () => {
            const error = document.getElementById(`${field.id}Error`);
            if (error) {
                error.style.display = 'none';
                field.classList.remove('error-field');
            }
        });
        
        field.addEventListener("blur", () => validateField(field));
    });

    // تحقق فوري للحقول الحساسة
    document.getElementById('email').addEventListener('input', () => validateField(document.getElementById('email')));
    document.getElementById('phone').addEventListener('input', () => validateField(document.getElementById('phone')));
}

document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", () => {
        document.getElementById("budgetError").style.display = "none";
    });
});

// ------ حدث الإرسال ------
document.getElementById('briefForm').addEventListener('submit', function(event) {
    let isValid = true;
    let firstError = null;
    
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

    // التحقق من الحقول الإلزامية
    document.querySelectorAll("input[required], textarea[required]").forEach(field => {
        if (!validateField(field) && !firstError) firstError = field;
    });

    // التحقق من الميزانية
    const budgetError = document.getElementById("budgetError");
    const selectedBudget = document.querySelector(".choice.selected");
    
    if (!selectedBudget) {
        budgetError.textContent = errorMessages.budget;
        budgetError.style.display = "block";
        isValid = false;
        if (!firstError) firstError = document.querySelector(".budget-section");
    }

    if (!isValid) {
        event.preventDefault();
        firstError?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        firstError?.focus();
    }
});

// ------ التهيئة الأولية ------
window.addEventListener('DOMContentLoaded', () => {
    setupValidation();
    
    // إعداد Flatpickr
    const initialConceptInput = flatpickr("#initialConcept", {
        locale: "ar",
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: function(selectedDates) {
            const nextDay = new Date(selectedDates[0]);
            nextDay.setDate(nextDay.getDate() + 1);
            finalDeadlineInput.set("minDate", nextDay);
            validateDates();
        },
    });

    const finalDeadlineInput = flatpickr("#finalDeadline", {
        locale: "ar",
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: validateDates,
    });

    function validateDates() {
        const initialConcept = document.getElementById("initialConcept").value;
        const finalDeadline = document.getElementById("finalDeadline").value;

        if (initialConcept && finalDeadline) {
            const initialDate = new Date(initialConcept);
            const finalDate = new Date(finalDeadline);

            if (initialDate > finalDate) {
                alert("تاريخ التصور المبدئي يجب أن يكون قبل الموعد النهائي.");
                initialConceptInput.clear();
                finalDeadlineInput.clear();
            }

            if (initialDate.getTime() === finalDate.getTime()) {
                alert("لا يمكن أن يكون تاريخ التصور المبدئي والموعد النهائي متطابقين.");
                initialConceptInput.clear();
                finalDeadlineInput.clear();
            }
        }
    }
});
function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    let isValid = true;

    // التحقق من الحقول الفارغة
    if (field.required && !field.value.trim()) {
        showError(errorElement, errorMessages[field.id]);
        isValid = false;
    }
    // التحقق من البريد الإلكتروني
    else if (field.id === 'email') {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(field.value)) {
            showError(errorElement, 'البريد الإلكتروني غير صحيح');
            isValid = false;
        }
    }
    
    if (isValid) {
        hideError(field);
    }

    return isValid;
}
function validateForm(event) {
    event.preventDefault(); // منع الإرسال المؤقت للاختبار
    
    let isValid = true;
    let firstError = null;

    // إعادة تعيين جميع الأخطاء
    document.querySelectorAll(".error-message").forEach(el => {
        el.style.display = "none";
    });

    // التحقق من جميع الحقول الإلزامية
    document.querySelectorAll("input[required], textarea[required]").forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            if (!firstError) firstError = field;
        }
    });

    // تحقق إضافي للهاتف والبريد حتى لو لم يكونا required
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    
    if (emailField.value && !validateField(emailField)) {
        isValid = false;
        if (!firstError) firstError = emailField;
    }
    
    if (phoneField.value && !validateField(phoneField)) {
        isValid = false;
        if (!firstError) firstError = phoneField;
    }

    // التحقق من الميزانية
    if (!document.querySelector(".choice.selected")) {
        document.getElementById("budgetError").style.display = "block";
        isValid = false;
        if (!firstError) firstError = document.querySelector(".budget-section");
    }

    if (!isValid) {
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError?.focus();
    } else {
        // إذا كل شيء صحيح، قم بالإرسال
        event.target.submit();
    }
}
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value;
    validatePhoneNumber();
    updatePhoneStatusUI();
    // إزالة الأحرف غير المرغوب فيها
    value = value.replace(/[^\d++]/g, '');
    
    // تحديد الطول الأقصى
    if (value.length > 16) value = value.slice(0, 16);
    
    e.target.value = value;
});

// بيانات الدول
const countries = [
    { 
        code: 'eg', 
        name: 'مصر', 
        dialCode: '+20',
        maxLength: 11,
        pattern: /^01[0-25][0-9]{8}$/,
        example: '010 1234 5678'
    },
    {
        code: 'sa',
        name: 'السعودية',
        dialCode: '+966',
        maxLength: 9,
        pattern: /^5[0-9]{8}$/,
        example: '512 345 678'
    },
    {
        code: 'ae',
        name: 'الإمارات',
        dialCode: '+971',
        maxLength: 9,
        pattern: /^5[0-9]{8}$/,
        example: '512 345 678'
    },
    {
        code: 'us',
        name: 'الولايات المتحدة',
        dialCode: '+1',
        maxLength: 10,
        pattern: /^[2-9][0-9]{9}$/,
        example: '(201) 555-0123'
    }
];

// تهيئة قائمة الدول
function initCountrySelector() {
    const container = document.querySelector('.country-options');
    const searchBox = document.querySelector('.search-box');
    
    // إعادة تعيين القائمة عند كل بحث
    const populateCountries = (countriesList) => {
        container.innerHTML = '';
        countriesList.forEach(country => {
            const div = document.createElement('div');
            div.className = 'country-option';
            div.innerHTML = `
                <span class="flag-icon flag-icon-${country.code}"></span>
                <span class="country-name">${country.name}</span>
                <span class="country-dial">${country.dialCode}</span>
            `;
            div.onclick = () => selectCountry(country);
            container.appendChild(div);
        });
    };

    // البحث الفوري
    searchBox.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = countries.filter(c => 
            c.name.toLowerCase().includes(term) || 
            c.dialCode.includes(term)
        );
        populateCountries(filtered);
    });

    // التهيئة الأولية
    populateCountries(countries);
}

// اختيار الدولة
function selectCountry(country) {
    const selected = document.querySelector('.selected-country');
    selected.innerHTML = `
        <span class="flag-icon flag-icon-${country.code}"></span>
        <span class="country-code">${country.dialCode}</span>
             <span class="phone-status" id="phoneStatus"></span> 
        <i class="arrow"></i>
    `;
    
    const phoneInput = document.getElementById('phone');
    phoneInput.placeholder = country.example;
    phoneInput.dataset.maxLength = country.maxLength;
    
    phoneInput.value = ''; // مسح الحقل عند تغيير الدولة
    toggleCountryList();
    validatePhoneNumber();
    updatePhoneStatusUI();
}

// تبديل عرض قائمة الدول
function toggleCountryList() {
    const list = document.querySelector('.country-list');
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
}

// تنسيق الرقم أثناء الكتابة
document.getElementById('phone').addEventListener('input', function(e) {
    const country = getSelectedCountry();
    if (!country) return;
    
    // إزالة الأحرف غير الرقمية
    let numbers = this.value.replace(/\D/g, '');
    
    // قص الرقم حسب الطول المسموح
    if (numbers.length > country.maxLength) {
        numbers = numbers.slice(0, country.maxLength);
    }
    
    // تطبيق التنسيق
    this.value = formatPhoneNumber(numbers, country.code);
    validatePhoneNumber();
});

// دالة التنسيق
function formatPhoneNumber(numbers, countryCode) {
    switch(countryCode) {
        case 'eg': // 010 1234 5678
            return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
        case 'sa':
        case 'ae': // 512 345 678
            return numbers.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        case 'us': // (201) 555-0123
            return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        default:
            return numbers;
    }
}

// التحقق من صحة الرقم
function validatePhoneNumber() {
    const country = getSelectedCountry();
    const phoneInput = document.getElementById('phone');
    const errorElement = document.getElementById('phoneError');
    
    // إعادة التعيين عند تغيير الدولة
    errorElement.style.display = 'none';
    phoneInput.classList.remove('error-field');

    if (!country) {
        errorElement.textContent = 'الرجاء اختيار الدولة أولاً';
        errorElement.style.display = 'block';
        phoneInput.classList.add('error-field');
        return false;
    }

    const rawNumber = phoneInput.value.replace(/\D/g, '');
    const isValid = country.pattern.test(rawNumber);

    if (!isValid && phoneInput.value) {
        errorElement.textContent = `تنسيق غير صحيح. مثال: ${country.example}`;
        errorElement.style.display = 'block';
        phoneInput.classList.add('error-field');
    }

    return isValid;
}

// الحصول على الدولة المختارة
function getSelectedCountry() {
    const dialCode = document.querySelector('.country-code')?.textContent;
    return countries.find(c => c.dialCode === dialCode);
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (e) => {
    if (!e.target.closest('.country-selector')) {
        document.querySelector('.country-list').style.display = 'none';
    }
});

// التهيئة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    initCountrySelector();
    // إزالة استدعاء selectCountry التلقائي
    document.querySelector('.country-list').style.display = 'none'; // إخفاء القائمة بشكل قاطع
});

// تحديث خاصية maxlength عند تغيير الدولة
function updatePhoneConstraints() {
    const country = getSelectedCountry();
    const phoneInput = document.getElementById('phone');
    
    if (country) {
        phoneInput.maxLength = country.maxLength + Math.floor(country.maxLength/3); // حساب المسافات
    }
}
document.getElementById('otherApplication').addEventListener('change', function() {
    const otherInput = document.getElementById('otherApplicationInput');
    if (this.checked) {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
});
document.getElementById('otherAudience').addEventListener('change', function() {
    const otherInput = document.getElementById('otherAudienceInput');
    if (this.checked) {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
});

// إدارة اختيار الصفات
let selectedTraits = new Set();

document.querySelectorAll('.trait-card').forEach(card => {
    card.addEventListener('click', () => {
        const trait = card.dataset.trait;
        
        if (selectedTraits.has(trait)) {
            selectedTraits.delete(trait);
            card.classList.remove('selected');
        } else {
            selectedTraits.add(trait);
            card.classList.add('selected');
        }
        
        updateTraitsInput();
    });
});

function updateTraitsInput() {
    const traitsInput = document.getElementById('personalityTraits');
    traitsInput.value = Array.from(selectedTraits).join(', ');
}
document.querySelectorAll('.trait-card').forEach(card => {
    card.addEventListener('click', function() {
        const trait = this.dataset.trait;
        const labels = JSON.parse(this.dataset.labels);
        
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            addSlider(trait, labels);
        } else {
            removeSlider(trait);
        }
    });
});

function addSlider(trait, labels) {
    const sliderId = `${trait}-slider`;
    
    if (!document.getElementById(sliderId)) {
        const sliderHTML = `
            <div class="dynamic-slider" id="${sliderId}">
                <div class="slider-header">
                    <span>${labels[0]}</span>
                    <span>${labels[1]}</span>
                </div>
                <div class="slider-container">
                    <div class="slider-track">
                        <div class="slider-fill" style="width: 50%"></div>
                    </div>
                    <input type="range" 
                           class="slider-input" 
                           min="0" 
                           max="100" 
                           value="50"
                           oninput="updateSlider('${trait}', this.value)">
                </div>
                <div class="percentage-display">
                    <span>${labels[0]}: <span class="left-percent">50%</span></span>
                    <span>${labels[1]}: <span class="right-percent">50%</span></span>
                </div>
            </div>
        `;
        
        document.querySelector('.dynamic-sliders').insertAdjacentHTML('beforeend', sliderHTML);
    }
    updateHiddenInput();
}

function updateSlider(trait, value) {
    const slider = document.getElementById(`${trait}-slider`);
    slider.querySelector('.slider-fill').style.width = `${value}%`;
    slider.querySelector('.left-percent').textContent = `${value}%`;
    slider.querySelector('.right-percent').textContent = `${100 - value}%`;
    updateHiddenInput();
}

function removeSlider(trait) {
    const slider = document.getElementById(`${trait}-slider`);
    if (slider) slider.remove();
    updateHiddenInput();
}

function updateHiddenInput() {
    const sliders = Array.from(document.querySelectorAll('.dynamic-slider'));
    const data = sliders.map(slider => ({
        trait: slider.id.replace('-slider', ''),
        value: slider.querySelector('input').value,
        labels: [
            slider.querySelector('.slider-header span:first-child').textContent,
            slider.querySelector('.slider-header span:last-child').textContent
        ]
    }));
    
    document.getElementById('personalityTraits').value = JSON.stringify(data);
}
function updateSlider(trait, value) {
    const slider = document.getElementById(`${trait}-slider`);
    if (slider) {
        slider.querySelector('.slider-fill').style.width = `${value}%`;
        slider.querySelector('.left-percent').textContent = `${value}%`;
        slider.querySelector('.right-percent').textContent = `${100 - value}%`;
        
        // تحديث لون الشريط الديناميكي
        const fillElement = slider.querySelector('.slider-fill');
        const redValue = Math.round(211 - (value * 2.11));
        fillElement.style.background = `linear-gradient(to right, 
            rgb(${redValue}, 47, 47), 
            #b71c1c)`;
    }
    updateHiddenInput();
}
const traitSliders = {
    professional: {
        labels: ["محترف", "غير رسمي"],
        defaultValue: 50
    },
    calm: {
        labels: ["هادئ", "نشيط"],
        defaultValue: 50
    }
    // أضف بقية الصفات بنفس النمط
};

document.querySelectorAll('.trait-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const trait = this.dataset.trait;
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            createSlider(trait);
        } else {
            removeSlider(trait);
        }
    });
});

function createSlider(trait) {
    if (document.getElementById(`${trait}-slider`)) return;

    const sliderHtml = `
        <div class="dynamic-slider" id="${trait}-slider">
            <div class="slider-header">
                <span>${traitSliders[trait].labels[0]}</span>
                <span>${traitSliders[trait].labels[1]}</span>
            </div>
            <input type="range" 
                   min="0" 
                   max="100" 
                   value="${traitSliders[trait].defaultValue}"
                   oninput="updateTraitValue('${trait}', this.value)">
        </div>
    `;

    document.querySelector('.dynamic-sliders').insertAdjacentHTML('beforeend', sliderHtml);
    updateHiddenInput();
}

function removeSlider(trait) {
    const slider = document.getElementById(`${trait}-slider`);
    if (slider) slider.remove();
    updateHiddenInput();
}

function updateTraitValue(trait, value) {
    const traitData = {
        trait: trait,
        value: value
    };
    updateHiddenInput();
}

function updateHiddenInput() {
    const allSliders = Array.from(document.querySelectorAll('.dynamic-slider input'));
    const traitsData = allSliders.map(slider => ({
        trait: slider.parentElement.id.replace('-slider', ''),
        value: slider.value
    }));
    
    document.getElementById('personalityTraits').value = JSON.stringify(traitsData);
}
// داخل دالة addSlider
const sliderHTML = `
        <div class="slider-header">
            <div class="trait-labels">
            </div>
        </div>
        <div class="slider-container">
            <div class="slider-track">
                <div class="slider-fill" style="width: 50%"></div>
            </div>
            <input type="range" 
                   class="slider-input" 
                   min="0" 
                   max="100" 
                   value="50"
        </div>
        <div class="percentage-display">
        </div>
    </div>
`;
function updateSlider(trait, value) {
    const slider = document.getElementById(`${trait}-slider`);
    if (slider) {
        slider.querySelector('.left-percent').textContent = `${value}%`;
        slider.querySelector('.right-percent').textContent = `${100 - value}%`;
        
        // تحديث التدرج اللوني الديناميكي
        const track = slider.querySelector('.slider-track');
        track.style.background = `linear-gradient(
            to right,
            #ffffff 0%,
            #d32f2f ${value}%,
            #ffffff 100%
        )`;
    }
    updateHiddenInput();
}
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    let firstError = null;

    // إعادة تعيين جميع الأخطاء
    document.querySelectorAll(".error-message").forEach(el => {
        el.style.display = "none";
        el.previousElementSibling?.classList.remove('error-field');
    });

    // تحقق إضافي للهاتف (حتى لو غير مطلوب)
    const phoneField = document.getElementById('phone');
    if (phoneField.value && !validatePhoneNumber()) {
        isValid = false;
        if (!firstError) firstError = phoneField;
    }

    // التحقق من الحقول الإلزامية
    document.querySelectorAll("input[required], textarea[required]").forEach(field => {
        if (!validateField(field)) {
            isValid = false;
            if (!firstError) firstError = field;
        }
    });

    // التحقق من الميزانية
    if (!document.querySelector(".choice.selected")) {
        document.getElementById("budgetError").style.display = "block";
        isValid = false;
        if (!firstError) firstError = document.querySelector(".budget-choices");
    }

    if (!isValid) {
        firstError?.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
        });
        firstError?.focus();
    } else {
        document.getElementById('briefForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        // document.getElementById('briefForm').submit(); // إلغاء التعليق عند الربط مع الخادم
    }
}
// التحقق الفوري أثناء الكتابة + تحديث الرسالة
document.getElementById('phone').addEventListener('input', function() {
    validatePhoneNumber();
    updatePhoneStatusUI();
});

// تحديث واجهة حالة الهاتف
function updatePhoneStatusUI() {
    const statusElement = document.getElementById('phoneStatus');
    const phoneInput = document.getElementById('phone');
    
    // التحقق من وجود العنصر أولاً
    if (!statusElement) {
        console.error('Element with id "phoneStatus" not found!');
        return;
    }

    const isValid = validatePhoneNumber();
    
    if (phoneInput.value === '') {
        statusElement.textContent = '';
        statusElement.className = '';
    } else {
        statusElement.textContent = isValid ? '✓' : '✗';
        statusElement.className = isValid ? 'valid' : 'invalid';
    }
}
document.getElementById('addSocialMediaButton').addEventListener('click', function () {
    const container = document.getElementById('socialMediaContainer');

    // إنشاء عنصر div جديد للحقل
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'social-media-field';

    // إنشاء قائمة منسدلة لاختيار المنصة
    const select = document.createElement('select');
    const platforms = {
        facebook: 'فيسبوك',
        twitter: 'تويتر',
        instagram: 'إنستجرام',
        linkedin: 'لينكد إن',
        youtube: 'يوتيوب',
        tiktok: 'تيك توك',
        other: 'أخرى'
    };

    for (const [value, text] of Object.entries(platforms)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }

    // إنشاء أيقونة للمنصة
    const icon = document.createElement('i');
    icon.className = 'fab fa-facebook'; // افتراضيًا فيسبوك

    select.addEventListener('change', function () {
        const selectedValue = select.value;
        icon.className = selectedValue === 'other' ? 'fas fa-globe' : `fab fa-${selectedValue}`;
    });

    // إنشاء حقل إدخال للرابط
    const input = document.createElement('input');
    input.type = 'url';
    input.placeholder = 'أدخل الرابط او الاسم';

    // إنشاء زر لحذف الحقل
    const deleteButton = document.createElement('deleteButton');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = function () {
        container.removeChild(fieldDiv);
    };

    // إضافة العناصر إلى الحقل
    fieldDiv.appendChild(icon);
    fieldDiv.appendChild(select);
    fieldDiv.appendChild(input);
    fieldDiv.appendChild(deleteButton);

    // إضافة الحقل إلى الحاوية
    container.appendChild(fieldDiv);
});
async function submitForm(data) {
    // إرسال البيانات إلى Google Sheets
    const googleSheetsUrl = 'URL_GOOGLE_SCRIPT'; // استبدله بـ URL نشر Google Script
    const response = await fetch(googleSheetsUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // إرسال إشعار إلى Telegram
        const botToken = '7806164255:AAEP5mZJ3KQxLv00ykLVRtcRyoa798-cTQw'; // استبدله بـ Token بوتك
        const chatId = '5533409192'; // استبدله بـ Chat ID الخاص بك
        const message = `
            **تم استلام طلب جديد** 🎉
            الاسم: ${data.name}
            الهاتف: ${data.phone}
            البريد: ${data.email}
            اسم الهوية: ${data.projectName}
            مجال المشروع: ${data.projectType}
            الفئة المستهدفة: ${data.targetAudience}
            شخصية الهوية: ${data.personalityTraits}
            الألوان المختارة: ${data.colors}
            نوع الشعار: ${data.logoType}
            الميزانية: ${data.budget}
        `;
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
        await fetch(telegramUrl);
    }
}

document.getElementById('briefForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // جمع البيانات من جميع الحقول
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        projectName: document.getElementById('projectName').value,
        projectDescription: document.getElementById('projectDescription').value,
        projectType: document.getElementById('projectType').value,
        targetAudience: getSelectedCheckboxes('targetAudience'), // الفئة المستهدفة
        personalityTraits: document.getElementById('personalityTraits').value, // شخصية الهوية
        logoType: getSelectedRadio('logoType'), // نوع الشعار
        colors: getSelectedColors(), // الألوان المختارة
        budget: document.querySelector('.choice.selected')?.textContent, // الميزانية
        // أضف بقية الحقول هنا...
    };

    submitForm(formData);
});

// ------ دوال مساعدة لجمع البيانات ------ //
// 1. جمع قيم Checkboxes
function getSelectedCheckboxes(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value).join(', ');
}

// 2. جمع قيم Radio Buttons
function getSelectedRadio(name) {
    return document.querySelector(`input[name="${name}"]:checked`)?.value || 'غير محدد';
}

// 3. جمع الألوان المختارة
function getSelectedColors() {
    const colorInputs = document.querySelectorAll('input[type="color"]');
    return Array.from(colorInputs).map(input => input.value).join(', ');
}