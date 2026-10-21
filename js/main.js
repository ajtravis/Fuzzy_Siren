(function () {
  // Mailing-list endpoint: the Google Apps Script web-app URL from docs/mailing-list-setup.md.
  // Leave empty until the sheet is set up; the form will show a friendly message instead.
  var SIGNUP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzxZuSpvfHZ6sEoxp8UWnCKb5B-2FPeLQy9mkn1gUBCbfFOhMK0-XU_c0LBttuFPwv7/exec';
  var CONTACT_EMAIL = 'ajt@fuzzysiren.com';

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Current year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mailing-list signup -> Google Sheet (via Apps Script)
  document.querySelectorAll('form[data-signup]').forEach(function (form) {
    var status = form.querySelector('.form-status') || (form.parentNode && form.parentNode.querySelector('.form-status'));
    var button = form.querySelector('button[type=submit]');
    var emailInput = form.querySelector('input[type=email]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var honey = form.querySelector('.honey input');
      if (honey && honey.value) return;

      var email = (emailInput.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('Please enter a valid email address.', 'err');
        return;
      }
      if (!SIGNUP_ENDPOINT) {
        setStatus('Signups open soon. In the meantime, email ' + CONTACT_EMAIL + ' and we\u2019ll add you.', 'err');
        return;
      }

      var body = new URLSearchParams({ email: email, source: location.pathname, ua: navigator.userAgent });
      setBusy(true);
      setStatus('Adding you\u2026', '');
      // Apps Script web apps respond via redirect without CORS headers, so use no-cors:
      // the response is opaque, but a resolved promise means the request was delivered.
      fetch(SIGNUP_ENDPOINT, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () {
          form.reset();
          setStatus(form.getAttribute('data-success') || 'You\u2019re on the list. Thanks!', 'ok');
        })
        .catch(function () {
          setStatus('Something went wrong. Please try again or email ' + CONTACT_EMAIL + '.', 'err');
        })
        .then(function () { setBusy(false); });
    });

    function setBusy(busy) { if (button) button.disabled = busy; }
    function setStatus(msg, cls) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status ' + cls;
    }
  });
})();
