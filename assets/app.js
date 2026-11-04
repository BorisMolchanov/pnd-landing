/* Концепт-лендинг «Трубы ПНД и гофра оптом»: каталог с остатками, сбор КП, зоны доставки, демо-формы. */
(function () {
  'use strict';

  /* ---------- Данные каталога. Цифры в [скобках] — заглушки, заменить на реальные остатки ---------- */
  function R(id, name, code, d, size, cls, clsText, pack, extra, stock, st, potable) {
    return { id: id, name: name, code: code, d: d, size: size, cls: cls, clsText: clsText, pack: pack, extra: extra, stock: stock, st: st, potable: !!potable };
  }

  var DATA = {
    pnd: {
      head: ['Позиция', 'Ø × e, мм', 'SDR / PN', 'Поставка', 'Масса 1 м, кг', 'Наличие', 'Цена от*'],
      dia: [['Все', 0, 9999], ['20–63', 20, 63], ['75–110', 75, 110], ['125–225', 125, 225], ['250–630', 250, 630]],
      clsLabel: 'SDR', cls: ['Все', 'SDR 11', 'SDR 17', 'SDR 21', 'SDR 26'],
      unit: '₽/м', priceNote: 'от [5] т', icon: 'pipe',
      short: function (r) { return 'ПНД ' + r.size + ' ' + r.cls; },
      rows: [
        R('p1', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 32, '32 × 3,0', 'SDR 11', 'SDR 11 / PN 16', 'бухта 200 м', '[0,27]', '[18] км', 'in', true),
        R('p2', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 63, '63 × 5,8', 'SDR 11', 'SDR 11 / PN 16', 'бухта 100 м', '[1,0]', '[6,4] км', 'in', true),
        R('p3', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 110, '110 × 6,6', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '[2,1]', '[85] т', 'in', true),
        R('p4', 'Труба ПЭ100 техническая', 'ГОСТ 18599 · техническая', 110, '110 × 10,0', 'SDR 11', 'SDR 11 / PN 16', 'отрезок 12 м', '[3,1]', '[12] т', 'part', false),
        R('p5', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 160, '160 × 9,5', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '[4,4]', '[64] т', 'in', true),
        R('p6', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 225, '225 × 13,4', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '[8,7]', '[31] т', 'in', true),
        R('p7', 'Труба ПЭ100 питьевая', 'ГОСТ 18599 · питьевая', 315, '315 × 18,7', 'SDR 17', 'SDR 17 / PN 10', 'отрезок 12 м', '[17,1]', '—', 'order', true),
        R('p8', 'Труба ПЭ100 техническая', 'ГОСТ 18599 · техническая', 400, '400 × 15,3', 'SDR 26', 'SDR 26 / PN 6,3', 'отрезок 12 м', '[18,3]', '[9] т', 'part', false)
      ]
    },
    kan: {
      head: ['Позиция', 'Ø нар., мм', 'Кольцевая жёсткость', 'Поставка', 'Соединение', 'Наличие', 'Цена от*'],
      dia: [['Все', 0, 9999], ['110–200', 110, 200], ['250–400', 250, 400], ['500–1200', 500, 1200]],
      clsLabel: 'Класс', cls: ['Все', 'SN 4', 'SN 8', 'SN 16'],
      unit: '₽/м', priceNote: 'от [500] м', icon: 'corr',
      short: function (r) { return 'Гофра Ø' + r.size + ' ' + r.cls; },
      rows: [
        R('k1', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 110, '110', 'SN 4', 'SN 4', 'отрезок 6 м', 'раструб + кольцо', '[1 600] м', 'in'),
        R('k2', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 160, '160', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', '[2 400] м', 'in'),
        R('k3', 'Гофротруба двухслойная ПНД', 'ГОСТ Р 54475-2011', 200, '200', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', '[1 800] м', 'in'),
        R('k4', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 315, '315', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', '[1 120] м', 'in'),
        R('k5', 'Гофротруба двухслойная ПНД', 'ГОСТ Р 54475-2011', 400, '400', 'SN 16', 'SN 16', 'отрезок 6 м', 'раструб + кольцо', '[540] м', 'part'),
        R('k6', 'Гофротруба двухслойная ПП', 'ГОСТ Р 54475-2011', 500, '500', 'SN 8', 'SN 8', 'отрезок 6 м', 'раструб + кольцо', '—', 'order')
      ]
    },
    cab: {
      head: ['Позиция', 'Ø нар., мм', 'Прочность на сжатие', 'Поставка', 'Комплектация', 'Наличие', 'Цена от*'],
      dia: [['Все', 0, 9999], ['40–75', 40, 75], ['90–110', 90, 110], ['125–200', 125, 200]],
      clsLabel: 'Прочность', cls: ['Все', '450 Н', '750 Н'],
      unit: '₽/м', priceNote: 'от [1] км', icon: 'corr',
      short: function (r) { return 'Кабельная Ø' + r.size + ' ' + r.cls; },
      rows: [
        R('c1', 'Двустенная ПНД, гибкая', 'для кабеля в земле', 63, '63', '450 Н', '450 Н', 'бухта 50 м', 'с протяжкой', '[12] км', 'in'),
        R('c2', 'Двустенная ПНД, гибкая', 'для кабеля в земле', 110, '110', '450 Н', '450 Н', 'бухта 50 м', 'с протяжкой', '[8,5] км', 'in'),
        R('c3', 'Двустенная ПНД, жёсткая', 'для кабеля в земле', 110, '110', '750 Н', '750 Н', 'отрезок 6 м', 'с муфтой', '[3,2] км', 'in'),
        R('c4', 'Двустенная ПНД, жёсткая', 'для кабеля в земле', 160, '160', '750 Н', '750 Н', 'отрезок 6 м', 'с муфтой', '[2,1] км', 'part'),
        R('c5', 'Двустенная ПНД, жёсткая', 'для кабеля в земле', 200, '200', '750 Н', '750 Н', 'отрезок 6 м', 'с муфтой', '—', 'order')
      ]
    },
    fit: {
      head: ['Позиция', 'Ø, мм', 'SDR / класс', 'Упаковка', 'Соединение', 'Наличие', 'Цена от*'],
      dia: [['Все', 0, 9999], ['20–63', 20, 63], ['75–160', 75, 160], ['200–630', 200, 630]],
      clsLabel: 'Соединение', cls: ['Все', 'Компрессия', 'Электромуфта', 'Стыковая сварка', 'Фланец', 'Раструб'],
      unit: '₽/шт', priceNote: 'от [50] шт', icon: 'fit',
      short: function (r) { return r.name + ' Ø' + r.size; },
      rows: [
        R('f1', 'Муфта компрессионная ПП', 'для ПНД Ø32', 32, '32', 'Компрессия', 'PN 16', 'упак. [20] шт', 'компрессия', '[1 400] шт', 'in'),
        R('f2', 'Отвод 90° литой', 'для ПНД SDR 17', 110, '110', 'Стыковая сварка', 'SDR 17', 'поштучно', 'стыковая', '[320] шт', 'in'),
        R('f3', 'Муфта электросварная', 'для ПНД SDR 11–17', 160, '160', 'Электромуфта', 'SDR 11', 'поштучно', 'электромуфта', '[140] шт', 'in'),
        R('f4', 'Тройник литой равнопроходной', 'для ПНД SDR 17', 110, '110', 'Стыковая сварка', 'SDR 17', 'поштучно', 'стыковая', '[210] шт', 'in'),
        R('f5', 'Втулка под фланец + фланец', 'комплект, Ру 10', 225, '225', 'Фланец', 'SDR 17', 'комплект', 'фланцевое', '[36] компл.', 'part'),
        R('f6', 'Муфта для гофры + кольцо', 'для гофры SN 8', 160, '160', 'Раструб', 'SN 8', 'поштучно', 'раструб', '[600] шт', 'in')
      ]
    },
    weld: {
      head: ['Позиция', 'Диаметры, мм', 'Тип сварки', 'Питание', 'Комплектация', 'Наличие', 'Цена от*'],
      dia: [['Все', 0, 9999], ['до 160', 0, 160], ['до 315', 161, 315], ['от 315', 316, 9999]],
      clsLabel: 'Сварка', cls: ['Все', 'Стыковая', 'Электромуфтовая'],
      unit: '₽/шт', priceNote: 'под заказ', icon: 'weld',
      short: function (r) { return r.name + ' ' + r.size; },
      rows: [
        R('w1', 'Аппарат стыковой сварки', 'механический привод', 160, '40–160', 'Стыковая', 'стыковая', '220 В', 'нагреватель, торцеватель', '—', 'order'),
        R('w2', 'Аппарат стыковой сварки', 'гидравлический привод', 315, '90–315', 'Стыковая', 'стыковая', '220 В', 'гидроблок, вкладыши', '—', 'order'),
        R('w3', 'Аппарат стыковой сварки', 'гидравлический привод', 630, '250–630', 'Стыковая', 'стыковая', '380 В', 'гидроблок, вкладыши', '—', 'order'),
        R('w4', 'Аппарат электромуфтовой сварки', 'для электросварных фитингов', 1200, 'до [1200]', 'Электромуфтовая', 'электромуфтовая', '220 В', 'сканер штрихкода', '—', 'order')
      ]
    }
  };

  var STATUS = {
    in: 'есть на заводе',
    part: 'частично на заводе',
    order: 'под заказ'
  };

  var ICON = {
    pipe: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2530" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="6"/></svg>',
    corr: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2530" aria-hidden="true"><circle cx="12" cy="12" r="9.5" stroke-width="2.4" stroke-dasharray="1.8 1.4"/><circle cx="12" cy="12" r="5.5" stroke-width="1.5"/></svg>',
    fit: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2530" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 21v-7a10 10 0 0 1 10-10h7"/><path d="M9 21v-7a5 5 0 0 1 5-5h7"/></svg>',
    weld: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2530" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="11" width="19" height="8" rx="1"/><circle cx="8" cy="15" r="2.2"/><circle cx="16" cy="15" r="2.2"/><path d="M12 11V5M9 5h6"/></svg>',
    plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };

  var state = { tab: 'pnd', dia: 0, cls: 0, q: '', sel: { p3: true, p5: true } };

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
    var btnLabel = on ? 'В КП' : (r.st === 'order' ? 'Запросить' : 'В КП');
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
        '<div class="td td-stack" role="cell" data-label="' + esc(h[5]) + '">' +
          '<span class="stock">' + esc(r.stock) + '</span>' +
          '<span class="status status-' + r.st + '"><i aria-hidden="true"></i>' + STATUS[r.st] + '</span>' +
        '</div>' +
        '<div class="td td-stack" role="cell" data-label="' + esc(h[6]) + '">' +
          '<span class="price">[000] ' + esc(t.unit) + '</span>' +
          '<span class="price-note">' + esc(t.priceNote) + '</span>' +
        '</div>' +
        '<div class="td td-action" role="cell">' +
          '<button type="button" class="btn-kp" data-id="' + r.id + '" aria-pressed="' + on + '" aria-label="' + esc((on ? 'Убрать из КП: ' : 'Добавить в КП: ') + t.short(r)) + '">' +
            (on ? ICON.check : ICON.plus) + btnLabel +
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
    $('#rows').innerHTML = rows.map(function (r) { return rowHtml(r, t); }).join('');
    $('#empty').hidden = rows.length > 0;

    renderKp();
  }

  function renderKp() {
    var shortById = {};
    Object.keys(DATA).forEach(function (k) {
      DATA[k].rows.forEach(function (r) { shortById[r.id] = DATA[k].short(r); });
    });
    var ids = Object.keys(state.sel);
    var n = ids.length;
    $('#kp-count').textContent = String(n);
    $('#kp-title').textContent = n === 0
      ? 'Отметьте позиции — соберём КП одним списком'
      : n + ' ' + plural(n, 'позиция', 'позиции', 'позиций') + ' в КП';
    $('#kp-sub').textContent = n === 0
      ? 'Трубы, гофра и фитинги — в одном счёте и одной машине'
      : ids.slice(0, 3).map(function (id) { return shortById[id]; }).join(' · ') + (n > 3 ? ' и ещё ' + (n - 3) : '');
    $('#kp-status').hidden = true;
  }

  function bindCatalog() {
    $$('.cat-card').forEach(function (b) {
      b.addEventListener('click', function () {
        state.tab = b.getAttribute('data-tab');
        state.dia = 0;
        state.cls = 0;
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

    $('#kp-send').addEventListener('click', function () {
      var n = Object.keys(state.sel).length;
      var status = $('#kp-status');
      status.textContent = n === 0
        ? 'Сначала отметьте позиции в таблице кнопкой «В КП».'
        : 'Демо-версия: список не отправлен. В рабочей версии он уйдёт в CRM вместе с контактом из формы.';
      status.hidden = false;
    });
  }


  /* ---------- Демо-формы: данные никуда не отправляются ---------- */
  function bindForms() {
    var spec = $('#spec');
    spec.addEventListener('change', function () {
      var f = spec.files && spec.files[0];
      $('#dz-title').textContent = f ? f.name : 'Загрузите спецификацию';
      spec.closest('.dropzone').classList.toggle('is-filled', !!f);
    });

    $('#lead-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.currentTarget;
      var status = $('.form-status', form);
      var contact = $('#contact').value.trim();
      var consent = form.elements.consent.checked;
      if (!contact) {
        status.textContent = 'Укажите телефон или e-mail — на него придёт КП.';
      } else if (!consent) {
        status.textContent = 'Отметьте согласие на обработку персональных данных.';
      } else {
        status.textContent = 'Демо-версия: заявка не отправлена. В рабочей версии форма уходит в CRM, а КП приходит за 15 минут.';
      }
      status.hidden = false;
    });

    $('#calc-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var status = $('.form-status', e.currentTarget);
      status.textContent = $('#addr').value.trim()
        ? 'Демо-версия: расчёт не выполняется. В рабочей версии здесь появится стоимость и тип машины.'
        : 'Укажите адрес объекта.';
      status.hidden = false;
    });
  }

  renderCatalog();
  bindCatalog();
  bindForms();
})();
