import { siteConfig, capabilityPills, projectCatalog, toolRoomInventory, clientsList, processWorkflow } from './data.js';

// Apply initial theme immediately to prevent flashing
(function() {
  const savedTheme = localStorage.getItem('faith_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  renderCapabilityPills();
  renderProjectCatalog();
  renderToolRoomTable();
  renderClients();
  initRFQCalculator();
  initMachineModal();
  initMetricsCounter();
  initScrollReveal();
});

/* ==========================================================================
   THEME TOGGLE SYSTEM (LIGHT / DARK)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('btnThemeToggle');
  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('faith_theme', nextTheme);
  });
}

/* ==========================================================================
   NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky background on scroll with smooth transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Set active link based on current page URL
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/') || (currentPath.endsWith(href) && href !== '/')) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  if (mobileToggle && navMenu) {
    // Inject mobile drawer CTA if not present
    if (!navMenu.querySelector('.nav-menu-cta-mobile')) {
      const mobileCta = document.createElement('div');
      mobileCta.className = 'nav-menu-cta-mobile';
      mobileCta.innerHTML = `
        <a href="/rfq.html" class="btn-cta-primary" style="width: 100%; justify-content: center; padding: 0.85rem; font-size: 0.95rem; box-sizing: border-box;">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          <span>Request Technical RFQ</span>
        </a>
        <div style="font-size: 0.8rem; color: var(--text-dim); text-align: center; margin-top: 0.5rem; font-family: var(--font-mono);">
          Direct Engineering: +91 9990813151
        </div>
      `;
      navMenu.appendChild(mobileCta);
    }

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll(`
    .section-header, 
    .capability-pill-card, 
    .project-card, 
    .advantage-card, 
    .metric-card, 
    .client-card-item, 
    .workflow-step-card, 
    .table-responsive-box, 
    .conversion-box, 
    .hero-card-featured
  `);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  // Apply stagger classes within parent grids
  const grids = document.querySelectorAll(`
    .capability-pills-grid, 
    .projects-grid, 
    .advantages-grid, 
    .metrics-grid, 
    .clients-grid
  `);

  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, idx) => {
      child.classList.add('reveal', `stagger-${(idx % 6) + 1}`);
      observer.observe(child);
    });
  });

  // Observe standalone elements
  targets.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      observer.observe(el);
    }
  });
}

/* ==========================================================================
   5-PILL CAPABILITY HIGHLIGHTS BAR
   ========================================================================== */
function renderCapabilityPills() {
  const container = document.getElementById('capabilityPillsContainer');
  if (!container) return;

  const icons = {
    layers: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    cpu: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    eye: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    tool: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    "shield-check": `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`
  };

  container.innerHTML = capabilityPills.map((item, idx) => `
    <div class="capability-pill-card reveal stagger-${idx + 1}">
      <div class="pill-icon-wrap">
        ${icons[item.icon] || icons.layers}
      </div>
      <h3 class="pill-title">${item.title}</h3>
      <p class="pill-desc">${item.desc}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   PROJECT CATALOGUE & FILTERING WITH ANIMATION
   ========================================================================== */
let activeCategory = 'all';

function renderProjectCatalog() {
  const container = document.getElementById('projectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!container) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');

      // Smooth fade-out before updating
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'opacity 0.22s ease, transform 0.22s ease';

      setTimeout(() => {
        displayFilteredProjects();
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 230);
    });
  });

  displayFilteredProjects();
}

function displayFilteredProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const filtered = activeCategory === 'all'
    ? projectCatalog
    : projectCatalog.filter(p => p.category === activeCategory);

  container.innerHTML = filtered.map((p, idx) => {
    const specEntries = Object.entries(p.specs).slice(0, 2);
    return `
      <div class="project-card reveal revealed stagger-${(idx % 6) + 1}" data-id="${p.id}">
        <div class="project-thumb-box">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
          <span class="project-badge-tag">${p.category}</span>
        </div>
        <div class="project-body">
          <span class="project-client-tag">OEM / Tier-1: ${p.client}</span>
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-desc">${p.description}</p>
          <div class="project-specs-mini">
            ${specEntries.map(([k, v]) => `
              <div class="spec-mini-item">
                <span class="spec-mini-k">${k}</span>
                <span class="spec-mini-v">${v}</span>
              </div>
            `).join('')}
          </div>
          <button class="btn-inspect-machine" onclick="window.openMachineModal('${p.id}')">
            <span>Machine Specifications</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   TOOL ROOM INVENTORY TABLE
   ========================================================================== */
function renderToolRoomTable() {
  const tableBody = document.getElementById('toolRoomTableBody');
  const searchInput = document.getElementById('toolRoomSearch');
  if (!tableBody) return;

  function updateTable(filter = '') {
    const list = toolRoomInventory.filter(item =>
      item.machine.toLowerCase().includes(filter.toLowerCase()) ||
      item.spec.toLowerCase().includes(filter.toLowerCase())
    );

    tableBody.innerHTML = list.map(item => `
      <tr style="transition: background 0.2s ease;">
        <td style="font-family: var(--font-mono); color: var(--text-dim);">${item.sNo}</td>
        <td style="font-weight: 700; color: var(--text-title);">${item.machine}</td>
        <td style="font-family: var(--font-mono); color: var(--text-secondary);">${item.spec}</td>
        <td style="font-family: var(--font-mono); font-weight: 700; color: var(--brand-cyan-light);">${item.qty} Unit${item.qty > 1 ? 's' : ''}</td>
        <td>
          <span class="badge-status-online">
            <span class="pulse-dot" style="width: 6px; height: 6px;"></span>
            ${item.status}
          </span>
        </td>
      </tr>
    `).join('');
  }

  updateTable();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      updateTable(e.target.value);
    });
  }
}

/* ==========================================================================
   ESTEEMED CLIENTS GRID & TICKER
   ========================================================================== */
function renderClients() {
  const tickerTrack = document.getElementById('clientsTickerTrack');
  const clientsGrid = document.getElementById('clientsGrid');

  if (tickerTrack) {
    const items = clientsList.map(c => `
      <div class="ticker-item">${c.name} (${c.plant})</div>
    `).join('');
    // Duplicate for seamless infinite loop
    tickerTrack.innerHTML = items + items;
  }

  if (clientsGrid) {
    clientsGrid.innerHTML = clientsList.map((c, idx) => `
      <div class="client-card-item reveal stagger-${(idx % 6) + 1}">
        <div class="client-card-name">${c.name}</div>
        <div class="client-card-plant">${c.plant}</div>
        <div class="client-card-cat">${c.category}</div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   INTERACTIVE RFQ & FEASIBILITY ESTIMATOR
   ========================================================================== */
function initRFQCalculator() {
  const componentSelect = document.getElementById('rfqComponent');
  const autoTierSelect = document.getElementById('rfqTier');
  const cycleTimeInput = document.getElementById('rfqCycleTime');
  
  const resLineType = document.getElementById('resLineType');
  const resPokaYoke = document.getElementById('resPokaYoke');
  const resFeasibility = document.getElementById('resFeasibility');
  const resEstLeadTime = document.getElementById('resEstLeadTime');

  function calculate() {
    if (!componentSelect || !autoTierSelect) return;
    const comp = componentSelect.value;
    const tier = autoTierSelect.value;
    const cycle = parseInt(cycleTimeInput ? cycleTimeInput.value : 30) || 30;

    let lineType = "Multi-Station SPM";
    let pokaYoke = "Optical & Sensor Verification";
    let leadTime = "6-8 Weeks";
    let feasibility = "High Feasibility (Standard Tooling)";

    if (tier === "robotic") {
      lineType = "6-Axis Turnkey Robotic Cell";
      pokaYoke = "Laser Seating & Dual-Hand Safety Curtains";
      leadTime = "8-12 Weeks";
    } else if (tier === "automatic") {
      lineType = "Fully Automated Palletized Conveyor Line";
      pokaYoke = "Vision System + 2D Barcode MES Logging";
      leadTime = "8-10 Weeks";
    } else {
      lineType = "Ergonomic Manual + Pneumatic Assembly SPM";
      pokaYoke = "Sensorized Screw Fasteners & Seating Probes";
      leadTime = "4-6 Weeks";
    }

    if (cycle < 15) {
      feasibility = "Automated Dual-Nest Required";
    } else if (cycle > 45) {
      feasibility = "Optimized Single-Operator Flow";
    }

    const updateWithAnimation = (el, text) => {
      if (!el) return;
      el.textContent = text;
      el.classList.remove('calc-updated');
      void el.offsetWidth; // Trigger reflow for animation restart
      el.classList.add('calc-updated');
    };

    updateWithAnimation(resLineType, lineType);
    updateWithAnimation(resPokaYoke, pokaYoke);
    updateWithAnimation(resFeasibility, feasibility);
    updateWithAnimation(resEstLeadTime, leadTime);
  }

  if (componentSelect) componentSelect.addEventListener('change', calculate);
  if (autoTierSelect) autoTierSelect.addEventListener('change', calculate);
  if (cycleTimeInput) cycleTimeInput.addEventListener('input', calculate);

  calculate();
}

/* ==========================================================================
   MACHINE INSPECTION MODAL
   ========================================================================== */
function initMachineModal() {
  const modal = document.getElementById('machineInspectionModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  window.openMachineModal = function(id) {
    const project = projectCatalog.find(p => p.id === id);
    if (!project || !modal) return;

    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalClient').textContent = `Target OEM: ${project.client}`;
    document.getElementById('modalDesc').textContent = project.description;

    const specsBody = document.getElementById('modalSpecsBody');
    if (specsBody) {
      specsBody.innerHTML = Object.entries(project.specs).map(([k, v]) => `
        <tr>
          <td>${k}</td>
          <td>${v}</td>
        </tr>
      `).join('');
    }

    modal.classList.add('active');
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   METRICS COUNTER ANIMATION (SMOOTH CUBIC EASE-OUT)
   ========================================================================== */
function initMetricsCounter() {
  const metricCards = document.querySelectorAll('.metric-card');
  if (!metricCards.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricCards.forEach(card => {
          const el = card.querySelector('.metric-value');
          if (!el) return;
          const fullText = el.textContent.trim();
          const target = parseInt(fullText.replace(/\D/g, ''));
          if (isNaN(target)) return;

          const suffix = fullText.replace(/^[0-9]+/, '');
          const duration = 1800; // ms
          const startTime = performance.now();

          function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            el.textContent = `${current}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = fullText;
              el.classList.add('calc-updated');
            }
          }

          requestAnimationFrame(step);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const metricsSection = document.querySelector('.metrics-bar-section') || metricCards[0];
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

// Global RFQ Submission Handler
window.handleRFQSubmit = function(e) {
  e.preventDefault();
  alert("Thank you! Your Technical RFQ configuration has been received. Our engineering team at Pace City II, Gurgaon will review your requirements and reach out within 24 hours.");
};
