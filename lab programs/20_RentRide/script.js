const fleet = [
    { id: 1, name: 'Hyundai i20', type: 'Hatchback (Petrol)', rate: 1400, deposit: 2000 },
    { id: 2, name: 'Honda City', type: 'Sedan (Automatic)', rate: 2200, deposit: 3000 },
    { id: 3, name: 'Mahindra Scorpio-N', type: 'SUV (7-Seater Diesel)', rate: 3200, deposit: 4000 },
    { id: 4, name: 'Royal Enfield Classic 350', type: 'Cruiser Bike', rate: 850, deposit: 1500 }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2200); }
function calcTotal() { renderFleet(); }
function renderFleet() {
    const days = parseInt(document.getElementById('rentDays').value) || 1;
    const driver = parseInt(document.getElementById('driverOpt').value) || 0;
    const grid = document.getElementById('fleetGrid');
    grid.innerHTML = '';
    fleet.forEach(v => {
        const total = (v.rate + driver) * days;
        grid.innerHTML += `
            <div class="car-card">
                <div>
                    <span class="car-type">${v.type}</span>
                    <h3>${v.name}</h3>
                    <p style="font-size:0.85rem; color:#64748b;">Refundable Deposit: ₹${v.deposit}</p>
                </div>
                <div>
                    <div class="car-price">₹${total} <small style="font-size:0.8rem; font-weight:normal;">for ${days} days</small></div>
                    <button class="btn" onclick="bookRide('${v.name}', ${total})">Book Vehicle Now</button>
                </div>
            </div>
        `;
    });
}
function bookRide(name, total) {
    showToast(`✓ Booking confirmed for ${name}! Voucher generated. Total: ₹${total}`);
}
window.addEventListener('DOMContentLoaded', renderFleet);