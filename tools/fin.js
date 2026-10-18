/* ═══════════════════════════════════════════
   SOLVV AI — Finance calculator helpers
   Loaded after tools.js on loan / savings / investment pages
   ═══════════════════════════════════════════ */
(function () {
  'use strict';
  var S = window.Solvv;
  var F = window.SolvvFin = {};

  /* Monthly EMI for principal P, annual rate % and tenure in months */
  F.emi = function (P, annualRate, months) {
    var r = annualRate / 1200;
    if (months <= 0) return 0;
    if (r === 0) return P / months;
    var x = Math.pow(1 + r, months);
    return P * r * x / (x - 1);
  };

  /* Loan amount that a given EMI can support */
  F.loanForEmi = function (emi, annualRate, months) {
    var r = annualRate / 1200;
    if (r === 0) return emi * months;
    var x = Math.pow(1 + r, months);
    return emi * (x - 1) / (r * x);
  };

  /* Year-wise amortisation: [{year, principal, interest, balance}] */
  F.amortYears = function (P, annualRate, months) {
    var r = annualRate / 1200, emi = F.emi(P, annualRate, months), bal = P, out = [], y = null;
    for (var m = 1; m <= months; m++) {
      var int = bal * r, prin = Math.min(emi - int, bal);
      bal = Math.max(0, bal - prin);
      var yr = Math.ceil(m / 12);
      if (!y || y.year !== yr) { y = { year: yr, principal: 0, interest: 0, balance: 0 }; out.push(y); }
      y.principal += prin; y.interest += int; y.balance = bal;
    }
    return out;
  };

  /* Monthly SIP future value with optional yearly step-up %, contributions at start of month */
  F.sip = function (monthly, annualReturn, years, stepUp) {
    var i = annualReturn / 1200, bal = 0, invested = 0, amt = monthly, rows = [];
    for (var y = 1; y <= years; y++) {
      for (var m = 0; m < 12; m++) { bal = (bal + amt) * (1 + i); invested += amt; }
      rows.push({ year: y, invested: invested, value: bal, monthly: amt });
      amt = amt * (1 + (stepUp || 0) / 100);
    }
    return { value: bal, invested: invested, rows: rows };
  };

  /* Render result lines into an element: lines = [[label, value, cls?]] */
  F.lines = function (el, lines, totalIndexes) {
    totalIndexes = totalIndexes || [];
    el.innerHTML = lines.map(function (l, i) {
      var cls = (totalIndexes.indexOf(i) !== -1 ? ' r-total' : '') + (l[2] ? ' ' + l[2] : '');
      return '<div class="r-line' + cls + '"><span>' + l[0] + '</span><span>' + l[1] + '</span></div>';
    }).join('');
  };

  /* Simple table: headers [..], rows [[..]] */
  F.table = function (el, headers, rows) {
    el.innerHTML = '<div style="overflow-x:auto;margin-top:18px"><table class="t-table"><thead><tr>' +
      headers.map(function (h, i) { return '<th' + (i ? ' class="num"' : '') + '>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i ? ' class="num"' : '') + '>' + c + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>';
  };

  /* Two-part meter, e.g. principal vs interest */
  F.split = function (el, a, b, labelA, labelB) {
    var t = a + b || 1;
    el.innerHTML = '<div class="meter"><i style="width:' + (a / t * 100) + '%;background:var(--primary)"></i><i style="width:' + (b / t * 100) + '%;background:var(--pink)"></i></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--gray);margin-bottom:12px">' +
      '<span><i style="display:inline-block;width:9px;height:9px;border-radius:3px;background:var(--primary);margin-right:6px"></i>' + labelA + ' ' + S.fmt(a / t * 100, 0) + '%</span>' +
      '<span><i style="display:inline-block;width:9px;height:9px;border-radius:3px;background:var(--pink);margin-right:6px"></i>' + labelB + ' ' + S.fmt(b / t * 100, 0) + '%</span></div>';
  };

  /* Compact ₹ for big numbers: ₹1.25 Cr, ₹45.6 L */
  F.short = function (n) {
    var a = Math.abs(n);
    if (a >= 1e7) return '₹' + S.fmt(n / 1e7, 2) + ' Cr';
    if (a >= 1e5) return '₹' + S.fmt(n / 1e5, 2) + ' L';
    return S.inr(n, 0);
  };

  /* Wire inputs + copy/share for a standard calculator page.
     opts: { ids: [...], calc: fn() → lines array or null, title } */
  F.wire = function (opts) {
    var $ = function (id) { return document.getElementById(id); };
    var last = null;
    function run() { last = opts.calc(); }
    opts.ids.forEach(function (id) { var e = $(id); if (!e) return; e.addEventListener('input', run); e.addEventListener('change', run); });
    function text() { return opts.title + '\n' + last.map(function (l) { return l[0] + ': ' + l[1]; }).join('\n'); }
    var c = $('copy'), s = $('share');
    if (c) c.addEventListener('click', function () { if (last) S.copy(text()); });
    if (s) s.addEventListener('click', function () { if (last) S.shareWA(text()); });
    run();
    return run;
  };
})();
