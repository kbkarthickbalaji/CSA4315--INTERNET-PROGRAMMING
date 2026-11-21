const products = [
    { id: 1, name: 'BPT-5204 Paddy Seeds (25kg)', cat: 'Seeds', price: 1250, subsidy: '20% Subsidy' },
    { id: 2, name: 'Hybrid Cotton Bt-II Seeds', cat: 'Seeds', price: 950, subsidy: '15% Subsidy' },
    { id: 3, name: 'Bio-NPK Organic Fertilizer (50kg)', cat: 'Fertilizers', price: 680, subsidy: 'Govt Regulated' },
    { id: 4, name: 'Neem-Based Eco Pesticide (1L)', cat: 'Pesticides', price: 420, subsidy: 'Organic Scheme' },
    { id: 5, name: 'Battery Powered Knapsack Sprayer', cat: 'Tools', price: 2800, subsidy: '30% Subsidized' },
    { id: 6, name: 'Drip Irrigation Starter Kit (1 Acre)', cat: 'Tools', price: 4500, subsidy: 'PMKSY Approved' }
];
let cart = [];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2000); }
function toggleCart() { document.getElementById('cartDrawer').classList.toggle('open'); }
function filterProducts(cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderGrid(cat === 'All' ? products : products.filter(p => p.cat === cat));
}
function renderGrid(list) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    list.forEach(p => {
        grid.innerHTML += `
            <div class="prod-card">
                <div>
                    <span class="prod-cat">${p.cat}</span>
                    <h4>${p.name}</h4>
                    <span class="badge-subsidy">${p.subsidy}</span>
                </div>
                <div>
                    <div class="prod-price">₹${p.price}</div>
                    <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Basket</button>
                </div>
            </div>
        `;
    });
}
function addToCart(id) {
    const item = products.find(x => x.id === id);
    const inCart = cart.find(x => x.id === id);
    if (inCart) inCart.qty++; else cart.push({ ...item, qty: 1 });
    updateCartUI();
    showToast(`Added ${item.name} to basket`);
}
function updateCartUI() {
    const totalCount = cart.reduce((s, c) => s + c.qty, 0);
    const totalPrice = cart.reduce((s, c) => s + (c.price * c.qty), 0);
    document.getElementById('cartCount').innerText = totalCount;
    document.getElementById('cartTotal').innerText = '₹' + totalPrice;
    const body = document.getElementById('cartItems');
    body.innerHTML = cart.length ? '' : '<p style="color:#64748b;">Basket is empty.</p>';
    cart.forEach(c => {
        body.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <div><strong>${c.name}</strong><br><small>Qty: ${c.qty} × ₹${c.price}</small></div>
            <button onclick="removeFromCart(${c.id})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
        </div>`;
    });
}
function removeFromCart(id) { cart = cart.filter(x => x.id !== id); updateCartUI(); }
function checkout() {
    if (!cart.length) { showToast('Basket is empty!'); return; }
    showToast('Order confirmed! Subsidized invoice sent to registered mobile.');
    cart = [];
    updateCartUI();
    toggleCart();
}
window.addEventListener('DOMContentLoaded', () => renderGrid(products));