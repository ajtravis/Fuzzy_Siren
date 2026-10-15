(function () {
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

  // Forms: post to the endpoint in data-endpoint (e.g. Formspree) if configured,
  // otherwise fall back to opening the visitor's mail client.
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var endpoint = form.getAttribute('data-endpoint') || '';
    var configured = endpoint && endpoint.indexOf('REPLACE_ME') === -1;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.honey input') && form.querySelector('.honey input').value) return;
      var data = new FormData(form);

      if (!configured) {
        var subject = encodeURIComponent(form.getAttribute('data-subject') || 'Message from fuzzysiren.com');
        var lines = [];
        data.forEach(function (v, k) { if (k !== '_gotcha') lines.push(k + ': ' + v); });
        window.location.href = 'mailto:' + (form.getAttribute('data-mailto') || 'ajt@fuzzysiren.com') +
          '?subject=' + subject + '&body=' + encodeURIComponent(lines.join('\n'));
        setStatus('Opening your email app\u2026', 'ok');
        return;
      }

      setStatus('Sending\u2026', '');
      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); form.reset(); setStatus(form.getAttribute('data-success') || 'Thanks \u2014 we got it.', 'ok'); })
        .catch(function () { setStatus('Something went wrong. Please email ajt@fuzzysiren.com instead.', 'err'); });
    });

    function setStatus(msg, cls) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status ' + cls;
    }
  });
})();
