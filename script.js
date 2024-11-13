const baseShopPrice = 48;
const standShopPrice = 40;
const barrelPrice = 8;
let extraBarrels = 0;
let priority1 = 0;
let priority2 = 0;
let negpriority = 0;
let basePrice = baseShopPrice;

function updateBasePrice() {
    const shopTypeSelect = document.getElementById('shopType');
    const selectedShopType = shopTypeSelect.value;
    if (selectedShopType === 'stand') {
        basePrice = standShopPrice;
    } else {
        basePrice = baseShopPrice;
    }
    document.getElementById('basePrice').textContent = basePrice;
    calculatePrice();
}

function int_percent(value, percents){
    return Math.round(value / 100 * percents )
}

function updateBarrels(amount) {
    const barrelsInput = document.getElementById('barrels');
    let currentValue = parseInt(barrelsInput.value) || 0;
    barrelsInput.value = Math.max(0, currentValue + amount);
    extraBarrels = currentValue + amount;
    if (extraBarrels <= 0) { extraBarrels = 0; }
    calculatePrice();
}

function updatePriority1(amount) {
    const barrelsInput = document.getElementById('priority1');
    let currentValue = parseInt(barrelsInput.value) || 0;
    barrelsInput.value = Math.max(0, currentValue + amount);
    priority1 = currentValue + amount;
    if (priority1 <= 0) {priority1 = 0; }
    calculatePrice();
}

function updatePriority2(amount) {
    const barrelsInput = document.getElementById('priority2');
    let currentValue = parseInt(barrelsInput.value) || 0;
    barrelsInput.value = Math.max(0, currentValue + amount);
    priority2 = currentValue + amount;
    if (priority2 <= 0) {priority2 = 0; }
    calculatePrice();
}

function updateNegPriority(amount) {
    const barrelsInput = document.getElementById('priorityNegative1');
    let currentValue = parseInt(barrelsInput.value) || 0;
    barrelsInput.value = Math.max(0, currentValue + amount);
    negpriority = currentValue + amount;
    if (negpriority <= 0) {negpriority = 0; }
    calculatePrice();
}

function calculatePrice() {
    const barrelsInput = document.getElementById('barrels');
    const priority1Input = document.getElementById('priority1');
    const priority2Input = document.getElementById('priority2');
    const priorityNegative1Input = document.getElementById('priorityNegative1');

    const barrels = parseInt(barrelsInput.value) || 0;
    const priority1 = parseInt(priority1Input.value) || 0;
    const priority2 = parseInt(priority2Input.value) || 0;
    const priorityNegative1 = parseInt(priorityNegative1Input.value) || 0;

    let totalPrice = basePrice;
    totalPrice += barrels * barrelPrice;
    totalPrice -= int_percent(totalPrice, priority1 * 15);
    totalPrice -= int_percent(totalPrice, priority2 * 15);
    totalPrice += int_percent(totalPrice, priorityNegative1 * 15);
    if (totalPrice < 5) totalPrice = 5;
    document.getElementById('totalPrice').textContent = totalPrice;
}

function ResetValues() {
    // Скидаємо значення змінних
    extraBarrels = 0;
    priority1 = 0;
    priority2 = 0;
    negpriority = 0;
    basePrice = baseShopPrice;

    // Скидаємо значення в input полях
    document.getElementById('barrels').value = '0';
    document.getElementById('priority1').value = '0';
    document.getElementById('priority2').value = '0';
    document.getElementById('priorityNegative1').value = '0';

    // Скидаємо тип магазину на значення за замовчуванням
    document.getElementById('shopType').value = 'shop';

    // Оновлюємо відображення базової ціни
    document.getElementById('basePrice').textContent = basePrice;

    // Перераховуємо загальну ціну
    calculatePrice();
}

// Додайте обробники змін на input полях
const barrelsInput = document.getElementById('barrels');
const priority1Input = document.getElementById('priority1');
const priority2Input = document.getElementById('priority2');
const priorityNegative1Input = document.getElementById('priorityNegative1');

barrelsInput.addEventListener('input', () => updateBarrels(0));
priority1Input.addEventListener('input', () => updatePriority1(0));
priority2Input.addEventListener('input', () => updatePriority2(0));
priorityNegative1Input.addEventListener('input', () => updateNegPriority(0));