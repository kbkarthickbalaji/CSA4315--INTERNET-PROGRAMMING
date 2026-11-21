const catalog = [
    { id: 1, name: 'Wireless Bluetooth Headset', price: 1999 },
    { id: 2, name: 'Smart Fitness Band Pro', price: 2499 },
    { id: 3, name: 'Ergonomic Wireless Mouse', price: 799 },
    { id: 4, name: 'Mechanical Gaming Keyboard', price: 3200 }
];
let cCount = 0;
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2000); }
function renderCatalog(list) {
    document.getElementById('catalogGrid').innerHTML = list.map(item => `
        <div class="card">
            <h4>${item.name}</h4>
            <div class="price">₹${item.price}</div>
            <button class="btn" onclick="addToCart('${item.name}')">Add to Cart</button>
        </div>
    `).join('');
}
function filterCatalog() {
    const q = document.getElementById('pSearch').value.toLowerCase();
    renderCatalog(catalog.filter(x => x.name.toLowerCase().includes(q)));
}
function addToCart(n) { cCount++; document.getElementById('cartCount').innerText = cCount; showToast(`Added ${n} to cart.`); }
window.addEventListener('DOMContentLoaded', () => renderCatalog(catalog));