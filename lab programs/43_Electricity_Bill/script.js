function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function calcPowerBill(e) {
    e.preventDefault();
    const u = parseInt(document.getElementById('unitsCount').value) || 0;
    const cons = document.getElementById('consNo').value.trim();
    let bill = 0;
    let slabDesc = '';

    // Exactly as mandated in the syllabus / PDF:
    // 0 to 100 units = Free
    // 101 to 200 units = Rs. 2 per unit
    // 201 to 500 units = Rs. 4 per unit
    // > 500 units = Rs. 7 per unit
    if (u <= 100) {
        bill = 0;
        slabDesc = '0 to 100 Units @ Free (Govt Subsidy)';
    } else if (u <= 200) {
        bill = (u - 100) * 2;
        slabDesc = 'First 100 Units Free + ' + (u - 100) + ' Units @ ₹2/unit';
    } else if (u <= 500) {
        bill = (100 * 2) + ((u - 200) * 4);
        slabDesc = 'First 100 Free + 100 Units @ ₹2 + ' + (u - 200) + ' Units @ ₹4/unit';
    } else {
        bill = (100 * 2) + (300 * 4) + ((u - 500) * 7);
        slabDesc = 'First 100 Free + 100 @ ₹2 + 300 @ ₹4 + ' + (u - 500) + ' Units @ ₹7/unit';
    }

    document.getElementById('billResult').innerHTML = `
        <div class="receipt-box">
            <div style="display:flex; justify-content:space-between; font-weight:bold;">
                <span>ELECTRICITY BOARD DEMAND NOTE</span>
                <span>Consumer: ${cons}</span>
            </div>
            <p style="margin:8px 0;">Units Consumed: <strong>${u} Units</strong></p>
            <p style="font-size:0.85rem; color:#854d0e;">Calculation: ${slabDesc}</p>
            <h2 style="color:#ca8a04; margin:10px 0;">Payable Amount: ₹${bill}</h2>
            <button class="btn-primary" onclick="showToast('✓ Payment of ₹${bill} successful! Official receipt downloaded.')">Pay Bill via UPI / Card</button>
        </div>
    `;
}