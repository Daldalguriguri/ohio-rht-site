// 첫 화면: 글자를 하나씩 올리고, 떠 있는 그림은 스크롤에 따라 조금씩 움직인다
(() => {
  const hero = document.querySelector('.hero');
  document.querySelectorAll('[data-split]').forEach((line) => {
    const text = line.textContent;
    line.textContent = '';
    line.setAttribute('aria-label', text);
    [...text].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = c;
      s.style.transitionDelay = `${0.15 + i * 0.05 + (line.nextElementSibling ? 0 : 0.2)}s`;
      line.appendChild(s);
    });
  });
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const floats = [...document.querySelectorAll('.float')];
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      floats.forEach((f) => { f.style.setProperty('--py', `${y * Number(f.dataset.speed) * -1}px`); });
      ticking = false;
    });
  }, { passive: true });
})();

// 상담 예약 폼
(() => {
  const form = document.getElementById('booking-form');
  if (!form) return;
  const msg = form.querySelector('.ticket__msg');
  const btn = form.querySelector('button[type="submit"]');
  const say = (text, isError) => { msg.textContent = text; msg.classList.toggle('is-error', !!isError); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      contact: form.contact.value.trim(),
      preferred: form.preferred.value.trim(),
      consent: form.consent.checked,
      website: form.website.value,
    };
    if (!data.name || !data.contact) return say('이름과 연락처를 적어 주세요', true);
    if (!data.consent) return say('개인정보 수집·이용에 동의해 주세요', true);

    btn.disabled = true;
    say('보내는 중이에요…');
    try {
      const r = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || '보내지 못했어요. 잠시 뒤 다시 시도해 주세요.');
      form.reset();
      say('상담 예약이 접수됐어요. 확인 후 연락드릴게요.');
    } catch (err) {
      say(err.message || '보내지 못했어요. 잠시 뒤 다시 시도해 주세요.', true);
    } finally {
      btn.disabled = false;
    }
  });
})();
