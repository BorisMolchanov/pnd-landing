/* Лендинг «Трубы ПНД и гофра оптом»: каталог, сбор КП в заявку, окно «Запросить прайс»,
   подмена заголовка по ключевой фразе из Директа, цели Яндекс Метрики. */
(function () {
  'use strict';

  /* ---------- Настройки ---------- */
  // Номер счётчика Яндекс Метрики. Пока null — счётчик не загружается, цели не отправляются.
  var METRIKA_ID = null;
  // Сколько позиций каталога показывать на телефоне до кнопки «Показать все».
  var MOBILE_ROWS = 4;

  /* ---------- Яндекс Метрика ---------- */
  if (METRIKA_ID) {
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.ym(METRIKA_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  }
  // Цели: lead_submit, spec_upload, price_request, kp_send, phone_click, email_click
  function goal(name) {
    if (METRIKA_ID && typeof window.ym === 'function') window.ym(METRIKA_ID, 'reachGoal', name);
  }

  /* ---------- Данные каталога ----------
     Масса 1 м — расчётная по ГОСТ 18599-2001: средняя толщина стенки, плотность 950 кг/м³.
     Наличие — ориентир: in = обычно в наличии на заводе, order = под заказ. Уточняется в КП. */
  function R(id, name, code, d, size, cls, clsText, pack, extra, st, potable) {
    return { id: id, name: name, code: code, d: d, size: size, cls: cls, clsText: clsText, pack: pack, extra: extra, st: st, potable: !!potable };
  }

  var DATA = {
    pnd: {
      head: ['Позиция', 'Ø × e, мм', 'SDR / PN', 'Поставка', 'Масса 1 м, кг', 'Наличие'],
      dia: [['Все', 0, 9999], ['20–63', 20, 63], ['75–110', 75, 110], ['125–225', 125, 225], ['250–630', 250, 630]],
      clsLabel: 'SDR', cls: ['Все', 'SDR 11', 'SDR 17', 'SDR 21', 'SDR 26'],
      icon: 'pipe',
      short: function (r) { return 'ПНД ' + r.size + ' ' + r.cls; },
      rows: [
        R('p1', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 32, '32 × 3,0', 'SDR 11', 'SDR 11 / PN 16', 'бухта 200 м', '0,28', 'in', true),
        R('p2', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 63, '63 × 5,8', 'SDR 11', 'SDR 11 / PN 16', 'бухта 100 м', '1,04', 'in', true),
        R('p3', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 110, '110 × 6,6', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '2,15', 'in', true),
        R('p4', 'Труба ПЭ100 техническая', 'ГОСТ 18599 · техническая', 110, '110 × 10,0', 'SDR 11', 'SDR 11 / PN 16', 'отрезок 12 м', '3,13', 'order', false),
        R('p5', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 160, '160 × 9,5', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '4,50', 'in', true),
        R('p6', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 225, '225 × 13,4', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '8,90', 'in', true),
        R('p7', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 315, '315 × 18,7', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '17,4', 'order', true),
        R('p8', 'Труба ПЭ100 техническая', 'ГОСТ 18599 · техническая', 400, '400 × 15,3', 'SDR 26', 'SDR 26 / PN 6,3', 'отрезок 12 м', '18,5', 'order', false)
      ]
    },
    kan: {
      head: ['Позиция', 'Ø нар., мм', 'Кольцевая жёсткость', 'Поставка', 'Соединение', 'Наличие'],
      dia: [['Все', 0, 9999], ['110–200', 110, 200], ['250–400', 250, 400], ['500–1200', 500, 1200]],
      clsLabel: 'Класс', cls: ['Все', 'SN 4', 'SN 8', 'SN 16'],
      icon: 'corr',
      short: function (r) { return 'Гофра Ø' + r.size + ' ' + r.cls; },
      rows: [
        R('k1', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 110, '110', 'SN 4', 'SN 4', 'отрезок 6 м', 'раструб + кольцо', 'in'),
        R('k2', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 160, '160', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', 'in'),
        R('k3', 'Гофротруба двухслойная ПНД', 'ГОСТ Р 54475-2011', 200, '200', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', 'in'),
        R('k4', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 315, '315', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', 'in'),
        R('k5', 'Гофротруба двухслойная ПНД', 'ГОСТ Р 54475-2011', 400, '400', 'SN 16', 'SN 16', 'отрезок 6 м', 'раструб + кольцо', 'order'),
        R('k6', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 500, '500', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', 'order')
      ]
    },
    cab: {
      head: ['Позиция', 'Ø нар., мм', 'Прочность на сжатие', 'Поставка', 'Комплектация', 'Наличие'],
      dia: [['Все', 0, 9999], ['40–75', 40, 75], ['90–110', 90, 110], ['125–200', 125, 200]],
      clsLabel: 'Прочность', cls: ['Все', '450 Н', '750 Н'],
      icon: 'corr',
      short: function (r) { return 'Кабельная Ø' + r.size + ' ' + r.cls; },
      rows: [
        R('c1', 'Двустенная ПНД, гибкая', 'для кабеля в земле', 63, '63', '450 Н', '450 Н', 'бухта 50 м', 'с протяжкой', 'in'),
        R('c2', 'Двустенная ПНД, гибкая', 'для кабеля в земле', 110, '110', '450 Н', '450 Н', 'бухта 50 м', 'с протяжкой', 'in'),
        R('c3', 'Двустенная ПНД, жёсткая', 'для кабеля в земле', 110, '110', '750 Н', '750 Н', 'отрезок 6 м', 'с муфтой', 'in'),
        R('c4', 'Двустенная ПНД, жёсткая', 'для кабеля в земле', 160, '160', '750 Н', '750 Н', 'отрезок 6 м', 'с муфтой', 'order'),
        R('c5', 'Двустенная ПНД, жёсткая', 'для кабеля в земле', 200, '200', '750 Н', '750 Н', 'отрезок 6 м', 'с муфтой', 'order')
      ]
    },
    fit: {
      head: ['Позиция', 'Ø, мм', 'SDR / класс', 'Упаковка', 'Соединение', 'Наличие'],
      dia: [['Все', 0, 9999], ['20–63', 20, 63], ['75–160', 75, 160], ['200–630', 200, 630]],
      clsLabel: 'Соединение', cls: ['Все', 'Компрессия', 'Электромуфта', 'Стыковая сварка', 'Фланец', 'Раструб'],
      icon: 'fit',
      short: function (r) { return r.name + ' Ø' + r.size; },
      rows: [
        R('f1', 'Муфта компрессионная ПП', 'для ПНД Ø32', 32, '32', 'Компрессия', 'PN 16', 'упаковка', 'компрессия', 'in'),
        R('f2', 'Отвод 90° литой', 'для ПНД SDR 17', 110, '110', 'Стыковая сварка', 'SDR 17', 'поштучно', 'стыковая', 'in'),
        R('f3', 'Муфта электросварная', 'для ПНД SDR 11–17', 160, '160', 'Электромуфта', 'SDR 11', 'поштучно', 'электромуфта', 'in'),
        R('f4', 'Тройник литой равнопроходной', 'для ПНД SDR 17', 110, '110', 'Стыковая сварка', 'SDR 17', 'поштучно', 'стыковая', 'in'),
        R('f5', 'Втулка под фланец + фланец', 'комплект, Ру 10', 225, '225', 'Фланец', 'SDR 17', 'комплект', 'фланцевое', 'order'),
        R('f6', 'Муфта для гофры + кольцо', 'для гофры SN 8', 160, '160', 'Раструб', 'SN 8', 'поштучно', 'раструб', 'in')
      ]
    }
  };

  var STATUS = { in: 'обычно в наличии', order: 'под заказ' };

  var ICON = {
    pipe: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2530" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="6"/></svg>',
    corr: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2530" aria-hidden="true"><circle cx="12" cy="12" r="9.5" stroke-width="2.4" stroke-dasharray="1.8 1.4"/><circle cx="12" cy="12" r="5.5" stroke-width="1.5"/></svg>',
    fit: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2530" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 21v-7a10 10 0 0 1 10-10h7"/><path d="M9 21v-7a5 5 0 0 1 5-5h7"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };

  var state = { tab: 'pnd', dia: 0, cls: 0, q: '', sel: {}, expanded: false };
  var mobile = window.matchMedia('(max-width: 767px)');

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) { return String(s).toLowerCase().replace(/[×x*ø]/g, ' ').replace(/ё/g, 'е'); }
  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  function shortById() {
    var map = {};
    Object.keys(DATA).forEach(function (k) {
      DATA[k].rows.forEach(function (r) { map[r.id] = DATA[k].short(r); });
    });
    return map;
  }

  /* ---------- Каталог ---------- */
  function filteredRows() {
    var t = DATA[state.tab];
    var rng = t.dia[state.dia] || t.dia[0];
    var clsSel = t.cls[state.cls];
    var tokens = norm(state.q).split(/\s+/).filter(Boolean);
    return t.rows.filter(function (r) {
      if (r.d < rng[1] || r.d > rng[2]) return false;
      if (state.cls !== 0 && r.cls !== clsSel) return false;
      if (tokens.length) {
        var hay = norm([r.name, r.code, r.size, r.clsText, r.pack, r.extra].join(' '));
        for (var i = 0; i < tokens.length; i++) if (hay.indexOf(tokens[i]) === -1) return false;
      }
      return true;
    });
  }

  function chipsHtml(items, group, active) {
    return items.map(function (label, i) {
      return '<button type="button" class="chip" data-group="' + group + '" data-i="' + i + '" aria-pressed="' + (i === active) + '">' + esc(label) + '</button>';
    }).join('');
  }

  function rowHtml(r, t) {
    var on = !!state.sel[r.id];
    var h = t.head;
    return '' +
      '<div class="tr' + (on ? ' is-selected' : '') + '" role="row">' +
        '<div class="td td-name" role="cell">' +
          '<span class="row-icon">' + ICON[t.icon] + '</span>' +
          '<span class="name-wrap"><span class="name">' + esc(r.name) + '</span>' +
          '<span class="code">' + (r.potable ? '<span class="potable" title="Питьевая: синяя полоса"></span>' : '') + esc(r.code) + '</span></span>' +
        '</div>' +
        '<div class="td td-size" role="cell" data-label="' + esc(h[1]) + '">' + esc(r.size) + '</div>' +
        '<div class="td" role="cell" data-label="' + esc(h[2]) + '">' + esc(r.clsText) + '</div>' +
        '<div class="td td-soft" role="cell" data-label="' + esc(h[3]) + '">' + esc(r.pack) + '</div>' +
        '<div class="td td-mono" role="cell" data-label="' + esc(h[4]) + '">' + esc(r.extra) + '</div>' +
        '<div class="td" role="cell" data-label="' + esc(h[5]) + '">' +
          '<span class="status status-' + r.st + '"><i aria-hidden="true"></i>' + STATUS[r.st] + '</span>' +
        '</div>' +
        '<div class="td td-action" role="cell">' +
          '<button type="button" class="btn-kp" data-id="' + r.id + '" aria-pressed="' + on + '" aria-label="' + esc((on ? 'Убрать из КП: ' : 'Добавить в КП: ') + t.short(r)) + '">' +
            (on ? ICON.check + 'В КП' : ICON.plus + (r.st === 'order' ? 'Запросить' : 'В КП')) +
          '</button>' +
        '</div>' +
      '</div>';
  }

  function renderCatalog() {
    var t = DATA[state.tab];

    $$('.cat-card').forEach(function (b) {
      var on = b.getAttribute('data-tab') === state.tab;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    $('#dia-chips').innerHTML = chipsHtml(t.dia.map(function (d) { return d[0]; }), 'dia', state.dia);
    $('#cls-chips').innerHTML = chipsHtml(t.cls, 'cls', state.cls);
    $('#cls-label').textContent = t.clsLabel;

    $('#thead').innerHTML = t.head.map(function (c) {
      return '<span role="columnheader">' + esc(c) + '</span>';
    }).join('') + '<span role="columnheader" class="sr-only">Действие</span>';

    var rows = filteredRows();
    var limit = mobile.matches && !state.expanded && rows.length > MOBILE_ROWS;
    var shown = limit ? rows.slice(0, MOBILE_ROWS) : rows;
    $('#rows').innerHTML = shown.map(function (r) { return rowHtml(r, t); }).join('');
    $('#empty').hidden = rows.length > 0;
    $('#more-wrap').hidden = !limit;
    $('#more').textContent = 'Показать все позиции: ' + rows.length;

    renderKp();
  }

  function renderKp() {
    var names = shortById();
    var ids = Object.keys(state.sel);
    var n = ids.length;
    $('#kp').classList.toggle('is-empty', n === 0);
    $('#kp-count').textContent = String(n);
    $('#kp-title').textContent = n === 0
      ? 'Отметьте позиции — соберём КП одним списком'
      : n + ' ' + plural(n, 'позиция', 'позиции', 'позиций') + ' в КП';
    $('#kp-sub').textContent = n === 0
      ? 'Трубы, гофра и фитинги — в одном счёте и одной машине'
      : ids.slice(0, 3).map(function (id) { return names[id]; }).join(' · ') + (n > 3 ? ' и ещё ' + (n - 3) : '');
    $('#kp-status').hidden = true;
  }

  function bindCatalog() {
    $$('.cat-card').forEach(function (b) {
      b.addEventListener('click', function () {
        state.tab = b.getAttribute('data-tab');
        state.dia = 0;
        state.cls = 0;
        state.expanded = false;
        renderCatalog();
      });
    });

    $('.filters').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state[chip.getAttribute('data-group')] = Number(chip.getAttribute('data-i'));
      renderCatalog();
    });

    $('#q').addEventListener('input', function (e) {
      state.q = e.target.value;
      renderCatalog();
    });

    $('#rows').addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-kp');
      if (!btn) return;
      var id = btn.getAttribute('data-id');
      if (state.sel[id]) delete state.sel[id]; else state.sel[id] = true;
      renderCatalog();
      var again = $('.btn-kp[data-id="' + id + '"]');
      if (again) again.focus();
    });

    $('#reset').addEventListener('click', function () {
      state.dia = 0;
      state.cls = 0;
      state.q = '';
      $('#q').value = '';
      renderCatalog();
    });

    $('#more').addEventListener('click', function () {
      state.expanded = true;
      renderCatalog();
    });

    var onChange = function () { renderCatalog(); };
    if (mobile.addEventListener) mobile.addEventListener('change', onChange); else mobile.addListener(onChange);

    // «Отправить на расчёт»: позиции переносятся в основную заявку — форма на странице одна
    $('#kp-send').addEventListener('click', function () {
      var ids = Object.keys(state.sel);
      if (ids.length === 0) {
        var status = $('#kp-status');
        status.textContent = 'Сначала отметьте позиции в таблице кнопкой «В КП».';
        status.hidden = false;
        return;
      }
      var names = shortById();
      var list = ids.map(function (id) { return names[id]; });
      $('#items').value = list.join('; ');
      $('#form-items-text').textContent = list.length + ' ' + plural(list.length, 'позиция', 'позиции', 'позиций') + ' из каталога: ' + list.join(', ');
      $('#form-items').hidden = false;
      goal('kp_send');
      $('#lead-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { $('#contact').focus({ preventScroll: true }); }, 500);
    });

    $('#form-items-clear').addEventListener('click', function () {
      $('#items').value = '';
      $('#form-items').hidden = true;
    });
  }

  /* ---------- Формы. Демо: данные никуда не отправляются ---------- */
  function validate(form, contactInput) {
    var status = $('.form-status', form);
    var consent = form.elements.consent.checked;
    if (!contactInput.value.trim()) {
      status.textContent = 'Укажите телефон или e-mail — на него придёт ответ.';
    } else if (!consent) {
      status.textContent = 'Отметьте согласие на обработку персональных данных.';
    } else {
      status.hidden = false;
      return true;
    }
    status.hidden = false;
    return false;
  }

  function bindForms() {
    var spec = $('#spec');
    spec.addEventListener('change', function () {
      var f = spec.files && spec.files[0];
      $('#dz-title').textContent = f ? f.name : 'Загрузите спецификацию';
      spec.closest('.dropzone').classList.toggle('is-filled', !!f);
      if (f) goal('spec_upload');
    });

    $('#lead-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.currentTarget;
      if (validate(form, $('#contact'))) {
        $('.form-status', form).textContent = 'Демо-версия: заявка не отправлена. В рабочей версии она уходит в CRM, менеджер отвечает в рабочее время.';
        goal('lead_submit');
      }
    });

    // Окно «Запросить прайс»
    var dialog = $('#price-dialog');
    $$('[data-open-price]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        if (dialog && typeof dialog.showModal === 'function') {
          $('.form-status', dialog).hidden = true;
          dialog.showModal();
        } else {
          $('#lead-form').scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    $('#price-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    $('#price-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.currentTarget;
      if (validate(form, $('#price-contact'))) {
        $('.form-status', form).textContent = 'Демо-версия: запрос не отправлен. В рабочей версии менеджер пришлёт прайс в рабочее время.';
        goal('price_request');
      }
    });

    // Клики по телефону и почте
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
      if (!a) return;
      goal(a.getAttribute('href').indexOf('tel:') === 0 ? 'phone_click' : 'email_click');
    });
  }

  /* ---------- Заголовок под ключевую фразу ----------
     В ссылке объявления Директа: ?utm_term={keyword}. Из фразы берём только товарную группу
     и диаметр из списка — произвольный текст из адреса на страницу не попадает. */
  var DIAMETERS = [20, 25, 32, 40, 50, 63, 75, 90, 110, 125, 140, 160, 180, 200, 225, 250, 280, 315, 355, 400, 450, 500, 560, 630, 710, 800, 1000, 1200];

  function keywordHeadline() {
    var params = new URLSearchParams(window.location.search);
    var kw = norm(params.get('utm_term') || params.get('kw') || '');
    if (!kw) return;

    var group = null;
    if (/гофр/.test(kw)) group = /кабел/.test(kw) ? 'cab' : 'kan';
    else if (/фитинг|муфт|отвод|тройник|фланц/.test(kw)) group = 'fit';
    else if (/пнд|пэ|полиэтилен|труб/.test(kw)) group = 'pnd';
    if (!group) return;

    var d = null;
    (kw.match(/\d{2,4}/g) || []).some(function (n) {
      if (DIAMETERS.indexOf(Number(n)) !== -1) { d = Number(n); return true; }
      return false;
    });

    var titles = {
      pnd: 'Трубы ПНД',
      kan: 'Гофрированные трубы для канализации',
      cab: 'Гофра для кабеля',
      fit: 'Фитинги для труб ПНД'
    };
    var h1 = $('#hero-title');
    var lead = titles[group] + (d ? ' Ø' + d + ' мм' : '') + ' с завода-изготовителя — ';
    h1.textContent = lead;
    var em = document.createElement('em');
    em.textContent = 'дешевле заводского прайса';
    h1.appendChild(em);

    state.tab = group;
  }

  keywordHeadline();
  renderCatalog();
  bindCatalog();
  bindForms();
})();
