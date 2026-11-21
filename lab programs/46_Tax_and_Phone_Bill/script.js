function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function switchGov(tab) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    if (tab === 'tax') {
        document.querySelector('[onclick*="tax"]').classList.add('active');
        document.getElementById('taxSection').classList.add('active');
    } else {
        document.querySelector('[onclick*="phone"]').classList.add('active');
        document.getElementById('phoneSection').classList.add('active');
    }
}

// Exactly implements PDF formula:
// Net Taxable = (Gross * 12) - (HRA * 12) - (Std Deduction 50,000) - (Pension max 150,000) - (Health Insurance * 12)
// Slabs:
// < 500,000: Tax Nil
// 0 - 250,000: 0
// 250,001 - 500,000: 5%
// 500,001 - 1,000,000: 12,500 + 20%
// > 1,000,000: 112,500 + 30%
function calcTax(e) {
    e.preventDefault();
    const grossAnnual = parseFloat(document.getElementById('grossPay').value) * 12;
    const hraAnnual = parseFloat(document.getElementById('hraPay').value) * 12;
    const stdDed = 50000;
    const pension = Math.min(150000, parseFloat(document.getElementById('pension80C').value));
    const healthIns = parseFloat(document.getElementById('healthIns').value) * 12;

    const netTaxable = Math.max(0, grossAnnual - hraAnnual - stdDed - pension - healthIns);
    let tax = 0;
    let slabExplanation = '';

    if (netTaxable < 500000) {
        tax = 0;
        slabExplanation = 'Net taxable income is below ₹5,00,000 → Tax Liability is NIL (Full Rebate).';
    } else {
        if (netTaxable <= 500000) {
            tax = 0.05 * (netTaxable - 250000);
            slabExplanation = '5% on income between ₹2.5L and ₹5L';
        } else if (netTaxable <= 1000000) {
            tax = 12500 + (0.20 * (netTaxable - 500000));
            slabExplanation = '₹12,500 + 20% on excess over ₹5,00,000';
        } else {
            tax = 112500 + (0.30 * (netTaxable - 1000000));
            slabExplanation = '₹1,12,500 + 30% on excess over ₹10,00,000';
        }
    }

    document.getElementById('taxResult').innerHTML = `
        <div class="result-box">
            <h4 style="color:#0284c7; margin-bottom:8px;">Annual Income Tax Computation Statement</h4>
            <p>Annual Gross Earnings: ₹${grossAnnual.toLocaleString('en-IN')}</p>
            <p>Total Deductions (HRA + Std + 80C + Health): ₹${(hraAnnual + stdDed + pension + healthIns).toLocaleString('en-IN')}</p>
            <p><strong>Net Taxable Income: ₹${netTaxable.toLocaleString('en-IN')}</strong></p>
            <p style="font-size:0.85rem; color:#64748b;">Slab Breakdown: ${slabExplanation}</p>
            <h2 style="color:#0f172a; margin:10px 0;">Total Tax Payable: ₹${tax.toLocaleString('en-IN')}</h2>
            <p style="font-size:0.85rem; color:#16a34a; font-weight:bold;">Net Annual In-Hand: ₹${(grossAnnual - tax).toLocaleString('en-IN')}</p>
        </div>
    `;
}

// Exactly implements PDF phone bill fine calculation:
// Each date after last date Rs. 10 will be added as fine
function calcPhoneBill(e) {
    e.preventDefault();
    const plan = parseFloat(document.getElementById('planAmt').value);
    const due = new Date(document.getElementById('dueDate').value);
    const pay = new Date(document.getElementById('payDate').value);
    const diffTime = pay.getTime() - due.getTime();
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const fine = diffDays * 10;
    const total = plan + fine;

    document.getElementById('phoneResult').innerHTML = `
        <div class="result-box">
            <h4 style="color:#059669; margin-bottom:8px;">Phone Bill Payment Summary</h4>
            <p>Monthly Rental Plan: ₹${plan}</p>
            <p>Days Past Due Date: ${diffDays} Days</p>
            <p style="color:#e11d48;">Late Payment Fine (₹10/day): ₹${fine}</p>
            <h2 style="color:#0f172a; margin:10px 0;">Total Amount Due: ₹${total}</h2>
            <button class="btn btn-secondary" onclick="showToast('✓ Payment of ₹${total} confirmed! Receipt emailed.')">Confirm Payment Online</button>
        </div>
    `;
}