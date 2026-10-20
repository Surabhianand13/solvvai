/* ═══════════════════════════════════════════
   SOLVV AI — Free Business Tools (shared)
   Nav, footer, pitch + lead form, formatting helpers
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var WEB3FORMS_KEY = 'd3b96783-18c1-48ce-ba2f-9c36e7847933';
  var WA_NUMBER = '919535076475';

  /* ─── TOOL REGISTRY ─── */
  var TOOLS = [
    { slug: 'gst-calculator', name: 'GST Calculator', icon: '🧾', group: 'Tax & Billing',
      blurb: 'Add or remove GST, with CGST, SGST and IGST split.',
      pitch: { kicker: 'Still calculating GST by hand?', title: 'Let your website do the billing',
        body: 'We build business websites where customers order, pay and get a GST invoice automatically, delivered in 7 days.',
        points: ['Online store or booking site with GST-ready invoices', 'Payments by UPI, cards and netbanking', 'Invoice sent to the customer on WhatsApp'],
        need: 'Website with online payments' } },
    { slug: 'gst-invoice-generator', name: 'GST Invoice Generator', icon: '📄', group: 'Tax & Billing',
      blurb: 'Make a GST invoice with your logo and download it as a PDF.',
      pitch: { kicker: 'Making invoices one by one?', title: 'Automate your invoicing',
        body: 'We set up billing that creates the invoice, sends it on WhatsApp and email, and follows up on unpaid bills automatically.',
        points: ['Auto-generated GST invoices from orders or payments', 'WhatsApp + email delivery with payment link', 'Payment reminders without chasing anyone'],
        need: 'Billing / invoice automation' } },
    { slug: 'quotation-maker', name: 'Quotation Maker', icon: '📝', group: 'Tax & Billing',
      blurb: 'Create a professional quotation and share it as a PDF.',
      pitch: { kicker: 'Win more of the quotes you send', title: 'Get enquiries that are ready to buy',
        body: 'A website that shows your work, answers questions with an AI assistant, and sends you qualified enquiries on WhatsApp.',
        points: ['Portfolio website that builds trust before you quote', 'Enquiry forms that capture budget and requirements', 'Instant WhatsApp alert for every new lead'],
        need: 'Business website + lead capture' } },
    { slug: 'salary-slip-generator', name: 'Salary Slip Generator', icon: '💼', group: 'Tax & Billing',
      blurb: 'Make payslips with PF, ESI, PT and TDS. Prints to PDF.',
      pitch: { kicker: 'Running a growing team?', title: 'Put the busywork on autopilot',
        body: 'We build AI workflows for Indian SMBs: payslips, attendance, staff onboarding and customer follow-ups, without new software to learn.',
        points: ['Payslips generated and shared on WhatsApp every month', 'Attendance and leave tracked from a simple form', 'Custom dashboards for your numbers'],
        need: 'AI workflow automation' } },
    { slug: 'profit-margin-calculator', name: 'Profit Margin Calculator', icon: '📈', group: 'Pricing & Profit',
      blurb: 'Margin, markup, selling price and net profit, with GST.',
      pitch: { kicker: 'Know your margins?', title: 'Now sell more at that margin',
        body: 'Marketplaces take 15–35% in commission. Your own website keeps that margin with you, and we build it in 7 days.',
        points: ['D2C website that takes orders and payments', 'SEO so customers find you directly on Google', 'WhatsApp ordering and order updates'],
        need: 'Online store / D2C website' } },
    { slug: 'gold-price-calculator', name: 'Gold Price Calculator', icon: '💍', group: 'Pricing & Profit',
      blurb: 'Jewellery price with purity, making charges, wastage and 3% GST.',
      pitch: { kicker: 'For jewellers', title: 'A jewellery website customers trust',
        body: "Show your collections with today's rates, take enquiries and bookings, and get found when people search for jewellers near them.",
        points: ['Catalogue website with live gold-rate display', 'Book-a-visit and WhatsApp enquiry buttons', 'Google Business + local SEO setup'],
        need: 'Jewellery website' } },
    { slug: 'cbm-calculator', name: 'CBM Calculator', icon: '📦', group: 'Shipping & Import',
      blurb: 'Carton CBM, CFT and how many fit in a 20ft or 40ft container.',
      pitch: { kicker: 'For traders and exporters', title: 'Get buyers to come to you',
        body: 'An export-ready website with a product catalogue, RFQ forms and multi-language pages, so international buyers can find and contact you.',
        points: ['B2B catalogue with RFQ / quote request flow', 'SEO for "manufacturer / supplier in India" searches', 'Enquiries routed to your WhatsApp and CRM'],
        need: 'B2B / export website' } },
    { slug: 'volumetric-weight-calculator', name: 'Volumetric Weight Calculator', icon: '⚖️', group: 'Shipping & Import',
      blurb: 'Chargeable weight for courier, air cargo and marketplaces.',
      pitch: { kicker: 'Shipping orders every day?', title: 'Automate order-to-delivery',
        body: 'We connect your store, shipping partner and WhatsApp, so orders, labels and tracking updates happen on their own.',
        points: ['Store connected to Shiprocket / Delhivery', 'Automatic tracking updates on WhatsApp', 'COD confirmation to cut RTO'],
        need: 'Store + shipping automation' } },
    { slug: 'import-duty-calculator', name: 'Import Duty Calculator', icon: '🚢', group: 'Shipping & Import',
      blurb: 'Customs duty, SWS and IGST on goods imported into India.',
      pitch: { kicker: 'Importing to resell?', title: 'Sell it online at a margin that works',
        body: 'Landed cost sorted? Now we build the website and ads that turn your imported range into steady orders.',
        points: ['Online store with your landed-cost pricing', 'Google + Meta ads set up to sell profitably', 'Lead and order alerts on WhatsApp'],
        need: 'Online store + ads' } },
    { slug: 'construction-cost-calculator', name: 'Construction Cost Calculator', icon: '🏗️', group: 'Construction & Property',
      blurb: 'House construction cost and material quantities per sq ft.',
      pitch: { kicker: 'For builders and contractors', title: 'Get more site enquiries',
        body: 'A website that shows your projects, gives visitors an instant estimate, and sends serious leads straight to your WhatsApp.',
        points: ['Project portfolio with before/after galleries', 'This estimate calculator embedded on your own site', 'Google Ads + local SEO for your city'],
        need: 'Contractor / builder website' } },
    { slug: 'square-feet-calculator', name: 'Square Feet Calculator', icon: '📐', group: 'Construction & Property',
      blurb: 'Area in sq ft, sq m, gaj, cents, guntha and acres.',
      pitch: { kicker: 'For property and interior businesses', title: 'Turn site visitors into site visits',
        body: 'We build property and interior websites with listings, instant estimates and an AI assistant that qualifies buyers.',
        points: ['Listing pages with floor plans and enquiry forms', 'AI assistant that answers buyer questions 24/7', 'Leads delivered to WhatsApp and your CRM'],
        need: 'Property / interiors website' } }
  ];

  var LOAN_PITCH = { kicker: 'For loan agents, DSAs & lenders', title: 'Get loan leads on your own website',
    body: 'People who use this calculator are ready to borrow. We build websites for DSAs, NBFCs and lenders with calculators like this one that capture applicant details and send them to your WhatsApp.',
    points: ['Your own EMI and eligibility calculators, branded for you', 'Applicant name, income and city captured with every calculation', 'Google Ads + SEO to bring in borrowers in your city'],
    need: 'Loan / DSA lead-gen website' };
  var INVEST_PITCH = { kicker: 'For mutual fund distributors & advisors', title: 'Turn calculator users into clients',
    body: 'We build websites for MFDs, financial advisors and insurance agents with SIP, retirement and goal calculators that capture investor leads automatically.',
    points: ['Your own SIP, retirement and goal calculators, branded for you', 'Every lead sent to your WhatsApp with their goal and amount', 'SEO and content so investors find you, not the big apps'],
    need: 'Advisor / MFD website' };
  function fin(slug, name, icon, group, blurb) {
    return { slug: slug, name: name, icon: icon, group: group, blurb: blurb, pitch: group === 'Loans & EMI' ? LOAN_PITCH : INVEST_PITCH };
  }
  TOOLS.push(
    fin('emi-calculator', 'EMI Calculator', '🧮', 'Loans & EMI', 'Monthly EMI, total interest and repayment schedule for any loan.'),
    fin('home-loan-emi-calculator', 'Home Loan EMI Calculator', '🏠', 'Loans & EMI', 'Home loan EMI with year-wise principal and interest.'),
    fin('home-loan-eligibility-calculator', 'Home Loan Eligibility Calculator', '✅', 'Loans & EMI', 'How much home loan you can get on your income.'),
    fin('personal-loan-emi-calculator', 'Personal Loan EMI Calculator', '💳', 'Loans & EMI', 'Personal loan EMI including processing fee and GST.'),
    fin('fd-calculator', 'FD Calculator', '🏦', 'Savings', 'Fixed deposit maturity and interest with any compounding.'),
    fin('rd-calculator', 'RD Calculator', '🗓️', 'Savings', 'Recurring deposit maturity using the bank formula.'),
    fin('ppf-calculator', 'PPF Calculator', '🛡️', 'Savings', 'PPF maturity over 15 years and extensions.'),
    fin('sukanya-samriddhi-yojana-calculator', 'Sukanya Samriddhi Calculator', '👧', 'Savings', 'SSY maturity for your daughter at age 21.'),
    fin('sip-calculator', 'SIP Calculator', '📊', 'Investing', 'Future value of a monthly SIP in mutual funds.'),
    fin('step-up-sip-calculator', 'Step-up SIP Calculator', '📶', 'Investing', 'SIP that grows every year with your income.'),
    fin('lumpsum-calculator', 'Lumpsum Calculator', '💰', 'Investing', 'Growth of a one-time mutual fund investment.'),
    fin('swp-calculator', 'SWP Calculator', '🔁', 'Investing', 'Monthly withdrawals and how long your corpus lasts.'),
    fin('nps-calculator', 'NPS Calculator', '🧓', 'Investing', 'NPS corpus, lump sum and monthly pension at 60.'),
    fin('retirement-calculator', 'Retirement Calculator', '🌴', 'Investing', 'Corpus you need to retire and the SIP to get there.')
  );
  var bySlug = {};
  TOOLS.forEach(function (t) { bySlug[t.slug] = t; });

  /* ─── HELPERS ─── */
  var S = window.Solvv = {};
  S.tools = TOOLS;

  S.num = function (v) {
    if (v && v.nodeType) v = v.value;
    var n = parseFloat(String(v == null ? '' : v).replace(/[,₹\s]/g, ''));
    return isFinite(n) ? n : 0;
  };
  S.round = function (n, d) { var p = Math.pow(10, d == null ? 2 : d); return Math.round((n + Number.EPSILON) * p) / p; };
  S.inr = function (n, d) {
    d = d == null ? 2 : d;
    var neg = n < 0;
    var s = Math.abs(S.round(n, d)).toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
    return (neg ? '−₹' : '₹') + s;
  };
  S.fmt = function (n, d) {
    d = d == null ? 2 : d;
    return S.round(n, d).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: d });
  };
  S.pct = function (n, d) { return S.fmt(n, d == null ? 2 : d) + '%'; };

  /* Indian-system amount in words: "Rupees One Lakh Twenty Thousand and Fifty Paise Only" */
  var ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
    'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  var TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  function two(n) { return n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : ''); }
  function three(n) {
    var h = Math.floor(n / 100), r = n % 100;
    return (h ? ONES[h] + ' Hundred' + (r ? ' ' : '') : '') + (r ? two(r) : '');
  }
  function intWords(n) {
    if (n === 0) return 'Zero';
    var parts = [];
    var crore = Math.floor(n / 1e7); n %= 1e7;
    var lakh = Math.floor(n / 1e5); n %= 1e5;
    var thousand = Math.floor(n / 1e3); n %= 1e3;
    if (crore) parts.push((crore >= 1000 ? intWords(crore) : three(crore)) + ' Crore');
    if (lakh) parts.push(two(lakh) + ' Lakh');
    if (thousand) parts.push(two(thousand) + ' Thousand');
    if (n) parts.push(three(n));
    return parts.join(' ');
  }
  S.words = function (amount) {
    amount = S.round(Math.abs(amount), 2);
    var rupees = Math.floor(amount);
    var paise = Math.round((amount - rupees) * 100);
    var out = 'Rupees ' + intWords(rupees);
    if (paise) out += ' and ' + two(paise) + ' Paise';
    return out + ' Only';
  };

  S.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  S.nl2br = function (s) { return S.esc(s).replace(/\n/g, '<br>'); };


  S.track = function (name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  };

  var usedOnce = false;
  S.used = function () {
    if (usedOnce) return;
    usedOnce = true;
    S.track('tool_use', { tool: document.body.dataset.tool });
  };

  var toastEl;
  S.toast = function (msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 't-toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  };

  S.copy = function (text) {
    var done = function () { S.toast('Copied to clipboard'); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      ta.remove();
    }
    S.track('tool_copy', { tool: document.body.dataset.tool });
  };

  S.shareWA = function (text) {
    var url = location.origin + location.pathname;
    window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n\nCalculated free at ' + url), '_blank', 'noopener');
    S.track('tool_share', { tool: document.body.dataset.tool, method: 'whatsapp' });
  };

  S.print = function () {
    S.track('tool_download', { tool: document.body.dataset.tool });
    window.print();
  };

  /* Scale the A4-width document preview down to fit small screens */
  S.fitDoc = function () {
    var doc = document.getElementById('doc');
    if (!doc) return;
    var wrap = doc.parentElement;
    var avail = wrap.clientWidth - 20;
    doc.style.zoom = avail > 0 && avail < 760 ? (avail / 760).toFixed(3) : '';
  };
  window.addEventListener('resize', function () { S.fitDoc(); });

  /* Segmented controls / chips: <div class="seg" data-name="mode"><button data-v="add" class="on"> */
  S.seg = function (el, onChange) {
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || !el.contains(b)) return;
      e.preventDefault();
      el.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      el.dataset.value = b.dataset.v;
      onChange && onChange(b.dataset.v);
    });
    var on = el.querySelector('button.on') || el.querySelector('button');
    el.dataset.value = on ? on.dataset.v : '';
    return { get: function () { return el.dataset.value; },
      set: function (v) { el.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x.dataset.v === String(v)); }); el.dataset.value = v; } };
  };

  /* ─── CHROME: nav, pitch, related, footer ─── */
  var slug = document.body.dataset.tool || '';
  var tool = bySlug[slug];

  function navHTML(sl) {
    return '' +
      '<nav class="nav" id="nav"><div class="nav-inner">' +
        '<a href="/" class="nav-logo"><img src="/logo.svg" alt="Solvv AI logo" class="nav-logo-img">SOLVV<span>AI</span></a>' +
        '<ul class="nav-links">' +
          '<li><a href="/tools/"' + (sl === 'hub' ? ' class="active"' : '') + '>Free Tools</a></li>' +
          '<li><a href="/#services">Services</a></li>' +
          '<li><a href="/#pricing">Pricing</a></li>' +
          '<li><a href="/blog/">Blog</a></li>' +
        '</ul>' +
        '<a href="#get-website" class="btn btn-primary nav-cta" data-cta="nav">Get a website →</a>' +
        '<button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '</div></nav>' +
      '<div class="mobile-menu" id="mobile-menu"><ul>' +
        '<li><a href="/tools/">Free Tools</a></li>' +
        '<li><a href="/#services">Services</a></li>' +
        '<li><a href="/#pricing">Pricing</a></li>' +
        '<li><a href="/blog/">Blog</a></li>' +
        '<li><a href="#get-website">Get a website</a></li>' +
      '</ul></div>';
  }

  function pitchHTML(p, toolName) {
    var opts = ['Business website', 'Online store / D2C website', 'Website with online payments', 'Billing / invoice automation',
      'AI workflow automation', 'WhatsApp / AI chatbot', 'Google & Meta ads', 'Not sure yet'];
    if (opts.indexOf(p.need) === -1) opts.unshift(p.need);
    var waText = 'Hi Solvv AI, I used your free ' + toolName + ' and want to know more about ' + p.need.toLowerCase() + '.';
    return '' +
      '<section class="pitch" id="get-website"><div class="container"><div class="pitch-box">' +
        '<div>' +
          '<div class="pitch-kicker">' + S.esc(p.kicker) + '</div>' +
          '<h2>' + S.esc(p.title) + '</h2>' +
          '<p>' + S.esc(p.body) + '</p>' +
          '<ul class="pitch-points">' + p.points.map(function (x) { return '<li>' + S.esc(x) + '</li>'; }).join('') + '</ul>' +
        '</div>' +
        '<form class="lead-form" id="lead-form" novalidate>' +
          '<h3>Get a free consultation</h3>' +
          '<p>Tell us about your business. We reply on WhatsApp within a few hours.</p>' +
          '<input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">' +
          '<div class="f"><label for="lf-name">Your name</label><input id="lf-name" name="name" required autocomplete="name"></div>' +
          '<div class="f"><label for="lf-phone">Mobile number (WhatsApp)</label><input id="lf-phone" name="phone" type="tel" inputmode="tel" required autocomplete="tel" placeholder="98765 43210"></div>' +
          '<div class="f"><label for="lf-email">Email</label><input id="lf-email" name="email" type="email" required autocomplete="email" placeholder="you@business.in"></div>' +
          '<div class="f"><label for="lf-city">City</label><input id="lf-city" name="city" required autocomplete="address-level2" placeholder="e.g. Pune"></div>' +
          '<div class="f"><label for="lf-biz">Business name &amp; type</label><input id="lf-biz" name="business" placeholder="e.g. Sharma Sweets, bakery"></div>' +
          '<div class="f"><label for="lf-need">What do you need?</label><select id="lf-need" name="need">' +
            opts.map(function (o) { return '<option' + (o === p.need ? ' selected' : '') + '>' + S.esc(o) + '</option>'; }).join('') +
          '</select></div>' +
          '<button type="submit" class="btn btn-primary">Get my free consultation →</button>' +
          '<div class="lead-msg" id="lead-msg" role="status"></div>' +
          '<div class="lead-or">or <a href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(waText) + '" target="_blank" rel="noopener" data-cta="pitch-wa">chat on WhatsApp</a></div>' +
        '</form>' +
      '</div></div></section>';
  }

  function relatedHTML(sl) {
    var tl = bySlug[sl];
    var others = TOOLS.filter(function (t) { return t.slug !== sl; });
    var same = others.filter(function (t) { return tl && t.group === tl.group; });
    var rest = others.filter(function (t) { return same.indexOf(t) === -1; });
    var list = same.concat(rest).slice(0, 8);
    return '<section class="related"><div class="container"><h2>More free tools for your business</h2>' +
      '<div class="tool-grid">' + list.map(cardHTML).join('') + '</div></div></section>';
  }
  function cardHTML(t) {
    return '<a class="tool-card" href="/' + t.slug + '/"><span class="ti">' + t.icon + '</span><strong>' + S.esc(t.name) + '</strong><span>' + S.esc(t.blurb) + '</span></a>';
  }
  S.cardHTML = cardHTML;

  function footerHTML(sl) {
    var tl = bySlug[sl];
    return '' +
      '<footer class="footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand"><div class="footer-logo">SOLVV<span>AI</span></div>' +
            '<p>Websites, AI agents and automations for growing businesses. Delivered in 7 days.</p></div>' +
          '<div class="footer-col"><h4>Business tools</h4><ul>' +
            TOOLS.filter(function (t) { return ['Loans & EMI', 'Savings', 'Investing'].indexOf(t.group) === -1; }).slice(0, 7).map(function (t) { return '<li><a href="/' + t.slug + '/">' + S.esc(t.name) + '</a></li>'; }).join('') +
          '</ul></div>' +
          '<div class="footer-col"><h4>Money calculators</h4><ul>' +
            ['emi-calculator', 'home-loan-emi-calculator', 'sip-calculator', 'fd-calculator', 'ppf-calculator', 'retirement-calculator'].map(function (k) { return '<li><a href="/' + k + '/">' + S.esc(bySlug[k].name) + '</a></li>'; }).join('') +
            '<li><a href="/tools/"><b>All ' + TOOLS.length + ' free tools →</b></a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Solvv AI</h4><ul>' +
            '<li><a href="/#services">Services</a></li><li><a href="/#pricing">Pricing</a></li>' +
            '<li><a href="/blog/">Blog</a></li><li><a href="/#contact">Contact</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom"><p>© 2026 Solvv AI. Free tools are for estimates only. Check figures with your CA before filing.</p>' +
          '<div class="footer-links-bottom"><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div></div>' +
      '</div></footer>' +
      '<a href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hi Solvv AI, I came from your free ' + (tl ? tl.name : 'business tools') + ' page.') +
        '" target="_blank" rel="noopener noreferrer" class="wa-float" aria-label="Chat on WhatsApp" data-cta="wa-float">' +
        '<svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
        '<span class="wa-label">Questions? Chat with us →</span></a>';
  }

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  var generalPitch = { kicker: 'Built by Solvv AI', title: 'Your business deserves a website that sells',
    body: 'We build fast, mobile-first websites with AI assistants and automations for Indian businesses, delivered in 7 days.',
    points: ['Custom website designed for your customers', 'WhatsApp, payments and lead capture built in', 'SEO so customers find you on Google'],
    need: 'Business website' };

  function hubHTML() {
    var groups = [];
    TOOLS.forEach(function (t) { if (groups.indexOf(t.group) === -1) groups.push(t.group); });
    return groups.map(function (g) {
      return '<div class="hub-group"><h2>' + S.esc(g) + '</h2><div class="tool-grid">' +
        TOOLS.filter(function (t) { return t.group === g; }).map(cardHTML).join('') + '</div></div>';
    }).join('');
  }

  /* Used by scripts/prerender.js to write these sections into the page HTML */
  S.render = function (sl) {
    var tl = bySlug[sl];
    return {
      nav: navHTML(sl),
      pitch: pitchHTML(tl ? tl.pitch : generalPitch, tl ? tl.name : 'business tools'),
      related: sl === 'hub' ? '' : relatedHTML(sl),
      footer: footerHTML(sl),
      hub: hubHTML()
    };
  };

  /* Pages are pre-rendered; these only fill placeholders that are still empty */
  var R = S.render(slug);
  mount('t-nav', R.nav);
  mount('t-pitch', R.pitch);
  if (slug !== 'hub') mount('t-related', R.related);
  mount('t-footer', R.footer);
  var hub = document.getElementById('t-hub');
  if (hub && !hub.children.length) hub.innerHTML = R.hub;

  /* Mobile menu */
  var ham = document.getElementById('hamburger');
  var mm = document.getElementById('mobile-menu');
  if (ham && mm) {
    ham.addEventListener('click', function () {
      ham.classList.toggle('open');
      mm.classList.toggle('open');
      document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
    });
    mm.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { ham.classList.remove('open'); mm.classList.remove('open'); document.body.style.overflow = ''; });
    });
  }

  /* CTA tracking */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cta]');
    if (a) S.track('tool_cta_click', { cta_label: a.dataset.cta, tool: slug });
  });

  /* First interaction with any tool input counts as a use */
  document.addEventListener('input', function (e) {
    if (e.target.closest('.t-main')) S.used();
  });

  /* ─── LEADS ─── */
  var LEAD_KEY = 'solvv_lead_v1';
  S.lead = (function () { try { return JSON.parse(localStorage.getItem(LEAD_KEY)); } catch (e) { return null; } })();
  S.unlocked = function () { return !!S.lead; };
  function setLead(l) {
    S.lead = l;
    try { localStorage.setItem(LEAD_KEY, JSON.stringify(l)); } catch (e) {}
    document.body.classList.add('lead-ok');
  }
  if (S.lead) document.body.classList.add('lead-ok');

  /* Validates name / Indian mobile / email / city. Returns {data} or {err, field} */
  function readLead(form) {
    var el = form.elements;
    var name = el['name'].value.trim();
    var mobile = el['phone'].value.replace(/\D/g, '').replace(/^(?:91|0)(?=\d{10}$)/, '');
    var email = el['email'].value.trim();
    var city = el['city'].value.trim();
    if (name.length < 2) return { err: 'Please enter your name.', field: 'name' };
    if (!/^[6-9]\d{9}$/.test(mobile)) return { err: 'Please enter a valid 10-digit mobile number.', field: 'phone' };
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return { err: 'Please enter a valid email address.', field: 'email' };
    if (city.length < 2) return { err: 'Please enter your city.', field: 'city' };
    if (el['botcheck'] && el['botcheck'].checked) return { err: ' ', field: 'name' };
    return { data: { name: name, phone: '+91 ' + mobile, email: email, city: city } };
  }

  function sendLead(data, extra) {
    var toolName = tool ? tool.name : 'Tools hub';
    var payload = Object.assign({
      access_key: WEB3FORMS_KEY,
      subject: 'Free tool lead — ' + toolName + ' — ' + data.city,
      from_name: 'Solvv AI Free Tools',
      tool: toolName,
      page: location.href,
      botcheck: false
    }, data, extra || {});
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); }).then(function (json) {
      if (!json.success) throw new Error(json.message || 'failed');
      S.track('generate_lead', { tool: toolName, source: (extra && extra.source) || 'form' });
      return json;
    });
  }

  function wireForm(form, msgEl, opts) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var r = readLead(form);
      msgEl.className = 'lead-msg';
      if (r.err) { msgEl.textContent = r.err; msgEl.classList.add('err'); form.elements[r.field].focus(); return; }
      var btn = form.querySelector('button[type="submit"]'), label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…';
      sendLead(r.data, opts.extra(form)).then(function () {
        setLead(r.data);
        opts.done(form, msgEl);
      }).catch(function () {
        msgEl.innerHTML = 'Something went wrong. Please try again or <a href="https://wa.me/' + WA_NUMBER + '" target="_blank" rel="noopener">WhatsApp us</a>.';
        msgEl.classList.add('err');
      }).then(function () { btn.disabled = false; btn.textContent = label; });
    });
  }

  /* Pitch form */
  var lf = document.getElementById('lead-form');
  if (lf) {
    if (S.lead) ['name', 'phone', 'email', 'city'].forEach(function (k) { lf.elements[k].value = S.lead[k].replace(/^\+91 /, ''); });
    wireForm(lf, document.getElementById('lead-msg'), {
      extra: function (f) { return { business: f.elements['business'].value.trim(), need: f.elements['need'].value, source: 'consultation' }; },
      done: function (f, m) { m.textContent = "Thanks! We'll message you on WhatsApp shortly."; m.classList.add('ok'); }
    });
  }

  /* Gate modal: asks for details once per device before downloads, copies, shares and full results */
  var gateEl, gateCb;
  function buildGate() {
    gateEl = document.createElement('div');
    gateEl.className = 'gate';
    gateEl.innerHTML =
      '<div class="gate-box" role="dialog" aria-modal="true" aria-labelledby="gate-title">' +
        '<button type="button" class="gate-x" aria-label="Close">×</button>' +
        '<div class="pitch-kicker">Free · takes 20 seconds</div>' +
        '<h3 id="gate-title">Where should we send updates?</h3>' +
        '<p class="gate-sub">Share your details once to unlock this tool. We may send you useful business tips on WhatsApp. No spam.</p>' +
        '<form id="gate-form" novalidate>' +
          '<input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">' +
          '<div class="f"><label for="g-name">Your name</label><input id="g-name" name="name" autocomplete="name" required></div>' +
          '<div class="f-row f-row--keep" style="margin-top:12px">' +
            '<div class="f"><label for="g-phone">Mobile number</label><input id="g-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="98765 43210" required></div>' +
            '<div class="f"><label for="g-city">City</label><input id="g-city" name="city" autocomplete="address-level2" placeholder="Pune" required></div>' +
          '</div>' +
          '<div class="f" style="margin-top:12px"><label for="g-email">Email</label><input id="g-email" name="email" type="email" autocomplete="email" placeholder="you@business.in" required></div>' +
          '<button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:18px">Unlock now →</button>' +
          '<div class="lead-msg" id="gate-msg" role="status"></div>' +
          '<p class="gate-fine">We use these details only to contact you about Solvv AI services. See our <a href="/privacy.html" target="_blank">privacy policy</a>.</p>' +
        '</form>' +
      '</div>';
    document.body.appendChild(gateEl);
    gateEl.addEventListener('click', function (e) {
      if (e.target.closest('.gate-x')) { closeGate(); return; }
      /* Backdrop click closes, but not in the first moments after opening (double-clicks) */
      if (e.target === gateEl && Date.now() - (gateEl._openedAt || 0) > 500) closeGate();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && gateEl.classList.contains('open')) closeGate(); });
    wireForm(document.getElementById('gate-form'), document.getElementById('gate-msg'), {
      extra: function () { return { source: 'unlock', action: gateEl.dataset.reason || '' }; },
      done: function () {
        closeGate();
        S.toast('Unlocked. Thank you!');
        var cb = gateCb; gateCb = null;
        if (cb) setTimeout(cb, 250);
      }
    });
  }
  function closeGate() { gateEl.classList.remove('open'); document.body.style.overflow = ''; }

  /* S.gate(reason, cb): run cb now if details were shared, otherwise ask first */
  S.gate = function (reason, cb) {
    if (S.lead && document.body.classList.contains('lead-ok')) { if (cb) cb(); return; }
    try {
      if (!gateEl) buildGate();
      gateCb = cb; gateEl.dataset.reason = reason || '';
      gateEl._openedAt = Date.now();
      gateEl.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { var n = document.getElementById('g-name'); if (n) n.focus(); }, 60);
    } catch (err) {
      if (window.console) console.error('Solvv gate failed', err);
      S.toast('Something went wrong. Please refresh the page and try again.');
    }
    try { S.track('tool_gate_shown', { tool: slug, reason: reason }); } catch (e) {}
  };

  /* Gated breakdowns: <div class="gated"> blurs until unlocked */
  document.querySelectorAll('.gated').forEach(function (g) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'btn btn-primary gate-unlock'; b.textContent = '🔓 Show full breakdown';
    g.appendChild(b);
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.gate-unlock');
    if (!b) return;
    e.preventDefault();
    S.gate('breakdown');
  });

  /* ─── FREE LIMIT: one document per device; nothing about the document is stored ─── */
  var FREE_KEY = 'solvv_free_used_';
  S.freeUsed = function (kind) { try { return localStorage.getItem(FREE_KEY + kind) === '1'; } catch (e) { return false; } };
  function markUsed(kind) { try { localStorage.setItem(FREE_KEY + kind, '1'); } catch (e) {} }

  /* Replace the editor with the "free one used" panel */
  S.lockDoc = function (container, label) {
    var p = tool ? tool.pitch : {};
    var wa = 'Hi Solvv AI, I used my free ' + label + ' and want unlimited ' + label + 's for my business.';
    container.style.gridTemplateColumns = 'minmax(0,1fr)';
    container.innerHTML =
      '<div class="limit-box">' +
        '<div class="li">🎉</div>' +
        '<h2>You\'ve used your free ' + S.esc(label) + '</h2>' +
        '<p>Need more? We set up ' + S.esc((p.need || 'billing automation').toLowerCase()) + ' for your business, so every ' + S.esc(label) +
          ' is created and sent on WhatsApp automatically. No more manual work.</p>' +
        '<div class="r-actions">' +
          '<a class="btn btn-primary" href="#get-website" data-cta="limit-consult">Get unlimited for my business →</a>' +
          '<a class="btn btn-wa" href="https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(wa) + '" target="_blank" rel="noopener" data-cta="limit-wa">Chat on WhatsApp</a>' +
        '</div>' +
      '</div>';
    var tabs = document.getElementById('view-tabs');
    if (tabs) tabs.style.display = 'none';
  };

  /* Ask for details, print, then clear and lock. afterDone() wipes the in-memory document. */
  S.printOnce = function (kind, label, container, afterDone) {
    if (S.freeUsed(kind)) { S.lockDoc(container, label); return; }
    S.gate('download', function () {
      var finished = false;
      function finish() {
        if (finished) return;
        finished = true;
        window.removeEventListener('afterprint', finish);
        markUsed(kind);
        if (afterDone) afterDone();
        S.lockDoc(container, label);
        window.scrollTo({ top: container.getBoundingClientRect().top + window.scrollY - 100 });
      }
      window.addEventListener('afterprint', finish);
      S.track('tool_download', { tool: slug });
      window.print();
      /* Browsers without afterprint (some mobile) */
      setTimeout(function () { if (!finished) window.addEventListener('focus', finish, { once: true }); }, 1000);
      setTimeout(finish, 60000);
    });
  };

  /* Wrap the shared actions so they always ask first */
  var _copy = S.copy, _share = S.shareWA, _print = S.print;
  S.copy = function (t) { S.gate('copy', function () { _copy(t); }); };
  S.shareWA = function (t) { S.gate('share', function () { _share(t); }); };
  S.print = function () { S.gate('download', function () { _print(); }); };
})();
