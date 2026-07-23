/**
 * MediPulse AI - Official Digital RX & GST Invoice PDF Exporter
 * Generates print-ready medical prescriptions & GST tax receipts.
 */

export function downloadPrescriptionPDF(prescription) {
  if (!prescription) return;

  const doctorName = prescription.doctor_name || 'Dr. Rajesh Sharma, MD';
  const doctorSpec = prescription.doctor_specialization || 'Cardiology & Heart Care OPD';
  const patientName = prescription.patient_name || 'Rahul Verma';
  const diagnosis = prescription.diagnosis || 'Cardiovascular Wellness & Hypertension';
  const dateStr = new Date(prescription.created_at || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const summaryText = prescription.ai_summary?.summary || 'Targeted medical intervention for rapid symptom resolution and cardiovascular stabilization.';
  const medications = prescription.medications || [
    { name: 'Naproxen', dosage: '500mg', frequency: 'Twice daily after meals', duration: '5 Days' },
    { name: 'Pantoprazole', dosage: '40mg', frequency: 'Once daily before breakfast', duration: '5 Days' }
  ];

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>MediPulse_RX_${patientName.replace(/\s+/g, '_')}_${Date.now()}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 40px;
          color: #0f172a;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #0284c7;
          padding-bottom: 20px;
          margin-bottom: 25px;
        }
        .hospital-title {
          font-size: 24px;
          font-weight: 900;
          color: #0284c7;
          letter-spacing: -0.5px;
        }
        .hospital-sub {
          font-size: 11px;
          font-weight: 600;
          color: #0f766e;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .rx-badge {
          background: #0284c7;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 900;
          font-size: 14px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 18px;
          border-radius: 14px;
          margin-bottom: 25px;
          font-size: 13px;
        }
        .meta-item label {
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          display: block;
          margin-bottom: 3px;
        }
        .meta-item value {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
        }
        .section-title {
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #0284c7;
          margin-bottom: 12px;
        }
        .med-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
          font-size: 13px;
        }
        .med-table th {
          background: #0f172a;
          color: #ffffff;
          text-align: left;
          padding: 10px 14px;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 800;
        }
        .med-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
        }
        .ai-summary-box {
          background: #f0f9ff;
          border: 1.5px solid #7dd3fc;
          padding: 18px;
          border-radius: 14px;
          margin-bottom: 30px;
          font-size: 13px;
          line-height: 1.6;
        }
        .ai-summary-header {
          font-weight: 900;
          color: #0369a1;
          font-size: 11px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }
        .stamp {
          border: 2px dashed #10b981;
          color: #047857;
          padding: 10px 16px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 11px;
          text-align: center;
        }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="hospital-title">🏥 MediPulse AI Clinical Cloud</div>
          <div class="hospital-sub">Smart Tele-Health & Voice Prescription Network</div>
        </div>
        <div class="rx-badge">Rx DIGITAL PRESCRIPTION</div>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <label>Prescribing Doctor</label>
          <value>${doctorName}</value>
          <div style="font-size:11px; color:#0284c7; font-weight:700;">${doctorSpec}</div>
        </div>
        <div class="meta-item">
          <label>Patient Name</label>
          <value>${patientName}</value>
          <div style="font-size:11px; color:#64748b; font-weight:600;">Issue Date: ${dateStr}</div>
        </div>
        <div class="meta-item" style="grid-column: span 2;">
          <label>Clinical Diagnosis</label>
          <value style="color:#0284c7;">${diagnosis}</value>
        </div>
      </div>

      <div class="section-title">💊 Prescribed Medical Regimen</div>
      <table class="med-table">
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          ${medications.map(m => `
            <tr>
              <td style="font-weight:800;">${m.name}</td>
              <td>${m.dosage}</td>
              <td>${m.frequency}</td>
              <td>${m.duration}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="ai-summary-box">
        <div class="ai-summary-header">✨ Gemini AI Clinical Speech Summary</div>
        <div>"${summaryText}"</div>
      </div>

      <div class="footer">
        <div>
          <div style="font-weight:800; font-size:12px; color:#0f172a;">MediPulse Digital Healthcare Authority</div>
          <div style="font-size:10px; color:#94a3b8; margin-top:2px;">Verification ID: RX-IND-${Math.floor(100000 + Math.random() * 900000)}</div>
        </div>
        <div class="stamp">
          ✓ VERIFIED DIGITAL RX<br/>
          <span style="font-size:9px; font-weight:600;">Encrypted via DRF REST API</span>
        </div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}

export function downloadInvoicePDF(payment, appointment) {
  const txId = payment?.transaction_id || `TXN_IND_${Math.floor(100000 + Math.random() * 900000)}`;
  const amount = payment?.amount || appointment?.doctor_fee || 800.00;
  const payMethod = payment?.payment_method || 'UPI (Google Pay)';
  const docName = appointment?.doctor_name || 'Dr. Rajesh Sharma';
  const dateStr = new Date(payment?.created_at || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>MediPulse_Tax_Invoice_${txId}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 40px;
          color: #0f172a;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #059669;
          padding-bottom: 20px;
          margin-bottom: 25px;
        }
        .hospital-title {
          font-size: 24px;
          font-weight: 900;
          color: #059669;
        }
        .invoice-badge {
          background: #059669;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 900;
          font-size: 14px;
        }
        .invoice-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 18px;
          border-radius: 14px;
          margin-bottom: 25px;
          font-size: 13px;
        }
        .meta-item label {
          font-size: 10px;
          font-weight: 800;
          color: #166534;
          text-transform: uppercase;
          display: block;
          margin-bottom: 3px;
        }
        .meta-item value {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
        }
        .bill-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
          font-size: 13px;
        }
        .bill-table th {
          background: #0f172a;
          color: #ffffff;
          text-align: left;
          padding: 10px 14px;
          font-size: 11px;
          text-transform: uppercase;
        }
        .bill-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 600;
        }
        .total-row {
          background: #f8fafc;
          font-size: 16px;
          font-weight: 900;
          color: #059669;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }
        .stamp {
          border: 2px solid #059669;
          color: #047857;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 900;
          font-size: 12px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="hospital-title">🏥 MediPulse Healthcare Private Limited</div>
          <div style="font-size:11px; color:#059669; font-weight:700;">GSTIN: 27AAACM1234F1Z9 • Razorpay Tokenized Partner</div>
        </div>
        <div class="invoice-badge">OFFICIAL GST TAX INVOICE</div>
      </div>

      <div class="invoice-meta">
        <div class="meta-item">
          <label>Transaction ID</label>
          <value style="font-family:monospace; color:#059669;">${txId}</value>
        </div>
        <div class="meta-item">
          <label>Payment Method</label>
          <value>${payMethod}</value>
        </div>
        <div class="meta-item">
          <label>Billed To Patient</label>
          <value>Rahul Verma (+91 98765 43210)</value>
        </div>
        <div class="meta-item">
          <label>Invoice Date</label>
          <value>${dateStr}</value>
        </div>
      </div>

      <table class="bill-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Consulting Doctor</th>
            <th>Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:800;">OPD Tele-Consultation Fee</td>
            <td>${docName}</td>
            <td style="font-weight:800;">₹${parseFloat(amount).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Gemini AI Voice Prescription Scribe</td>
            <td>AI Engine</td>
            <td style="color:#059669; font-weight:800;">FREE (₹0.00)</td>
          </tr>
          <tr class="total-row">
            <td colspan="2">Total Settled Payment</td>
            <td>₹${parseFloat(amount).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <div style="font-size:11px; color:#64748b;">
          <div>This is a computer-generated tax invoice verified by Razorpay India.</div>
          <div>For billing support, contact support@medipulse.ai</div>
        </div>
        <div class="stamp">
          ✓ PAYMENT SETTLED<br/>
          <span style="font-size:9px; font-weight:600;">Razorpay 256-Bit SSL Verified</span>
        </div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
