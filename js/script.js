// Simple interactions for the home page
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Modal controls
  const modal = document.getElementById('modal');
  const openButtons = [document.getElementById('bookBtn'), document.getElementById('bookBtn2')];
  const closeModal = document.getElementById('closeModal');
  const backdrop = document.getElementById('modalBackdrop');

  function showModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    // focus first input
    const first = modal.querySelector('input, select, textarea, button');
    if (first) first.focus();
  }
  function hideModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  openButtons.forEach(btn => {
    if (btn) btn.addEventListener('click', showModal);
  });
  if (closeModal) closeModal.addEventListener('click', hideModal);
  if (backdrop) backdrop.addEventListener('click', hideModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
  });

  // Booking form confirm
  const bookingForm = document.getElementById('bookingForm');
  const confirmBtn = document.getElementById('confirmBooking');
  if (confirmBtn && bookingForm) {
    confirmBtn.addEventListener('click', () => {
      // Simple client-side validation
      const formData = new FormData(bookingForm);
      const patient = formData.get('patient') || '';
      const phone = formData.get('phone') || '';
      const dept = formData.get('department') || '';
      if (!patient || !phone || !dept) {
        alert('Please complete all booking fields.');
        return;
      }
      // Simulate success
      hideModal();
      showToast(`Appointment requested for ${patient} (${dept}). We'll contact you at ${phone}.`);
      bookingForm.reset();
    });
  }

  // Contact form send
  const contactForm = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendMessageBtn');
  if (sendBtn && contactForm) {
    sendBtn.addEventListener('click', () => {
      const fd = new FormData(contactForm);
      if (!fd.get('name') || !fd.get('email') || !fd.get('message')) {
        alert('Please complete all fields first.');
        return;
      }
      contactForm.reset();
      showToast('Thanks — we received your message and will be in touch shortly.');
    });
  }

  // Toast
  function showToast(msg = '') {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed',
      right: '18px',
      bottom: '18px',
      background: '#0f172a',
      color: '#fff',
      padding: '10px 14px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(2,6,23,0.3)',
      zIndex: 120,
      opacity: 0,
      transition: 'opacity .2s, transform .3s'
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = 1;
      t.style.transform = 'translateY(-6px)';
    });
    setTimeout(() => {
      t.style.opacity = 0;
      t.style.transform = '';
      setTimeout(() => t.remove(), 300);
    }, 3600);
  }
});
