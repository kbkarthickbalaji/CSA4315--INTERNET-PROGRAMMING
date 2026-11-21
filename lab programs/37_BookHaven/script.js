const books = [
    { id: 1, title: 'Web Technologies: A Computer Science Perspective', author: 'Jeffrey C. Jackson', price: 650 },
    { id: 2, title: 'JavaScript: The Definitive Guide', author: 'David Flanagan', price: 890 },
    { id: 3, title: 'Internet & World Wide Web How to Program', author: 'Paul Deitel & Harvey Deitel', price: 780 }
];
let count = 0;
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2200); }
function renderBooks() {
    document.getElementById('bookGrid').innerHTML = books.map(b => `
        <div class="book-card">
            <div>
                <h4>${b.title}</h4>
                <small style="color:#64748b;">By ${b.author}</small>
            </div>
            <div>
                <div class="book-price">₹${b.price}</div>
                <button class="btn" onclick="addBook('${b.title}')">Add to Cart</button>
            </div>
        </div>
    `).join('');
}
function addBook(t) { count++; document.getElementById('cartCount').innerText = count; showToast(`Added "${t}" to cart.`); }
function checkoutBooks() { if(!count){showToast('Cart is empty.');return;} showToast('Order placed successfully! Delivery within 48 hours.'); count=0; document.getElementById('cartCount').innerText = 0; }
window.addEventListener('DOMContentLoaded', renderBooks);