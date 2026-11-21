const packages = [
    { id: 1, title: 'Mystical Manali & Rohtang Pass', dur: '5 Days / 4 Nights', price: 14500, incl: 'Resort Stay, Paragliding, Meals' },
    { id: 2, title: 'Kerala Backwaters & Munnar Hills', dur: '4 Days / 3 Nights', price: 12900, incl: 'Houseboat Cruise, Tea Plantation Tour' },
    { id: 3, title: 'Golden Triangle: Delhi, Agra & Jaipur', dur: '6 Days / 5 Nights', price: 18500, incl: 'Taj Mahal Guided Entry, Heritage Palace' }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function renderPackages() {
    document.getElementById('tourGrid').innerHTML = packages.map(p => `
        <div class="tour-card">
            <span class="tour-dur">${p.dur}</span>
            <h3>${p.title}</h3>
            <p style="font-size:0.85rem; color:#64748b; margin:6px 0;">Includes: ${p.incl}</p>
            <div class="tour-price">₹${p.price.toLocaleString('en-IN')} <small style="font-size:0.75rem; font-weight:normal;">/ person</small></div>
            <button class="btn" onclick="bookTour('${p.title}')">Book Holiday Package</button>
        </div>
    `).join('');
}
function bookTour(t) { showToast(`✓ Booking initialized for ${t}! Executive will call with flight schedule.`); }
window.addEventListener('DOMContentLoaded', renderPackages);