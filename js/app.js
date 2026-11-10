/**
 * ANIKET — INTERIOR ARCHITECTURE & DESIGN STUDIO
 * Application Controller & Architectural Spatial Background Engine
 */

(function () {
  "use strict";

  // Helper selectors
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return document.querySelectorAll(s); };

  // --------------------------------------------------------------------------
  // 1. Theme Switcher (Dark / Light) with Local Storage
  // --------------------------------------------------------------------------
  var themeToggleBtn = $("#themeToggle");
  var themeIconSun = $("#themeIconSun");
  var themeIconMoon = $("#themeIconMoon");

  function getPreferredTheme() {
    var stored = localStorage.getItem("aniket-theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("aniket-theme", theme);

    if (themeIconSun && themeIconMoon) {
      if (theme === "dark") {
        themeIconSun.style.display = "block";
        themeIconMoon.style.display = "none";
      } else {
        themeIconSun.style.display = "none";
        themeIconMoon.style.display = "block";
      }
    }
  }

  var currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      var nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      showToast(nextTheme === "dark" ? "Dark atmosphere active" : "Natural light mode active");
    });
  }

  // --------------------------------------------------------------------------
  // 2. Creative Architectural Spatial Canvas & Morphing Wireframe Engine
  // --------------------------------------------------------------------------
  var canvas = $("#archCanvas");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var width = 0, height = 0, dpr = 1;
  var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  var scrollProgress = 0; // 0.0 to 4.0 matching sections
  var targetProgress = 0;
  var sectionNames = ["studio", "projects", "expertise", "journal"];

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  window.addEventListener("pointermove", function (e) {
    mouse.targetX = (e.clientX / width - 0.5) * 60; // Parallax range
    mouse.targetY = (e.clientY / height - 0.5) * 40;
  }, { passive: true });

  // Compute scroll morph position across sections
  function updateScrollProgress() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;

    // Track scroll through section midpoints
    var studioEl = $("#studio");
    var projectsEl = $("#projects");
    var expertiseEl = $("#expertise");
    var journalEl = $("#journal");
    var points = [
      studioEl ? studioEl.offsetTop : 0,
      projectsEl ? projectsEl.offsetTop : 600,
      expertiseEl ? expertiseEl.offsetTop : 1400,
      journalEl ? journalEl.offsetTop : 2200
    ];

    var idx = 0;
    for (var i = 0; i < points.length - 1; i++) {
      if (scrollY >= points[i] && scrollY < points[i + 1]) {
        var span = points[i + 1] - points[i];
        var pct = span > 0 ? (scrollY - points[i]) / span : 0;
        targetProgress = i + pct;
        return;
      }
    }
    if (scrollY >= points[points.length - 1]) {
      targetProgress = points.length - 1;
    } else {
      targetProgress = 0;
    }
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Color helper based on dark / light mode
  function getArchStyles() {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      line: isDark ? "rgba(235, 230, 220, 0.10)" : "rgba(35, 30, 25, 0.08)",
      lineAccent: isDark ? "rgba(215, 175, 135, 0.35)" : "rgba(156, 108, 68, 0.30)",
      beam: isDark ? "rgba(215, 175, 135, 0.03)" : "rgba(156, 108, 68, 0.025)",
      dot: isDark ? "rgba(235, 230, 220, 0.3)" : "rgba(35, 30, 25, 0.25)",
      fontColor: isDark ? "rgba(235, 230, 220, 0.25)" : "rgba(35, 30, 25, 0.2)"
    };
  }

  // Draw Architectural Geometry with Smooth Parametric Interpolation
  function renderArchCanvas(time) {
    if (!ctx) return;

    // Smooth lerp for mouse parallax and scroll morph
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
    scrollProgress += (targetProgress - scrollProgress) * 0.06;

    ctx.clearRect(0, 0, width, height);

    var styles = getArchStyles();
    ctx.lineWidth = 1;

    var cx = width * 0.5 + mouse.x;
    var cy = height * 0.48 + mouse.y;
    var morph = scrollProgress; // 0 (studio) -> 1 (projects) -> 2 (expertise) -> 3 (journal) -> 4 (contact)

    // Base Horizon Datum Line
    ctx.strokeStyle = styles.line;
    ctx.beginPath();
    ctx.moveTo(40, cy);
    ctx.lineTo(width - 40, cy);
    ctx.stroke();

    // ------------------------------------------------------------------------
    // GEOMETRY LAYER 1: Perspective Spatial Portal (Dominant in Studio & Contact)
    // ------------------------------------------------------------------------
    var portalWeight = Math.max(0, 1 - Math.abs(morph - 0)) * 0.9 + Math.max(0, morph - 3.2) * 0.8;
    if (portalWeight > 0.02) {
      ctx.save();
      ctx.globalAlpha = portalWeight;

      // Vanishing Point Grid
      var vpX = cx;
      var vpY = cy - 20;

      // Floor Rays (1-point perspective)
      ctx.strokeStyle = styles.line;
      for (var f = -width * 0.6; f <= width * 0.6; f += 90) {
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(cx + f * 2.2, height);
        ctx.stroke();
      }

      // Ceiling Rays
      for (var c = -width * 0.6; c <= width * 0.6; c += 120) {
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(cx + c * 2.2, 0);
        ctx.stroke();
      }

      // Transverse Floor Joists
      for (var j = 1; j <= 5; j++) {
        var jy = vpY + (height - vpY) * Math.pow(j / 5, 2.2);
        ctx.beginPath();
        ctx.moveTo(cx - (width * 0.7) * (j / 5), jy);
        ctx.lineTo(cx + (width * 0.7) * (j / 5), jy);
        ctx.stroke();
      }

      // Architectural Arch Portals (Concentric Spatial Gateways)
      for (var a = 1; a <= 3; a++) {
        var archW = 180 + a * 140;
        var archH = 240 + a * 110;
        var archTop = vpY - archH * 0.65;
        var archBottom = vpY + archH * 0.55;

        ctx.strokeStyle = a === 2 ? styles.lineAccent : styles.line;
        ctx.beginPath();
        // Left pillar
        ctx.moveTo(cx - archW * 0.5, archBottom);
        ctx.lineTo(cx - archW * 0.5, archTop + archW * 0.5);
        // Rounded arch ceiling
        ctx.arc(cx, archTop + archW * 0.5, archW * 0.5, Math.PI, 0, false);
        // Right pillar
        ctx.lineTo(cx + archW * 0.5, archBottom);
        ctx.stroke();

        // Subtle crosshair tick on crown
        ctx.beginPath();
        ctx.moveTo(cx - 8, archTop);
        ctx.lineTo(cx + 8, archTop);
        ctx.stroke();
      }

      ctx.restore();
    }

    // ------------------------------------------------------------------------
    // GEOMETRY LAYER 2: Modular Elevation & Facade Grid (Dominant in Projects)
    // ------------------------------------------------------------------------
    var elevWeight = Math.max(0, 1 - Math.abs(morph - 1));
    if (elevWeight > 0.02) {
      ctx.save();
      ctx.globalAlpha = elevWeight;

      var elevLeft = width * 0.12 + mouse.x * 0.5;
      var elevRight = width * 0.88 + mouse.x * 0.5;
      var elevTop = height * 0.18 + mouse.y * 0.5;
      var elevBottom = height * 0.82 + mouse.y * 0.5;

      // Facade Framing
      ctx.strokeStyle = styles.lineAccent;
      ctx.strokeRect(elevLeft, elevTop, elevRight - elevLeft, elevBottom - elevTop);

      // Modular Bays (Vertical Columns)
      ctx.strokeStyle = styles.line;
      var bays = 5;
      var bayW = (elevRight - elevLeft) / bays;
      for (var b = 1; b < bays; b++) {
        var bx = elevLeft + b * bayW;
        ctx.beginPath();
        ctx.moveTo(bx, elevTop - 20);
        ctx.lineTo(bx, elevBottom + 20);
        ctx.stroke();

        // Axis Label Tick
        ctx.fillStyle = styles.fontColor;
        ctx.font = "9px Inter, sans-serif";
        ctx.fillText("AXIS 0" + b, bx - 16, elevTop - 28);
      }

      // Floor Slabs (Horizontal Levels)
      var levels = 3;
      var levelH = (elevBottom - elevTop) / levels;
      for (var l = 1; l < levels; l++) {
        var ly = elevTop + l * levelH;
        ctx.beginPath();
        ctx.moveTo(elevLeft - 30, ly);
        ctx.lineTo(elevRight + 30, ly);
        ctx.stroke();

        ctx.fillStyle = styles.fontColor;
        ctx.font = "9px Inter, sans-serif";
        ctx.fillText("▼ LEVEL +0" + (levels - l) + ".00", elevRight + 40, ly + 3);
      }

      // Dimension extension bracket at bottom
      var dimY = elevBottom + 45;
      ctx.strokeStyle = styles.lineAccent;
      ctx.beginPath();
      ctx.moveTo(elevLeft, dimY);
      ctx.lineTo(elevRight, dimY);
      // Ticks
      ctx.moveTo(elevLeft, dimY - 6);
      ctx.lineTo(elevLeft, dimY + 6);
      ctx.moveTo(elevRight, dimY - 6);
      ctx.lineTo(elevRight, dimY + 6);
      ctx.stroke();

      ctx.fillStyle = styles.fontColor;
      ctx.font = "9px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("|← 24.50 METER SPAN →|", (elevLeft + elevRight) * 0.5, dimY - 8);
      ctx.textAlign = "left";

      ctx.restore();
    }

    // ------------------------------------------------------------------------
    // GEOMETRY LAYER 3: 3D Axonometric Structural Joinery (Dominant in Expertise)
    // ------------------------------------------------------------------------
    var axoWeight = Math.max(0, 1 - Math.abs(morph - 2));
    if (axoWeight > 0.02) {
      ctx.save();
      ctx.globalAlpha = axoWeight;

      var axoX = cx;
      var axoY = cy + 10;
      var side = Math.min(width, height) * 0.28;
      var cos30 = Math.cos(Math.PI / 6);
      var sin30 = Math.sin(Math.PI / 6);

      // Draw Isometric Cube Wireframe with Internal Beams
      function isoPoint(x, y, z) {
        return {
          px: axoX + (x - y) * cos30 * side,
          py: axoY + (x + y) * sin30 * side - z * side
        };
      }

      // Draw 3D wireframe box
      var p000 = isoPoint(-0.6, -0.6, 0);
      var p100 = isoPoint(0.6, -0.6, 0);
      var p110 = isoPoint(0.6, 0.6, 0);
      var p010 = isoPoint(-0.6, 0.6, 0);

      var p001 = isoPoint(-0.6, -0.6, 1.1);
      var p101 = isoPoint(0.6, -0.6, 1.1);
      var p111 = isoPoint(0.6, 0.6, 1.1);
      var p011 = isoPoint(-0.6, 0.6, 1.1);

      // Base ring
      ctx.strokeStyle = styles.line;
      ctx.beginPath();
      ctx.moveTo(p000.px, p000.py);
      ctx.lineTo(p100.px, p100.py);
      ctx.lineTo(p110.px, p110.py);
      ctx.lineTo(p010.px, p010.py);
      ctx.closePath();
      ctx.stroke();

      // Top ring
      ctx.strokeStyle = styles.lineAccent;
      ctx.beginPath();
      ctx.moveTo(p001.px, p001.py);
      ctx.lineTo(p101.px, p101.py);
      ctx.lineTo(p111.px, p111.py);
      ctx.lineTo(p011.px, p011.py);
      ctx.closePath();
      ctx.stroke();

      // Vertical Columns
      ctx.strokeStyle = styles.line;
      [ [p000, p001], [p100, p101], [p110, p111], [p010, p011] ].forEach(function (pair) {
        ctx.beginPath();
        ctx.moveTo(pair[0].px, pair[0].py);
        ctx.lineTo(pair[1].px, pair[1].py);
        ctx.stroke();
      });

      // Internal Diagonal Bracing Wireframe
      ctx.strokeStyle = styles.line;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(p000.px, p000.py);
      ctx.lineTo(p111.px, p111.py);
      ctx.moveTo(p100.px, p100.py);
      ctx.lineTo(p011.px, p011.py);
      ctx.stroke();
      ctx.setLineDash([]);

      // Axis Callout Crosshairs
      [p001, p101, p111, p011].forEach(function (pt) {
        ctx.fillStyle = styles.dot;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    // ------------------------------------------------------------------------
    // GEOMETRY LAYER 4: Section Compass & Chronology Datum (Dominant in Journal)
    // ------------------------------------------------------------------------
    var journalWeight = Math.max(0, 1 - Math.abs(morph - 3));
    if (journalWeight > 0.02) {
      ctx.save();
      ctx.globalAlpha = journalWeight;

      var compX = cx + (width > 800 ? width * 0.25 : 0);
      var compY = cy;
      var compR = Math.min(width, height) * 0.22;

      // Circular Architectural Protractor
      ctx.strokeStyle = styles.lineAccent;
      ctx.beginPath();
      ctx.arc(compX, compY, compR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = styles.line;
      ctx.beginPath();
      ctx.arc(compX, compY, compR * 0.75, 0, Math.PI * 2);
      ctx.arc(compX, compY, compR * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      // Degree divisions
      for (var d = 0; d < 360; d += 30) {
        var rad = (d * Math.PI) / 180;
        var r1 = compR - 8;
        var r2 = compR;
        ctx.beginPath();
        ctx.moveTo(compX + Math.cos(rad) * r1, compY + Math.sin(rad) * r1);
        ctx.lineTo(compX + Math.cos(rad) * r2, compY + Math.sin(rad) * r2);
        ctx.stroke();
      }

      // Compass Crosshairs
      ctx.beginPath();
      ctx.moveTo(compX - compR * 1.25, compY);
      ctx.lineTo(compX + compR * 1.25, compY);
      ctx.moveTo(compX, compY - compR * 1.25);
      ctx.lineTo(compX, compY + compR * 1.25);
      ctx.stroke();

      ctx.restore();
    }

    requestAnimationFrame(renderArchCanvas);
  }

  requestAnimationFrame(renderArchCanvas);

  // --------------------------------------------------------------------------
  // 3. Section Navigation Spy
  // --------------------------------------------------------------------------
  var sections = $$("section");
  var navLinks = $$("#navMenu a");

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        document.body.setAttribute("data-section", id);

        navLinks.forEach(function (link) {
          var href = link.getAttribute("href").replace("#", "");
          link.classList.toggle("active", href === id);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: "-10% 0px -40% 0px"
  });

  sections.forEach(function (sec) {
    sectionObserver.observe(sec);
  });

  // --------------------------------------------------------------------------
  // 4. Mobile Menu Navigation
  // --------------------------------------------------------------------------
  var menuToggle = $("#menuToggle");
  var navMenu = $("#navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = navMenu.classList.toggle("mobile-open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close when tapping any link or button inside nav menu
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.closest("button")) {
        navMenu.classList.remove("mobile-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close when tapping anywhere outside the mobile menu
    document.addEventListener("click", function (e) {
      if (navMenu.classList.contains("mobile-open")) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          navMenu.classList.remove("mobile-open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. High-End Editorial Architectural Artwork Fallbacks (Clean & Minimal)
  // --------------------------------------------------------------------------
  var ARCH_PALETTES = [
    { bg: "#f6f3ed", line: "#48433d", accent: "#967252", wash: "rgba(230,222,210,0.6)" }, // Warm Limestone
    { bg: "#f4f0e8", line: "#3e3a35", accent: "#a37e58", wash: "rgba(225,218,206,0.6)" }, // Smoked Oak
    { bg: "#f5f4ef", line: "#42403b", accent: "#8c8273", wash: "rgba(228,226,218,0.6)" }, // Travertine
    { bg: "#f2efe9", line: "#3d3833", accent: "#9c7653", wash: "rgba(224,216,204,0.6)" }  // Tactile Linen
  ];

  function art(p, n) {
    var pal = ARCH_PALETTES[(p.i + n) % ARCH_PALETTES.length];
    var styleIdx = (p.i + n) % 4;
    var svg = "";

    if (styleIdx === 0) {
      // Arched Colonnade with Sunlight Shadow Wash & Architectural Bench (16:9 Widescreen)
      svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">' +
        '<rect width="1920" height="1080" fill="' + pal.bg + '"/>' +
        '<polygon points="200,0 1200,0 1600,1080 0,1080" fill="' + pal.wash + '"/>' +
        '<path d="M 660 880 V 380 A 300 300 0 0 1 1260 380 V 880" fill="none" stroke="' + pal.line + '" stroke-width="3"/>' +
        '<path d="M 740 880 V 420 A 220 220 0 0 1 1180 420 V 880" fill="none" stroke="' + pal.accent + '" stroke-width="2" stroke-dasharray="6 6"/>' +
        '<line x1="360" y1="880" x2="1560" y2="880" stroke="' + pal.line + '" stroke-width="3"/>' +
        '<rect x="760" y="760" width="400" height="32" fill="' + pal.bg + '" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<line x1="820" y1="792" x2="820" y2="880" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<line x1="1100" y1="792" x2="1100" y2="880" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<text x="960" y="960" font-family="Cormorant Garamond, Georgia, serif" font-size="24" letter-spacing="8" fill="' + pal.line + '" text-anchor="middle">' + p.title.toUpperCase() + '</text>' +
        '<text x="960" y="1000" font-family="Inter, sans-serif" font-size="13" letter-spacing="5" fill="' + pal.accent + '" text-anchor="middle">SPATIAL ELEVATION 0' + n + '</text>' +
        '</svg>';
    } else if (styleIdx === 1) {
      // Modernist Bauhaus Window Grid & Atmospheric Ray (16:9 Widescreen)
      svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">' +
        '<rect width="1920" height="1080" fill="' + pal.bg + '"/>' +
        '<polygon points="700,100 1500,100 1700,950 400,950" fill="' + pal.wash + '"/>' +
        '<rect x="520" y="180" width="880" height="680" fill="none" stroke="' + pal.line + '" stroke-width="3"/>' +
        '<line x1="960" y1="180" x2="960" y2="860" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<line x1="520" y1="410" x2="1400" y2="410" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<line x1="520" y1="630" x2="1400" y2="630" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<circle cx="1180" cy="740" r="54" fill="none" stroke="' + pal.accent + '" stroke-width="2"/>' +
        '<line x1="1180" y1="630" x2="1180" y2="740" stroke="' + pal.accent + '" stroke-width="2"/>' +
        '<line x1="320" y1="860" x2="1600" y2="860" stroke="' + pal.line + '" stroke-width="3"/>' +
        '<text x="960" y="960" font-family="Cormorant Garamond, Georgia, serif" font-size="24" letter-spacing="8" fill="' + pal.line + '" text-anchor="middle">' + p.title.toUpperCase() + '</text>' +
        '<text x="960" y="1000" font-family="Inter, sans-serif" font-size="13" letter-spacing="5" fill="' + pal.accent + '" text-anchor="middle">FENESTRATION STUDY 0' + n + '</text>' +
        '</svg>';
    } else if (styleIdx === 2) {
      // Minimalist Slatted Wood Screen & Pendant Light (16:9 Widescreen)
      svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">' +
        '<rect width="1920" height="1080" fill="' + pal.bg + '"/>' +
        '<g opacity="0.45">';
      for (var s = 460; s <= 1460; s += 40) {
        svg += '<line x1="' + s + '" y1="160" x2="' + s + '" y2="840" stroke="' + pal.line + '" stroke-width="2.5"/>';
      }
      svg += '</g>' +
        '<line x1="340" y1="840" x2="1580" y2="840" stroke="' + pal.line + '" stroke-width="3"/>' +
        '<rect x="680" y="740" width="560" height="50" fill="' + pal.bg + '" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<circle cx="960" cy="400" r="80" fill="' + pal.bg + '" stroke="' + pal.accent + '" stroke-width="2.5"/>' +
        '<line x1="960" y1="100" x2="960" y2="320" stroke="' + pal.accent + '" stroke-width="2"/>' +
        '<text x="960" y="960" font-family="Cormorant Garamond, Georgia, serif" font-size="24" letter-spacing="8" fill="' + pal.line + '" text-anchor="middle">' + p.title.toUpperCase() + '</text>' +
        '<text x="960" y="1000" font-family="Inter, sans-serif" font-size="13" letter-spacing="5" fill="' + pal.accent + '" text-anchor="middle">MATERIAL INTEGRATION 0' + n + '</text>' +
        '</svg>';
    } else {
      // Sculptural Spatial Form (16:9 Widescreen)
      svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">' +
        '<rect width="1920" height="1080" fill="' + pal.bg + '"/>' +
        '<polygon points="360,60 1440,200 1380,880 260,880" fill="' + pal.wash + '"/>' +
        '<line x1="300" y1="860" x2="1620" y2="860" stroke="' + pal.line + '" stroke-width="3"/>' +
        '<polygon points="760,520 1160,520 1220,860 700,860" fill="' + pal.bg + '" stroke="' + pal.line + '" stroke-width="2.5"/>' +
        '<path d="M 840,520 C 800,380 1120,380 1080,520 Z" fill="none" stroke="' + pal.accent + '" stroke-width="2.5"/>' +
        '<ellipse cx="960" cy="400" rx="48" ry="12" fill="none" stroke="' + pal.accent + '" stroke-width="2"/>' +
        '<text x="960" y="960" font-family="Cormorant Garamond, Georgia, serif" font-size="24" letter-spacing="8" fill="' + pal.line + '" text-anchor="middle">' + p.title.toUpperCase() + '</text>' +
        '<text x="960" y="1000" font-family="Inter, sans-serif" font-size="13" letter-spacing="5" fill="' + pal.accent + '" text-anchor="middle">OBJECT & SHADOW 0' + n + '</text>' +
        '</svg>';
    }

    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  window.fb = function (el, i) {
    el.onerror = null;
    el.src = art(P[i], 1);
  };

  // --------------------------------------------------------------------------
  // 6. Category Tabs & Project Rendering (Clean, NO Hover Pill)
  // --------------------------------------------------------------------------
  var currentCat = "All";
  var cats = ["All", "Residential", "Commercial", "Concept"];

  var tabsContainer = $("#tabs");
  if (tabsContainer) {
    tabsContainer.innerHTML = cats.map(function (c) {
      return '<button class="tab" aria-pressed="' + (c === "All") + '" data-c="' + c + '">' + c + '</button>';
    }).join("");

    tabsContainer.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      currentCat = btn.dataset.c;
      $$(".tab").forEach(function (t) {
        t.setAttribute("aria-pressed", t === btn);
      });
      renderProjects();
    });
  }

  var searchInput = $("#q");
  var searchClear = $("#qClear");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      if (searchClear) searchClear.hidden = !searchInput.value;
      renderProjects();
    });
  }

  if (searchClear) {
    searchClear.addEventListener("click", function () {
      searchInput.value = "";
      searchClear.hidden = true;
      searchInput.focus();
      renderProjects();
    });
  }

  function renderProjects() {
    var query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    var list = P.filter(function (p) {
      var matchesCategory = currentCat === "All" || p.cat === currentCat;
      var textContent = (p.title + " " + p.mat + " " + (p.problem || "") + " " + (p.arch || "")).toLowerCase();
      var matchesSearch = query === "" || textContent.indexOf(query) > -1;
      return matchesCategory && matchesSearch;
    });

    var grid = $("#grid");
    var noneEl = $("#none");

    if (grid) {
      grid.innerHTML = list.map(function (p) {
        var numIdx = (p.i + 1 < 10 ? "0" : "") + (p.i + 1);
        return (
          '<div class="pc" role="button" tabindex="0" data-i="' + p.i + '" aria-label="View project details: ' + p.title + '">' +
            '<span class="ph">' +
              '<span class="pc-badge">' + p.cat + '</span>' +
              '<img alt="" loading="lazy" src="assets/projects/' + p.slug + '/01.' + EXT + '" onerror="fb(this,' + p.i + ')">' +
            '</span>' +
            '<div class="pc-info">' +
              '<div class="pc-meta">' +
                '<h3>' + p.title + '</h3>' +
                '<span class="pc-idx">' + numIdx + ' / ' + P.length + '</span>' +
              '</div>' +
              '<p class="pc-materials">' + p.mat + '</p>' +
            '</div>' +
          '</div>'
        );
      }).join("");
    }

    if (noneEl) {
      noneEl.hidden = list.length > 0;
    }
  }

  // --------------------------------------------------------------------------
  // 7. Lightbox Gallery Dialog
  // --------------------------------------------------------------------------
  var dlg = $("#dlg");
  var currentProject = null;
  var currentSlide = 0;
  var timer = null;
  var isPaused = false;

  var gridEl = $("#grid");
  if (gridEl) {
    gridEl.addEventListener("click", function (e) {
      var card = e.target.closest(".pc");
      if (card) {
        openProject(+card.dataset.i);
      }
    });
    gridEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        var card = e.target.closest(".pc");
        if (card) {
          e.preventDefault();
          openProject(+card.dataset.i);
        }
      }
    });
  }

  function setLink(selector, url) {
    var el = $(selector);
    if (!el) return;
    el.hidden = !url;
    if (url) el.href = url;
  }

  function openProject(index) {
    currentProject = P[index];
    currentSlide = 0;
    isPaused = false;

    var pzBtn = $("#pz");
    if (pzBtn) pzBtn.textContent = "Pause";

    $("#dt").textContent = currentProject.title;
    var modalBadge = $("#modalCatBadge");
    if (modalBadge) modalBadge.textContent = currentProject.cat + " · " + (currentProject.year || "2026");

    $("#pr").textContent = currentProject.problem;
    $("#ar").textContent = currentProject.arch;
    $("#me").textContent = currentProject.metrics;
    $("#stack").textContent = currentProject.mat;

    setLink("#lv", currentProject.live);
    setLink("#gh", currentProject.behance || BEHANCE);

    var lkWrap = $("#lk");
    if (lkWrap) {
      lkWrap.hidden = false;
    }

    // Render gallery images with fallback based on project's imagesCount
    var gal = $("#gal");
    var totalSlides = currentProject.imagesCount || 4;
    var html = "";
    for (var n = 1; n <= totalSlides; n++) {
      var numStr = n < 10 ? "0" + n : "" + n;
      html += '<img loading="lazy" alt="' + currentProject.title + ' view ' + n + '" data-n="' + n + '" src="assets/projects/' + currentProject.slug + '/' + numStr + '.' + EXT + '">';
    }
    gal.innerHTML = html;

    var activeProject = currentProject;
    Array.prototype.forEach.call(gal.children, function (img) {
      img.onerror = function () {
        img.onerror = null;
        img.src = art(activeProject, +img.dataset.n);
      };
    });

    showSlide(0);
    dlg.showModal();
    startSlideshow();
  }

  function showSlide(index) {
    var gal = $("#gal");
    if (!gal) return;
    var images = gal.children;
    var total = images.length;
    if (!total) return;
    currentSlide = ((index % total) + total) % total;

    for (var k = 0; k < total; k++) {
      images[k].classList.toggle("on", k === currentSlide);
    }

    var countText = (currentSlide + 1 < 10 ? "0" : "") + (currentSlide + 1) + " / " + (total < 10 ? "0" : "") + total;
    $("#cnt").textContent = countText;

    var progressBar = $("#galProgress");
    if (progressBar) {
      progressBar.style.width = (((currentSlide + 1) / total) * 100) + "%";
    }

    // Dynamic Download Button for current image
    var dlBtn = $("#dlBtn");
    var activeImg = images[currentSlide];
    if (dlBtn && activeImg) {
      dlBtn.href = activeImg.src;
      var fileNum = (currentSlide + 1 < 10 ? "0" : "") + (currentSlide + 1);
      dlBtn.setAttribute("download", (currentProject ? currentProject.slug : "3d-render") + "-" + fileNum + ".jpg");
    }
  }

  function startSlideshow() {
    stopSlideshow();
    timer = setInterval(function () {
      if (!isPaused) {
        showSlide(currentSlide + 1);
      }
    }, 4500);
  }

  function stopSlideshow() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Dialog Controls
  var nextBtn = $("#nx");
  var prevBtn = $("#pv");
  var pauseBtn = $("#pz");
  var closeBtn = $("#x");
  var fsBtn = $("#fsBtn");

  if (nextBtn) nextBtn.onclick = function () { showSlide(currentSlide + 1); };
  if (prevBtn) prevBtn.onclick = function () { showSlide(currentSlide - 1); };
  if (pauseBtn) {
    pauseBtn.onclick = function () {
      isPaused = !isPaused;
      this.textContent = isPaused ? "Play" : "Pause";
    };
  }
  if (fsBtn) {
    fsBtn.onclick = function () {
      var gal = $("#gal");
      if (!gal) return;
      if (!document.fullscreenElement) {
        if (gal.requestFullscreen) {
          gal.requestFullscreen();
        } else if (gal.webkitRequestFullscreen) {
          gal.webkitRequestFullscreen();
        } else if (gal.msRequestFullscreen) {
          gal.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };
  }
  if (closeBtn) {
    closeBtn.onclick = function () {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      dlg.close();
    };
  }

  if (dlg) {
    dlg.addEventListener("close", stopSlideshow);
    dlg.addEventListener("click", function (e) {
      if (e.target === this) this.close();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!dlg || !dlg.open) return;
    if (e.key === "ArrowRight") showSlide(currentSlide + 1);
    if (e.key === "ArrowLeft") showSlide(currentSlide - 1);
    if (e.key === " " && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      if (pauseBtn) pauseBtn.click();
    }
  });

  // Modal "Enquire About This Concept" button
  var inquireProjectBtn = $("#inquireProjectBtn");
  if (inquireProjectBtn) {
    inquireProjectBtn.addEventListener("click", function () {
      dlg.close();
      var messageInput = $("#fm");
      if (messageInput && currentProject) {
        messageInput.value = "Hello Ajay,\n\nI was inspired by your work on '" + currentProject.title + "'. I'd like to discuss a project with a similar spatial aesthetic:\n\n- Project Location: \n- Approximate Area: \n- Target Timeline: ";
      }
      openContactPanel();
      setTimeout(function () {
        if (messageInput) messageInput.focus();
      }, 600);
    });
  }

  // --------------------------------------------------------------------------
  // 8. Expertise Progress Meters Animation
  // --------------------------------------------------------------------------
  var skillsContainer = $("#skills");
  if (skillsContainer && typeof S !== "undefined") {
    skillsContainer.innerHTML = S.map(function (s) {
      var name = s[0];
      var pct = s[1];
      var desc = s[2] || "";
      return (
        '<div class="sk">' +
          '<div class="sk-header">' +
            '<div>' +
              '<span class="sk-title">' + name + '</span>' +
              (desc ? '<p class="sk-desc">' + desc + '</p>' : '') +
            '</div>' +
            '<small>' + pct + '%</small>' +
          '</div>' +
          '<div class="bar"><i data-w="' + pct + '"></i></div>' +
        '</div>'
      );
    }).join("");

    var expertiseSection = $("#expertise");
    if (expertiseSection) {
      new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            $$(".bar i").forEach(function (bar) {
              bar.style.width = bar.dataset.w + "%";
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 }).observe(expertiseSection);
    }
  }

  // --------------------------------------------------------------------------
  // 9. Journal Timeline Rendering
  // --------------------------------------------------------------------------
  var journalContainer = $("#loglist");
  if (journalContainer && typeof L !== "undefined") {
    journalContainer.innerHTML = L.map(function (item) {
      var year = item[0];
      var tag = item[1] || "Milestone";
      var title = item[2] || item[1];
      var summary = item[3] || "";
      return (
        '<div class="log">' +
          '<span class="log-year">' + year + '</span>' +
          '<span class="log-tag">' + tag + '</span>' +
          '<div class="log-content">' +
            '<h4>' + title + '</h4>' +
            (summary ? '<p>' + summary + '</p>' : '') +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  // --------------------------------------------------------------------------
  // 10. Contact Details, Copy Email & Form Handling
  // --------------------------------------------------------------------------
  var targetEmail = typeof EMAIL !== "undefined" ? EMAIL : "aniketojha1308@gmail.com";
  var targetPhone = typeof PHONE !== "undefined" ? PHONE : "+91-8802820881";

  var emailLink = $("#emailLink");
  if (emailLink) {
    emailLink.textContent = targetEmail;
    emailLink.href = "mailto:" + targetEmail;
  }

  var phoneLink = $("#phoneLink");
  if (phoneLink) {
    phoneLink.textContent = targetPhone;
    phoneLink.href = "tel:" + targetPhone.replace(/[^0-9+]/g, "");
  }

  var copyEmailBtn = $("#copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(targetEmail).then(function () {
          showToast("Email address copied: " + targetEmail);
        }).catch(function (err) {
  console.error("Web3Forms error:", err);
  showToast("Could not send: " + ((err && err.message) ? err.message : "network error") + ". Please email " + targetEmail);
})
      } else {
        fallbackCopyText(targetEmail);
      }
    });
  }

  function fallbackCopyText(text) {
    var temp = document.createElement("input");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    showToast("Email address copied: " + text);
  }

  var contactForm = $("#f");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector("button[type=submit]");
    var name = $("#fn").value.trim();
    var email = $("#fe") ? $("#fe").value.trim() : "";
    var phone = $("#fp") ? $("#fp").value.trim() : "";
    var message = $("#fm").value.trim();

    if (!WEB3FORMS_KEY) {
      showToast("Contact form is not set up yet. Please email " + targetEmail);
      return;
    }

    var oldHTML = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = "Sending…";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "3D Design & Visualisation Enquiry from " + name,
        from_name: name,
        name: name,
        email: email,
        phone: phone,
        message: message
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.success) throw new Error(d.message || "failed");
        showToast("Message sent. Thank you, I’ll reply soon.");
        contactForm.reset();
      })
      .catch(function () {
        showToast("Could not send. Please email " + targetEmail + " directly.");
      })
      .then(function () {
        btn.disabled = false;
        btn.innerHTML = oldHTML;
      });
  });
}

  // --------------------------------------------------------------------------
  // 11. Live Clock, Back To Top, and Toast Notifications
  // --------------------------------------------------------------------------
  var clockEl = $("#studioClock");
  function updateStudioClock() {
    if (!clockEl) return;
    try {
      var now = new Date();
      var timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      clockEl.textContent = "New Delhi: " + timeStr + " IST";
    } catch (err) {
      clockEl.textContent = "New Delhi, India (IST)";
    }
  }
  updateStudioClock();
  setInterval(updateStudioClock, 1000);

  var backToTopBtn = $("#backToTop");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var toastTimer = null;
  function showToast(msg) {
    var toast = $("#toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3200);
  }
  // --------------------------------------------------------------------------
  // 12. Contact Overlay Panel Toggle
  // --------------------------------------------------------------------------
  var contactPanel = $("#contactPanel");
  var contactToggleBtn = $("#contactToggle");
  var contactCloseBtn = $("#contactClose");

  function openContactPanel() {
    if (!contactPanel) return;
    contactPanel.classList.add("open");
    contactPanel.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-open");
    if (contactToggleBtn) contactToggleBtn.classList.add("active");
  }

  function closeContactPanel() {
    if (!contactPanel) return;
    contactPanel.classList.remove("open");
    contactPanel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-open");
    if (contactToggleBtn) contactToggleBtn.classList.remove("active");
  }

  function toggleContactPanel() {
    if (!contactPanel) return;
    if (contactPanel.classList.contains("open")) {
      closeContactPanel();
    } else {
      openContactPanel();
    }
  }

  // Header button opens/closes
  if (contactToggleBtn) {
    contactToggleBtn.addEventListener("click", toggleContactPanel);
  }

  // Close button inside overlay
  if (contactCloseBtn) {
    contactCloseBtn.addEventListener("click", closeContactPanel);
  }

  // Click backdrop to close
  if (contactPanel) {
    var backdrop = contactPanel.querySelector(".contact-overlay-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", closeContactPanel);
    }
  }

  // Esc key closes contact panel
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && contactPanel && contactPanel.classList.contains("open")) {
      closeContactPanel();
    }
  });

  // Hero "Get in Touch" button also opens the panel
  var heroContactBtn = $("#heroContactBtn");
  if (heroContactBtn) {
    heroContactBtn.addEventListener("click", function () {
      openContactPanel();
    });
  }

  // Initial render of projects
  renderProjects();

})();
