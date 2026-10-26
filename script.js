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
  const progress = document.querySelector('.progress');
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      floats.forEach((f) => { f.style.setProperty('--py', `${y * Number(f.dataset.speed) * -1}px`); });
      progress.style.setProperty('--p', y / Math.max(1, document.documentElement.scrollHeight - innerHeight));
      ticking = false;
    });
  }, { passive: true });

  // 마우스를 따라 그림이 조금씩 움직인다
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5) * 2);
    hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5) * 2);
  });
  hero.addEventListener('pointerleave', () => { hero.style.setProperty('--mx', 0); hero.style.setProperty('--my', 0); });
})();

// 스크롤하면 구역마다 제목·카드가 차례로 나타난다
(() => {
  // 큰 제목은 단어가 끊기지 않게 단어 단위로 묶고 글자를 나눈다
  document.querySelectorAll('.display').forEach((h) => {
    const text = h.textContent.trim();
    h.setAttribute('aria-label', text);
    h.textContent = '';
    let i = 0;
    text.split(' ').forEach((w, wi) => {
      if (wi) h.append(' ');
      const word = document.createElement('span');
      word.className = 'word';
      word.setAttribute('aria-hidden', 'true');
      [...w].forEach((c) => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        s.style.setProperty('--i', i++);
        word.appendChild(s);
      });
      h.appendChild(word);
    });
  });

  const groups = [
    ['.panel__intro, .careers__note, .booking__intro p, .marquee', 'up'],
    ['.menu', 'tilt'],
    ['.menu__list li', 'up'],
    ['.practice__card, .timeline li, .info-card', 'pop'],
    ['.careers li:nth-child(odd)', 'left'],
    ['.careers li:nth-child(even)', 'right'],
    ['.host', 'left'],
    ['.reviews', 'right'],
    ['.ticket', 'tilt'],
    ['.footer__mark, .footer__cols > div', 'up'],
  ];
  groups.forEach(([sel, kind]) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.dataset.reveal = kind;
      // 같은 줄에 있는 형제끼리 순서대로 늦게 나오게 한다
      el.style.setProperty('--i', [...el.parentElement.children].indexOf(el) % 6);
    });
  });

  const targets = document.querySelectorAll('.display, [data-reveal]');
  if (!('IntersectionObserver' in window)) return targets.forEach((el) => el.classList.add('is-in'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  targets.forEach((el) => io.observe(el));
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
    if (!data.name || !data.contact) return say('Please enter your name and contact details.', true);
    if (!data.consent) return say('Please agree to the use of your personal information.', true);

    btn.disabled = true;
    say('Sending…');
    try {
      const r = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || "We couldn't send your request. Please try again in a moment.");
      form.reset();
      say("Your consultation request is in. We'll review it and get back to you.");
    } catch (err) {
      say(err.message || "We couldn't send your request. Please try again in a moment.", true);
    } finally {
      btn.disabled = false;
    }
  });
})();
