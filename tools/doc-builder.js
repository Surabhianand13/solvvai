/* ═══════════════════════════════════════════
   SOLVV AI — GST invoice / quotation builder
   Usage: SolvvDoc.init({ kind: 'invoice' | 'quote' })
   ═══════════════════════════════════════════ */
(function () {
  'use strict';
  var S = window.Solvv;

  var STATES = [
    ['01', 'Jammu and Kashmir'], ['02', 'Himachal Pradesh'], ['03', 'Punjab'], ['04', 'Chandigarh'], ['05', 'Uttarakhand'],
    ['06', 'Haryana'], ['07', 'Delhi'], ['08', 'Rajasthan'], ['09', 'Uttar Pradesh'], ['10', 'Bihar'], ['11', 'Sikkim'],
    ['12', 'Arunachal Pradesh'], ['13', 'Nagaland'], ['14', 'Manipur'], ['15', 'Mizoram'], ['16', 'Tripura'], ['17', 'Meghalaya'],
    ['18', 'Assam'], ['19', 'West Bengal'], ['20', 'Jharkhand'], ['21', 'Odisha'], ['22', 'Chhattisgarh'], ['23', 'Madhya Pradesh'],
    ['24', 'Gujarat'], ['26', 'Dadra and Nagar Haveli and Daman and Diu'], ['27', 'Maharashtra'], ['29', 'Karnataka'], ['30', 'Goa'],
    ['31', 'Lakshadweep'], ['32', 'Kerala'], ['33', 'Tamil Nadu'], ['34', 'Puducherry'], ['35', 'Andaman and Nicobar Islands'],
    ['36', 'Telangana'], ['37', 'Andhra Pradesh'], ['38', 'Ladakh'], ['97', 'Other Territory'], ['96', 'Outside India (export)']
  ];
  var stateName = {};
  STATES.forEach(function (s) { stateName[s[0]] = s[1]; });

  function today(offsetDays) {
    var d = new Date(); d.setDate(d.getDate() + (offsetDays || 0));
    return d.toISOString().slice(0, 10);
  }
  function fmtDate(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
  }

  var KINDS = {
    invoice: { title: 'Tax Invoice', noLabel: 'Invoice no.', prefix: 'INV-', date2Label: 'Due date', date2Days: 15,
      toLabel: 'Bill to', defaultNotes: 'Thank you for your business.', defaultTerms: 'Payment due within 15 days.\nGoods once sold will not be taken back.' },
    quote: { title: 'Quotation', noLabel: 'Quotation no.', prefix: 'QT-', date2Label: 'Valid until', date2Days: 30,
      toLabel: 'Quotation for', defaultNotes: 'We look forward to working with you.', defaultTerms: '50% advance to confirm the order, balance on delivery.\nPrices valid until the date above.\nTaxes as applicable.' }
  };

  function blank(kind) {
    var k = KINDS[kind];
    return {
      logo: '', from: { name: '', address: '', gstin: '', phone: '', email: '', state: '' },
      to: { name: '', address: '', gstin: '', phone: '', state: '' },
      no: k.prefix + '001', date: today(0), date2: today(k.date2Days),
      gst: true, roundOff: true,
      items: [{ desc: '', hsn: '', qty: 1, unit: 'Nos', price: '', disc: '', rate: 18 }],
      notes: k.defaultNotes, terms: k.defaultTerms, bank: '', sign: ''
    };
  }

  function stateOptions(sel) {
    return '<option value="">Select state</option>' + STATES.map(function (s) {
      return '<option value="' + s[0] + '"' + (s[0] === sel ? ' selected' : '') + '>' + s[1] + ' (' + s[0] + ')</option>';
    }).join('');
  }

  function compute(d) {
    var intra = !d.from.state || !d.to.state || d.from.state === d.to.state;
    var rows = [], sub = 0, taxTotal = 0, byRate = {};
    d.items.forEach(function (it) {
      var qty = S.num(it.qty), price = S.num(it.price), disc = S.num(it.disc), rate = d.gst ? S.num(it.rate) : 0;
      var gross = qty * price;
      var taxable = gross * (1 - disc / 100);
      var tax = taxable * rate / 100;
      if (!it.desc && !price) return;
      rows.push({ it: it, qty: qty, price: price, disc: disc, rate: rate, taxable: taxable, tax: tax, total: taxable + tax });
      sub += taxable; taxTotal += tax;
      if (rate) { byRate[rate] = byRate[rate] || { taxable: 0, tax: 0 }; byRate[rate].taxable += taxable; byRate[rate].tax += tax; }
    });
    var exact = sub + taxTotal;
    var grand = d.roundOff ? Math.round(exact) : S.round(exact, 2);
    return { rows: rows, sub: sub, tax: taxTotal, byRate: byRate, intra: intra, roundDiff: grand - exact, grand: grand };
  }

  function renderDoc(d, kind, c) {
    var k = KINDS[kind], e = S.esc;
    var title = kind === 'invoice' && !d.gst ? 'Invoice' : k.title;
    var showHsn = d.items.some(function (i) { return i.hsn; });
    var showDisc = c.rows.some(function (r) { return r.disc; });
    var h = '<div class="doc-top"><div>';
    if (d.logo) h += '<img class="doc-logo" src="' + d.logo + '" alt="">';
    h += '<div style="font-size:16px;font-weight:800">' + (e(d.from.name) || '<span class="muted">Your business name</span>') + '</div>';
    if (d.from.address) h += '<div class="muted">' + S.nl2br(d.from.address) + '</div>';
    var contact = [d.from.phone, d.from.email].filter(Boolean).map(e).join(' · ');
    if (contact) h += '<div class="muted">' + contact + '</div>';
    if (d.from.gstin) h += '<div><b>GSTIN:</b> ' + e(d.from.gstin.toUpperCase()) + '</div>';
    h += '</div><div class="doc-meta"><h1>' + title.toUpperCase() + '</h1>';
    h += '<div><b>' + k.noLabel + '</b> ' + e(d.no) + '</div><div><b>Date:</b> ' + fmtDate(d.date) + '</div>';
    if (d.date2) h += '<div><b>' + k.date2Label + ':</b> ' + fmtDate(d.date2) + '</div>';
    h += '</div></div>';

    h += '<div class="doc-parties"><div><h4>' + k.toLabel + '</h4>';
    h += '<div style="font-weight:700">' + (e(d.to.name) || '<span class="muted">Customer name</span>') + '</div>';
    if (d.to.address) h += '<div class="muted">' + S.nl2br(d.to.address) + '</div>';
    if (d.to.phone) h += '<div class="muted">' + e(d.to.phone) + '</div>';
    if (d.to.gstin) h += '<div><b>GSTIN:</b> ' + e(d.to.gstin.toUpperCase()) + '</div>';
    h += '</div><div>';
    if (d.gst && d.to.state) h += '<h4>Place of supply</h4><div>' + e(stateName[d.to.state] || '') + ' (' + d.to.state + ')</div>';
    h += '</div></div>';

    h += '<table><thead><tr><th style="width:28px">#</th><th>Item / description</th>' + (showHsn ? '<th>HSN/SAC</th>' : '') +
      '<th class="num">Qty</th><th class="num">Rate</th>' + (showDisc ? '<th class="num">Disc.</th>' : '') +
      '<th class="num">Taxable</th>' + (d.gst ? '<th class="num">GST</th>' : '') + '<th class="num">Amount</th></tr></thead><tbody>';
    if (!c.rows.length) h += '<tr><td colspan="9" class="muted" style="text-align:center;padding:18px">Add items to see them here</td></tr>';
    c.rows.forEach(function (r, i) {
      h += '<tr><td>' + (i + 1) + '</td><td>' + S.nl2br(r.it.desc) + '</td>' + (showHsn ? '<td>' + e(r.it.hsn) + '</td>' : '') +
        '<td class="num">' + S.fmt(r.qty, 3) + ' ' + e(r.it.unit || '') + '</td><td class="num">' + S.fmt(r.price, 2) + '</td>' +
        (showDisc ? '<td class="num">' + (r.disc ? S.fmt(r.disc, 2) + '%' : '') + '</td>' : '') +
        '<td class="num">' + S.fmt(r.taxable, 2) + '</td>' + (d.gst ? '<td class="num">' + S.fmt(r.rate, 2) + '%</td>' : '') +
        '<td class="num">' + S.fmt(r.total, 2) + '</td></tr>';
    });
    h += '</tbody></table>';

    h += '<table class="doc-sum"><tbody><tr><td>Taxable value</td><td class="num">' + S.inr(c.sub) + '</td></tr>';
    if (d.gst) {
      Object.keys(c.byRate).sort(function (a, b) { return a - b; }).forEach(function (rate) {
        var g = c.byRate[rate], r = parseFloat(rate);
        if (c.intra) {
          h += '<tr><td>CGST @ ' + S.fmt(r / 2, 3) + '%</td><td class="num">' + S.inr(g.tax / 2) + '</td></tr>';
          h += '<tr><td>SGST @ ' + S.fmt(r / 2, 3) + '%</td><td class="num">' + S.inr(g.tax / 2) + '</td></tr>';
        } else {
          h += '<tr><td>IGST @ ' + S.fmt(r, 3) + '%</td><td class="num">' + S.inr(g.tax) + '</td></tr>';
        }
      });
    }
    if (d.roundOff && Math.abs(c.roundDiff) >= 0.005) h += '<tr><td>Round off</td><td class="num">' + (c.roundDiff > 0 ? '+' : '−') + S.fmt(Math.abs(c.roundDiff), 2) + '</td></tr>';
    h += '<tr class="grand"><td>Total</td><td class="num">' + S.inr(c.grand) + '</td></tr></tbody></table>';
    h += '<div style="margin-top:6px"><b>Amount in words:</b> ' + S.words(c.grand) + '</div>';

    h += '<div class="doc-foot"><div>';
    if (d.bank) h += '<h4>Payment details</h4><div>' + S.nl2br(d.bank) + '</div><br>';
    if (d.terms) h += '<h4>Terms &amp; conditions</h4><div class="muted">' + S.nl2br(d.terms) + '</div>';
    if (d.notes) h += '<div style="margin-top:10px">' + S.nl2br(d.notes) + '</div>';
    h += '</div><div class="doc-sign"><div>For <b>' + (e(d.from.name) || 'your business') + '</b></div>' +
      '<div class="line">' + (e(d.sign) || 'Authorised signatory') + '</div></div></div>';
    h += '<div class="doc-credit">Made free with <b>solvvai.com/tools</b> · Websites &amp; automation for growing businesses</div>';
    return h;
  }

  function init(opts) {
    var kind = opts.kind;
    var label = kind === 'quote' ? 'quotation' : 'invoice';
    var grid = document.getElementById('doc-grid');
    if (S.freeUsed(kind)) { S.lockDoc(grid, label); return; }
    /* Kept in memory only: never saved to the browser or any server */
    var d = blank(kind);
    var $ = function (id) { return document.getElementById(id); };
    var form = $('doc-form');
    var itemsBody = $('items-body');
    var preview = $('doc');

    $('from-state').innerHTML = stateOptions(d.from.state);
    $('to-state').innerHTML = stateOptions(d.to.state);

    /* Bind simple fields: data-k="from.name" */
    function getPath(o, p) { return p.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
    function setPath(o, p, v) { var ks = p.split('.'), last = ks.pop(); ks.reduce(function (a, k) { return a[k]; }, o)[last] = v; }
    form.querySelectorAll('[data-k]').forEach(function (el) {
      var v = getPath(d, el.dataset.k);
      if (el.type === 'checkbox') el.checked = !!v; else el.value = v == null ? '' : v;
    });

    function itemRow(it, i) {
      var e = S.esc;
      return '<tr data-i="' + i + '">' +
        '<td class="wide" data-label="Item"><input data-f="desc" value="' + e(it.desc) + '" placeholder="Item or service"></td>' +
        '<td data-label="HSN/SAC" style="width:90px"><input data-f="hsn" value="' + e(it.hsn) + '" placeholder="9983"></td>' +
        '<td data-label="Qty" style="width:70px"><input data-f="qty" inputmode="decimal" value="' + e(it.qty) + '"></td>' +
        '<td data-label="Rate ₹" style="width:100px"><input data-f="price" inputmode="decimal" value="' + e(it.price) + '" placeholder="0"></td>' +
        '<td data-label="Disc %" style="width:70px"><input data-f="disc" inputmode="decimal" value="' + e(it.disc) + '" placeholder="0"></td>' +
        '<td data-label="GST %" style="width:84px" class="gst-col"><select data-f="rate">' +
          [0, 0.25, 3, 5, 12, 18, 28, 40].map(function (r) { return '<option value="' + r + '"' + (S.num(it.rate) === r ? ' selected' : '') + '>' + r + '%</option>'; }).join('') +
        '</select></td>' +
        '<td class="del"><button type="button" class="row-del" aria-label="Remove item">×</button></td></tr>';
    }
    function renderItems() { itemsBody.innerHTML = d.items.map(itemRow).join(''); toggleGstCols(); }
    function toggleGstCols() { document.querySelectorAll('.gst-col').forEach(function (c) { c.style.display = d.gst ? '' : 'none'; }); }

    function update() {
      var c = compute(d);
      preview.innerHTML = renderDoc(d, kind, c);
      S.fitDoc();
      var tag = $('tax-mode');
      if (tag) tag.textContent = !d.gst ? 'No GST on this document' : (c.intra ? 'Same state → CGST + SGST' : 'Different states → IGST');
    }

    form.addEventListener('input', function (e) {
      var el = e.target;
      if (el.dataset.k) {
        setPath(d, el.dataset.k, el.type === 'checkbox' ? el.checked : el.value);
        if (el.dataset.k === 'from.gstin' || el.dataset.k === 'to.gstin') {
          var code = el.value.trim().slice(0, 2), side = el.dataset.k.split('.')[0];
          if (/^\d\d$/.test(code) && stateName[code]) { d[side].state = code; $(side + '-state').value = code; }
        }
        if (el.dataset.k === 'gst') toggleGstCols();
      } else if (el.dataset.f) {
        var i = +el.closest('tr').dataset.i;
        d.items[i][el.dataset.f] = el.value;
      }
      update();
    });
    form.addEventListener('change', function (e) { if (e.target.tagName === 'SELECT') form.dispatchEvent(new Event('input')); });
    /* selects fire 'input' too in modern browsers; the change handler covers older ones */

    itemsBody.addEventListener('click', function (e) {
      var b = e.target.closest('.row-del'); if (!b) return;
      var i = +b.closest('tr').dataset.i;
      d.items.splice(i, 1);
      if (!d.items.length) d.items.push(blank(kind).items[0]);
      renderItems(); update();
    });
    $('add-item').addEventListener('click', function () {
      var lastRate = d.items.length ? d.items[d.items.length - 1].rate : 18;
      d.items.push({ desc: '', hsn: '', qty: 1, unit: 'Nos', price: '', disc: '', rate: lastRate });
      renderItems(); update();
      var rows = itemsBody.querySelectorAll('tr'); rows[rows.length - 1].querySelector('input').focus();
    });

    /* Logo */
    var logoIn = $('logo-in'), logoPrev = $('logo-prev'), logoClear = $('logo-clear');
    function showLogo() { logoPrev.src = d.logo || ''; logoPrev.style.display = d.logo ? '' : 'none'; logoClear.style.display = d.logo ? '' : 'none'; }
    logoIn.addEventListener('change', function () {
      var f = logoIn.files && logoIn.files[0]; if (!f) return;
      if (f.size > 1.5 * 1024 * 1024) { S.toast('Please use a logo under 1.5 MB'); logoIn.value = ''; return; }
      var img = new Image(), rd = new FileReader();
      rd.onload = function () {
        img.onload = function () {
          /* downscale so it fits in local storage */
          var scale = Math.min(1, 360 / Math.max(img.width, img.height));
          var cv = document.createElement('canvas'); cv.width = Math.round(img.width * scale); cv.height = Math.round(img.height * scale);
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
          d.logo = cv.toDataURL('image/png'); showLogo(); update();
        };
        img.src = rd.result;
      };
      rd.readAsDataURL(f);
    });
    logoClear.addEventListener('click', function () { d.logo = ''; logoIn.value = ''; showLogo(); update(); });

    /* Actions */
    $('btn-pdf').addEventListener('click', function () {
      var c = compute(d);
      if (!d.from.name.trim() || !c.rows.length) {
        S.toast('Add your business name and at least one item first');
        return;
      }
      update();
      S.printOnce(kind, label, grid, function () { d = blank(kind); });
    });
    /* Mobile edit/preview tabs */
    var tabs = $('view-tabs');
    if (tabs) S.seg(tabs, function (v) { grid.dataset.view = v; S.fitDoc(); window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 90 }); });

    renderItems(); showLogo(); update();
  }

  window.SolvvDoc = { init: init };
})();
