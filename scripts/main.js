import { siteConfig, capabilityPills, projectCatalog, toolRoomInventory, clientsList, processWorkflow } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderCapabilityPills();
  renderProjectCatalog();
  renderToolRoomTable();
  renderClients();
  initRFQCalculator();
  initMachineModal();
  initMetricsCounter();
});

/* ==========================================================================
   NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky background on scroll
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
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-surface)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderRadius = 'var(--radius-lg)';
        navMenu.style.border = '1px solid var(--border-medium)';
        navMenu.style.marginTop = '0.5rem';
      }
    });
  }
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

  container.innerHTML = capabilityPills.map(item => `
    <div class="capability-pill-card">
      <div class="pill-icon-wrap">
        ${icons[item.icon] || icons.layers}
      </div>
      <h3 class="pill-title">${item.title}</h3>
      <p class="pill-desc">${item.desc}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   PROJECT CATALOGUE & FILTERING
   ========================================================================== */
let activeCategory = 'all';

function renderProjectCatalog() {
  const container = document.getElementById('projectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!container) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      displayFilteredProjects();
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

  container.innerHTML = filtered.map(p => {
    const specEntries = Object.entries(p.specs).slice(0, 2);
    return `
      <div class="project-card" data-id="${p.id}">
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
            <span>Inspect Technical Specs</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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
      <tr>
        <td style="font-family: var(--font-mono); color: var(--text-dim);">${item.sNo}</td>
        <td style="font-weight: 700; color: #FFFFFF;">${item.machine}</td>
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
    clientsGrid.innerHTML = clientsList.slice(0, 16).map(c => `
      <div class="client-card-item">
        <h4 class="client-card-name">${c.name}</h4>
        <span class="client-card-plant">${c.plant}</span>
        <span class="client-card-cat">${c.category}</span>
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

    if (resLineType) resLineType.textContent = lineType;
    if (resPokaYoke) resPokaYoke.textContent = pokaYoke;
    if (resFeasibility) resFeasibility.textContent = feasibility;
    if (resEstLeadTime) resEstLeadTime.textContent = leadTime;
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
   METRICS COUNTER ANIMATION
   ========================================================================== */
function initMetricsCounter() {
  const metricValues = document.querySelectorAll('.metric-value');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricValues.forEach(el => {
          const text = el.textContent;
          // Extract numbers if simple
          const target = parseInt(text.replace(/\D/g, ''));
          if (isNaN(target)) return;

          let count = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            count += step;
            if (count >= target) {
              el.textContent = text;
              clearInterval(interval);
            } else {
              el.textContent = text.replace(target.toString(), count.toString());
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-bar-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

// Global RFQ Submission Handler
window.handleRFQSubmit = function(e) {
  e.preventDefault();
  alert("Thank you! Your Technical RFQ configuration has been received. Our engineering team at Pace City II, Gurgaon will review your requirements and reach out within 24 hours.");
};
