/* RentNest — shared site behaviour
   Header, mobile nav, scroll reveal, listing render/filter, gallery, forms. */
(function () {
  "use strict";

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Icons (inline SVG helpers) ---------- */
  var ICON = {
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18"/><path d="M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M6 19l-1 2"/><path d="M18 19l1 2"/></svg>',
    area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M3 9h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.2 6.1 20.3l1.2-6.6L2.5 9l6.6-.9z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.5" r="3.2"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9" r="1.6"/><path d="M21 15l-5-5-11 11"/></svg>',
    plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 10h7V3"/><path d="M10 10h11"/><path d="M14 21v-7"/></svg>'
  };

  /* ---------- Utilities ---------- */
  function formatPrice(n) {
    return "\u20A6" + Number(n).toLocaleString("en-NG");
  }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /* Photos the landlord uploaded in the listing form, each tagged with a room.
     Shared between the uploader and the submit handler (same module scope). */
  var uploadedPhotos = [];
  var uploaderRender = null;

  /* Built-in sample listings plus anything a landlord submitted in this browser. */
  function allListings() {
    var base = window.RENTNEST_LISTINGS || [];
    return window.RENTNEST_STORE ? window.RENTNEST_STORE.merge(base) : base.slice();
  }

  /* ---------- Header: shadow on scroll + mobile nav ---------- */
  function initHeader() {
    var header = $(".site-header");
    var toggle = $(".nav-toggle");
    var nav = $("#primary-nav");

    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", nav).forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    function showAll() {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });

    /* Safety net: never leave a section permanently invisible if the
       observer never fires (embedded frames, print, no scroll events). */
    window.setTimeout(showAll, 400);
  }

  /* ---------- Property card markup ---------- */
  function cardHTML(p) {
    var badge = p.badge
      ? '<span class="badge badge--' + esc(p.badge.style) + '">' + esc(p.badge.text) + "</span>"
      : "";
    return (
      '<article class="property-card" data-id="' + esc(p.id) + '">' +
        '<a class="card-media" href="property.html?id=' + encodeURIComponent(p.id) + '" aria-label="View ' + esc(p.title) + '">' +
          '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' in ' + esc(p.location) + '">' +
          '<div class="card-badges"><span class="badge">' + esc(p.type) + "</span>" + badge + "</div>" +
          '<span class="card-price">' + formatPrice(p.price) + " <small>" + esc(p.period) + "</small></span>" +
        "</a>" +
        '<div class="card-body">' +
          '<div class="card-foot">' +
            '<h3 class="card-title">' + esc(p.title) + "</h3>" +
            '<span class="rating">' + ICON.star + esc(p.rating.toFixed(1)) + "</span>" +
          "</div>" +
          '<p class="card-loc">' + ICON.pin + esc(p.location) + "</p>" +
          '<p class="card-desc">' + esc(p.desc) + "</p>" +
          '<div class="card-specs">' +
            '<span class="spec">' + ICON.bed + p.beds + (p.beds === 1 ? " Bed" : " Beds") + "</span>" +
            '<span class="spec">' + ICON.bath + p.baths + (p.baths === 1 ? " Bath" : " Baths") + "</span>" +
          "</div>" +
          (p.rooms && p.rooms.length
            ? '<button class="mini-roommap" type="button" data-id="' + esc(p.id) + '" aria-haspopup="dialog">' +
                ICON.plan + " Explore " + p.rooms.length + " rooms</button>"
            : "") +
          '<a class="btn btn-outline btn-sm btn-block" href="property.html?id=' + encodeURIComponent(p.id) + '">View details</a>' +
        "</div>" +
      "</article>"
    );
  }

  function renderInto(container, list) {
    if (!container) return;
    if (!list.length) {
      container.innerHTML =
        '<div class="empty-state">' +
          "<h3>No homes match those filters</h3>" +
          "<p>Try widening your price range or choosing a different area.</p>" +
          '<button class="btn btn-primary" type="button" data-reset>Clear all filters</button>' +
        "</div>";
      return;
    }
    container.innerHTML = list.map(cardHTML).join("");
  }

  /* ---------- Landing page: featured listings ---------- */
  function initFeatured() {
    var grid = $("#featured-grid");
    if (!grid || !window.RENTNEST_LISTINGS) return;
    var featured = allListings().filter(function (p) { return p.featured; }).slice(0, 6);
    renderInto(grid, featured);
  }

  /* ---------- Hero search form -> listings page ---------- */
  function initHeroSearch() {
    var form = $("#hero-search");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var params = new URLSearchParams();
      var loc = form.elements.location.value.trim();
      var max = form.elements.maxPrice.value;
      var beds = form.elements.beds.value;
      if (loc) params.set("location", loc);
      if (max) params.set("maxPrice", max);
      if (beds) params.set("beds", beds);
      window.location.href = "listings.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  /* ---------- Listings page: filtering ---------- */
  function initListings() {
    var grid = $("#listings-grid");
    if (!grid || !window.RENTNEST_LISTINGS) return;

    var state = {
      location: getParam("location") || "",
      maxPrice: getParam("maxPrice") ? parseInt(getParam("maxPrice"), 10) : 0,
      beds: getParam("beds") ? parseInt(getParam("beds"), 10) : 0,
      type: getParam("type") || "",
      sort: "featured"
    };

    var els = {
      location: $("#f-location"),
      price: $("#f-price"),
      beds: $("#f-beds"),
      type: $("#f-type"),
      sort: $("#f-sort"),
      count: $("#result-count"),
      chips: $$(".chip")
    };

    // hydrate controls from URL params
    if (els.location) els.location.value = state.location;
    if (els.price) els.price.value = state.maxPrice ? String(state.maxPrice) : "";
    if (els.beds) els.beds.value = state.beds ? String(state.beds) : "";
    if (els.type) els.type.value = state.type;
    els.chips.forEach(function (chip) {
      if (chip.dataset.type === state.type) chip.classList.add("is-active");
    });

    function apply() {
      var list = allListings();

      if (state.location) {
        var q = state.location.toLowerCase();
        list = list.filter(function (p) {
          return (p.location + " " + p.city + " " + p.title).toLowerCase().indexOf(q) > -1;
        });
      }
      if (state.maxPrice) list = list.filter(function (p) { return p.price <= state.maxPrice; });
      if (state.beds) list = list.filter(function (p) { return p.beds >= state.beds; });
      if (state.type) list = list.filter(function (p) { return p.type === state.type; });

      if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
      else list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

      renderInto(grid, list);
      if (els.count) {
        els.count.innerHTML = "<b>" + list.length + "</b> " + (list.length === 1 ? "home" : "homes") + " available";
      }
      initReveal();
    }

    function read() {
      state.location = els.location ? els.location.value.trim() : "";
      state.maxPrice = els.price && els.price.value ? parseInt(els.price.value, 10) : 0;
      state.beds = els.beds && els.beds.value ? parseInt(els.beds.value, 10) : 0;
      state.type = els.type ? els.type.value : "";
      utilsActiveChips();
      apply();
    }

    function utilsActiveChips() {
      els.chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.dataset.type === state.type);
      });
    }

    [els.location, els.price, els.beds, els.type].forEach(function (el) {
      if (el) el.addEventListener("change", read);
    });
    if (els.location) els.location.addEventListener("input", read);
    if (els.sort) els.sort.addEventListener("change", function () { state.sort = els.sort.value; apply(); });

    var form = $("#filter-form");
    if (form) form.addEventListener("submit", function (e) { e.preventDefault(); read(); });

    els.chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.type = chip.dataset.type;
        if (els.type) els.type.value = state.type;
        utilsActiveChips();
        apply();
      });
    });

    var reset = $("#reset-filters");
    if (reset) reset.addEventListener("click", function () {
      state = { location: "", maxPrice: 0, beds: 0, type: "", sort: els.sort ? els.sort.value : "featured" };
      if (els.location) els.location.value = "";
      if (els.price) els.price.value = "";
      if (els.beds) els.beds.value = "";
      if (els.type) els.type.value = "";
      utilsActiveChips();
      apply();
    });

    grid.addEventListener("click", function (e) {
      if (e.target.closest("[data-reset]")) {
        if (reset) reset.click();
      }
    });

    apply();
  }

  /* ---------- Property detail page ---------- */
  function initDetail() {
    var root = $("#property-root");
    if (!root || !window.RENTNEST_LISTINGS) return;
    var id = getParam("id");
    var p = allListings().filter(function (x) { return x.id === id; })[0] || allListings()[0];

    document.title = p.title + " · RentNest";

    // header fields
    set("#pd-title", p.title);
    set("#pd-location", p.location);
    set("#pd-price", formatPrice(p.price));
    set("#pd-period", "per " + p.period.replace("/", "") );
    set("#pd-type", p.type);
    set("#pd-rating", p.rating.toFixed(1));
    set("#pd-rating-count", "(" + Math.round(p.rating * 17) + " reviews)");
    set("#pd-desc", p.desc);
    set("#pd-crumb", p.title);

    // specs
    set("#pd-beds", p.beds);
    set("#pd-baths", p.baths);
    set("#pd-area", 90 + p.beds * 45);
    set("#pd-type-spec", p.type);

    // breadcrumb link back
    var crumb = $("#pd-crumb-link");
    if (crumb) crumb.textContent = p.location;

    // gallery
    var gallery = $("#pd-gallery");
    var thumbsWrap = $("#pd-thumbs");
    var countEl = $("#pd-count");
    if (gallery) gallery.src = p.gallery[0];
    if (gallery) gallery.alt = p.title + " — main photo";
    if (countEl) countEl.innerHTML = ICON.camera + " " + p.gallery.length + " photos";

    if (thumbsWrap) {
      thumbsWrap.innerHTML = p.gallery.slice(1, 5).map(function (src, i) {
        var last = (i === 3 && p.gallery.length > 5);
        return (
          '<button class="gallery-thumb" type="button" data-index="' + (i + 1) + '" aria-label="Show photo ' + (i + 2) + '">' +
            '<img src="' + esc(src) + '" alt="' + esc(p.title) + ' photo ' + (i + 2) + '" loading="lazy">' +
            (last ? '<span class="gallery-more">+' + (p.gallery.length - 5) + " more</span>" : "") +
          "</button>"
        );
      }).join("");
    }

    // lightbox
    var lb = $("#lightbox");
    var lbImg = $("#lightbox-img");
    var lbCap = $("#lightbox-caption");
    var current = 0;

    function openLb(i) {
      if (!lb) return;
      current = (i + p.gallery.length) % p.gallery.length;
      lbImg.src = p.gallery[current];
      lbImg.alt = p.title + " photo " + (current + 1);
      if (lbCap) lbCap.textContent = p.title + " · photo " + (current + 1) + " of " + p.gallery.length;
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
      var closeBtn = $(".lightbox-close", lb);
      if (closeBtn) closeBtn.focus();
    }
    function closeLb() {
      if (!lb) return;
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    if (lb) {
      $$("[data-lb-close]", lb).forEach(function (b) { b.addEventListener("click", closeLb); });
      var prev = $(".lightbox-nav.prev", lb);
      var next = $(".lightbox-nav.next", lb);
      if (prev) prev.addEventListener("click", function () { openLb(current - 1); });
      if (next) next.addEventListener("click", function () { openLb(current + 1); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLb();
        if (e.key === "ArrowLeft") openLb(current - 1);
        if (e.key === "ArrowRight") openLb(current + 1);
      });
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    }

    if (gallery) {
      gallery.parentElement.addEventListener("click", function () { openLb(0); });
    }
    if (thumbsWrap) {
      thumbsWrap.addEventListener("click", function (e) {
        var btn = e.target.closest(".gallery-thumb");
        if (!btn) return;
        openLb(parseInt(btn.dataset.index, 10));
      });
    }

    // amenities
    var amen = $("#pd-amenities");
    if (amen) {
      amen.innerHTML = p.amenities.map(function (a) {
        return '<li class="amenity">' + ICON.check + esc(a) + "</li>";
      }).join("");
    }

    // agent
    set("#pd-agent-name", p.agent.name);
    set("#pd-agent-role", p.agent.role);
    var av = $("#pd-agent-avatar");
    if (av) av.textContent = p.agent.initials;

    // map
    var frame = $("#pd-map");
    if (frame) {
      var d = 0.012;
      var bbox = (p.coords.lng - d) + "," + (p.coords.lat - d) + "," + (p.coords.lng + d) + "," + (p.coords.lat + d);
      frame.src = "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox +
                  "&layer=mapnik&marker=" + p.coords.lat + "," + p.coords.lng;
      frame.title = "Map showing " + p.title + ", " + p.location;
    }
    var mapLink = $("#pd-map-link");
    if (mapLink) {
      mapLink.href = "https://www.openstreetmap.org/?mlat=" + p.coords.lat + "&mlon=" + p.coords.lng + "#map=15/" + p.coords.lat + "/" + p.coords.lng;
    }
    set("#pd-map-area", p.location);

    // booking form prefill
    var refField = $("#bk-ref");
    if (refField) refField.value = p.title + " (" + p.location + ")";

    // nearby / similar
    var similar = $("#similar-grid");
    if (similar) {
      var others = allListings().filter(function (x) {
        return x.id !== p.id && (x.type === p.type || Math.abs(x.price - p.price) < 1500000);
      }).slice(0, 3);
      renderInto(similar, others);
    }

    function set(sel, val) {
      var el = $(sel);
      if (el) el.textContent = val;
    }
  }

  /* ---------- Room explorer: "touch a room to see its photos" ---------- */
  function initRoomExplorer() {
    var ROOMS = window.RENTNEST_ROOMS;
    var SPOTS = window.RENTNEST_HOTSPOTS;
    if (!ROOMS || !SPOTS) return;
    var listings = allListings();
    if (!listings.length) return;

    var SHORT = {
      living: "Living", kitchen: "Kitchen", dining: "Dining",
      bed_master: "Master", bed_1: "Bedroom", bed_2: "Bed 2", bed_3: "Bed 3",
      bath: "Bath", balcony: "Balcony", hallway: "Hall", exterior: "Exterior"
    };

    function byId(id) {
      for (var i = 0; i < listings.length; i++) { if (listings[i].id === id) return listings[i]; }
      return null;
    }
    /* rooms of a listing, skipping false matches and legend variants that
       share one hotspot rectangle (e.g. a studio's single bedroom) */
    function keysFor(listing) {
      var seen = {};
      return (listing.rooms || []).filter(function (k) {
        if (!ROOMS[k] || !SPOTS[k]) return false;
        var s = SPOTS[k];
        var sig = [s.l, s.t, s.w, s.h].join(":");
        if (seen[sig]) return false;
        seen[sig] = 1;
        return true;
      });
    }

    /* A listing's own labelled photos win; otherwise fall back to the room library. */
    function photosFor(listing, key) {
      var own = listing && listing.roomPhotos && listing.roomPhotos[key];
      if (own && own.length) return own.slice();
      var r = ROOMS[key];
      return r && r.photos ? r.photos.slice() : [];
    }

    /* Hotspot rooms, plus any extra room the landlord labelled photos for
       (e.g. Hallway or Exterior/Other, which have no cell on the plan). */
    function chipKeysFor(listing) {
      var keys = keysFor(listing).slice();
      var own = (listing && listing.roomPhotos) || {};
      Object.keys(own).forEach(function (k) {
        if (own[k] && own[k].length && ROOMS[k] && keys.indexOf(k) === -1) keys.push(k);
      });
      return keys;
    }

    /* ---- shared modal, built once and reused on every page ---- */
    var modal = document.createElement("div");
    modal.className = "room-modal";
    modal.id = "room-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "room-modal-title");
    modal.innerHTML =
      '<div class="room-modal-backdrop" data-room-close></div>' +
      '<div class="room-modal-card">' +
        '<div class="room-modal-head">' +
          '<div>' +
            '<span class="eyebrow" id="room-modal-eyebrow">Room</span>' +
            '<h3 id="room-modal-title">Room</h3>' +
            '<p id="room-modal-desc"></p>' +
          '</div>' +
          '<button class="room-modal-close" type="button" data-room-close aria-label="Close room photos">&times;</button>' +
        '</div>' +
        '<div class="room-stage">' +
          '<img id="room-stage-img" src="" alt="">' +
          '<button class="room-arrow prev" type="button" id="room-prev" aria-label="Previous photo">&#8249;</button>' +
          '<button class="room-arrow next" type="button" id="room-next" aria-label="Next photo">&#8250;</button>' +
          '<span class="room-count" id="room-count"></span>' +
        '</div>' +
        '<div class="room-modal-body">' +
          '<div class="room-thumbs" id="room-thumbs" role="group" aria-label="Photos of this room"></div>' +
          '<div class="room-cta">' +
            '<a class="btn btn-primary btn-sm" href="#" data-room-cta data-room-close>Book a viewing</a>' +
            '<small id="room-cta-note"></small>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var el = {
      eyebrow: $("#room-modal-eyebrow", modal),
      title: $("#room-modal-title", modal),
      desc: $("#room-modal-desc", modal),
      img: $("#room-stage-img", modal),
      thumbs: $("#room-thumbs", modal),
      count: $("#room-count", modal),
      note: $("#room-cta-note", modal),
      cta: $("[data-room-cta]", modal),
      stage: $(".room-stage", modal)
    };

    var state = { listing: null, keys: [], room: null, i: 0, photos: [], opener: null };

    function render() {
      var r = ROOMS[state.room];
      if (!r || !state.photos.length) return;
      el.img.src = state.photos[state.i];
      el.img.alt = r.name + " \u2014 photo " + (state.i + 1) + " of " + state.photos.length;
      el.count.textContent = (state.i + 1) + " / " + state.photos.length;
      $$(".room-thumb", el.thumbs).forEach(function (t, idx) {
        var on = idx === state.i;
        t.classList.toggle("is-active", on);
        if (on) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
      });
    }

    function setActive(key) {
      $$(".room-hotspot").forEach(function (h) {
        h.classList.toggle("is-active", !!key && h.dataset.room === key);
      });
      var lid = state.listing ? state.listing.id : null;
      $$(".room-chip").forEach(function (c) {
        c.classList.toggle("is-active", !!key && c.dataset.room === key && c.dataset.listing === lid);
      });
    }

    function openRoom(listing, key, idx, opener) {
      var r = ROOMS[key];
      if (!r) return;
      var photos = photosFor(listing, key);
      if (!photos.length) return;
      state.listing = listing;
      state.keys = chipKeysFor(listing);
      state.room = key;
      state.i = idx || 0;
      state.photos = photos;
      state.opener = opener || document.activeElement;

      var n = state.keys.indexOf(key);
      el.eyebrow.textContent = "Room " + (n > -1 ? n + 1 : 1) + " of " + state.keys.length;
      el.title.textContent = r.name;
      el.desc.textContent = r.desc;
      el.note.textContent = state.photos.length + (state.photos.length === 1 ? " photo" : " photos") + " \u00b7 " + listing.title;
      el.thumbs.innerHTML = state.photos.map(function (src, i) {
        return '<button class="room-thumb" type="button" data-i="' + i +
               '" aria-label="Show photo ' + (i + 1) + " of the " + esc(r.name) + '">' +
                 '<img src="' + esc(src) + '" alt="" loading="lazy">' +
               "</button>";
      }).join("");
      if (el.cta) {
        var hasForm = !!$("#booking-form");
        el.cta.href = hasForm ? "#booking-form" : "property.html?id=" + encodeURIComponent(listing.id);
        el.cta.textContent = hasForm ? "Book a viewing" : "View this home";
      }
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      setActive(key);
      render();
      var closeBtn = $(".room-modal-close", modal);
      if (closeBtn) closeBtn.focus();
    }

    function closeRoom() {
      if (!modal.classList.contains("is-open")) return;
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      setActive(null);
      if (state.opener && typeof state.opener.focus === "function") state.opener.focus();
    }

    function step(d) {
      if (!state.photos.length) return;
      state.i = (state.i + d + state.photos.length) % state.photos.length;
      render();
    }

    $$("[data-room-close]", modal).forEach(function (b) { b.addEventListener("click", closeRoom); });
    var prevBtn = $("#room-prev", modal);
    var nextBtn = $("#room-next", modal);
    if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });
    if (el.thumbs) el.thumbs.addEventListener("click", function (e) {
      var t = e.target.closest(".room-thumb");
      if (!t) return;
      state.i = parseInt(t.dataset.i, 10) || 0;
      render();
    });

    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") { closeRoom(); }
      else if (e.key === "ArrowLeft") { step(-1); }
      else if (e.key === "ArrowRight") { step(1); }
      else if (e.key === "Tab") {
        var f = $$("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", modal)
          .filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* swipe through a room's photos on touch devices */
    if (el.stage) {
      var x0 = null;
      el.stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      el.stage.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        x0 = null;
      }, { passive: true });
    }

    /* ---- drop hotspots + chips onto a floor-plan frame ---- */
    function attachPlan(frame, listing, chipSel, captionSel) {
      if (!frame || !listing) return;
      keysFor(listing).forEach(function (k) {
        var r = ROOMS[k];
        var s = SPOTS[k];
        var b = document.createElement("button");
        b.type = "button";
        b.className = "room-hotspot";
        b.dataset.room = k;
        b.style.left = s.l + "%";
        b.style.top = s.t + "%";
        b.style.width = s.w + "%";
        b.style.height = s.h + "%";
        b.setAttribute("aria-haspopup", "dialog");
        b.setAttribute("aria-label", r.name + ": view " + photosFor(listing, k).length + " photos");
        b.innerHTML = '<span class="rh-label"><span class="rh-full">' + esc(r.name) + '</span>' +
                      '<span class="rh-short">' + esc(SHORT[k] || r.name) + "</span></span>";
        b.addEventListener("click", function () { openRoom(listing, k, 0, b); });
        frame.appendChild(b);
      });

      var chipWrap = chipSel ? $(chipSel) : null;
      if (chipWrap) {
        chipWrap.innerHTML = chipKeysFor(listing).map(function (k) {
          var r = ROOMS[k];
          return '<button class="room-chip" type="button" data-room="' + esc(k) +
                   '" data-listing="' + esc(listing.id) + '" aria-haspopup="dialog">' +
                   '<span class="rc-dot" aria-hidden="true"></span>' + esc(r.name) +
                   ' <span class="rc-count">' + photosFor(listing, k).length + "</span></button>";
        }).join("");
        $$(".room-chip", chipWrap).forEach(function (c) {
          c.addEventListener("click", function () { openRoom(listing, c.dataset.room, 0, c); });
        });
      }

      if (captionSel) {
        var cap = $(captionSel);
        if (cap) cap.textContent = listing.title + " \u00b7 " + listing.location;
      }
    }

    /* ---- property detail page ---- */
    var pdFrame = $("#pd-plan");
    if (pdFrame) {
      var p = byId(getParam("id")) || listings[0];
      attachPlan(pdFrame, p, "#pd-room-chips", null);
    }

    /* ---- home page: compact walkthrough ---- */
    var homeFrame = $("#home-plan");
    if (homeFrame) {
      var demo = null;
      for (var i = 0; i < listings.length; i++) {
        if (listings[i].featured && keysFor(listings[i]).length >= 9) { demo = listings[i]; break; }
      }
      attachPlan(homeFrame, demo || listings[0], "#home-room-chips", "#home-plan-caption");
    }

    /* ---- compact trigger on listing cards (delegated: survives re-render) ---- */
    document.addEventListener("click", function (e) {
      var t = e.target.closest(".mini-roommap");
      if (!t) return;
      e.preventDefault();
      var l = byId(t.dataset.id);
      if (!l) return;
      var keys = chipKeysFor(l);
      if (!keys.length) return;
      openRoom(l, keys[0], 0, t);
    });
  }

  /* ---------- Form validation (contact + landlord) ---------- */
  function initForms() {
    $$("form.js-validate").forEach(function (form) {
      var status = $(".form-status", form);

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;
        var firstBad = null;
        form.dataset.valid = "false";

        $$("[required]", form).forEach(function (input) {
          var field = input.closest(".field") || input.closest(".checkbox-row");
          var valid = input.type === "checkbox" ? input.checked : input.value.trim() !== "";
          if (valid && input.type === "email") {
            valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
          }
          if (valid && input.type === "tel") {
            valid = input.value.replace(/[^0-9]/g, "").length >= 7;
          }
          var minLen = parseInt(input.getAttribute("data-minlength") || "0", 10);
          if (valid && minLen && input.value.trim().length < minLen) valid = false;
          if (field) field.classList.toggle("has-error", !valid);
          if (!valid) { ok = false; if (!firstBad) firstBad = input; }
        });

        if (!ok) {
          if (status) {
            status.className = "form-status is-error";
            status.textContent = "Please check the highlighted fields and try again.";
          }
          if (firstBad) firstBad.focus();
          return;
        }

        form.dataset.valid = "true";
        if (form.hasAttribute("data-validate-only")) return;

        var btn = $("button[type='submit']", form);
        var label = btn ? btn.textContent : "";
        if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

        window.setTimeout(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
          if (status) {
            status.className = "form-status is-ok";
            status.textContent = form.dataset.successMessage ||
              "Thanks! Your message has been sent. The landlord will get back to you within 24 hours.";
          }
          form.reset();
        }, 700);
      });

      $$("input, select, textarea", form).forEach(function (input) {
        input.addEventListener("input", function () {
          var field = input.closest(".field");
          if (field) field.classList.remove("has-error");
        });
      });
    });
  }

  /* ---------- Landlord photo uploader: label every photo with its room ---------- */
  function initPhotoUploader() {
    var root = $("#photo-uploader");
    if (!root) return;

    var LABELS = window.RENTNEST_ROOM_LABELS || [];
    var NAME = {};
    LABELS.forEach(function (l) { NAME[l.key] = l.name; });

    var drop = $("#upload-drop");
    var input = $("#photo-input");
    var groups = $("#photo-groups");
    var tally = $("#room-tally");
    var summary = $("#upload-summary");
    var totalEl = $("#upload-total");
    var errEl = $("#upload-error");
    var clearBtn = $("#upload-clear");
    var MAX = 10;

    function showError(msg) { if (errEl) { errEl.textContent = msg; errEl.hidden = false; } }
    function hideError() { if (errEl) { errEl.hidden = true; errEl.textContent = ""; } }

    function labelOptions(sel) {
      return '<option value="">Choose a room…</option>' + LABELS.map(function (l) {
        return '<option value="' + esc(l.key) + '"' + (l.key === sel ? " selected" : "") + ">" + esc(l.name) + "</option>";
      }).join("");
    }

    function photoItemHTML(p) {
      var idx = uploadedPhotos.indexOf(p);
      var unset = !p.room;
      return '<div class="photo-item' + (unset ? " is-unlabelled" : "") + '">' +
        '<div class="photo-thumb">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.name || "Property photo") + '">' +
          '<button class="photo-remove" type="button" data-remove="' + idx + '" aria-label="Remove ' + esc(p.name || "this photo") + '">&times;</button>' +
        "</div>" +
        '<div class="photo-label-wrap">' +
          '<label class="visually-hidden" for="pl-' + idx + '">Room shown in ' + esc(p.name || "photo " + (idx + 1)) + "</label>" +
          '<select class="photo-label' + (unset ? " is-unset" : "") + '" id="pl-' + idx + '" data-label="' + idx + '">' +
            labelOptions(p.room) +
          "</select>" +
        "</div>" +
      "</div>";
    }

    function render() {
      var n = uploadedPhotos.length;
      if (summary) summary.hidden = n === 0;
      if (totalEl) totalEl.textContent = n;

      /* per-room tally, in the canonical label order */
      if (tally) {
        var counts = {};
        uploadedPhotos.forEach(function (p) { var k = p.room || ""; counts[k] = (counts[k] || 0) + 1; });
        var chips = LABELS.filter(function (l) { return counts[l.key]; }).map(function (l) {
          return '<span class="tally-chip"><span class="tc-dot" aria-hidden="true"></span>' +
                 esc(l.name) + " · <b>" + counts[l.key] + "</b> " + (counts[l.key] === 1 ? "photo" : "photos") + "</span>";
        });
        if (counts[""]) {
          chips.push('<span class="tally-chip is-unlabelled"><span class="tc-dot" aria-hidden="true"></span>' +
                     "Unlabelled · <b>" + counts[""] + "</b></span>");
        }
        tally.innerHTML = chips.join("");
      }

      /* photos grouped by room, unlabelled last */
      if (groups) {
        var buckets = [];
        LABELS.forEach(function (l) {
          var items = uploadedPhotos.filter(function (p) { return p.room === l.key; });
          if (items.length) buckets.push({ name: l.name, items: items });
        });
        var un = uploadedPhotos.filter(function (p) { return !p.room; });
        if (un.length) buckets.push({ name: "Needs a room label", items: un, unlabelled: true });

        groups.innerHTML = buckets.map(function (b) {
          return '<section class="photo-group' + (b.unlabelled ? " is-unlabelled" : "") + '">' +
            '<div class="photo-group-head"><span class="pg-dot" aria-hidden="true"></span>' +
              "<h4>" + esc(b.name) + "</h4>" +
              '<span class="pg-count">' + b.items.length + (b.items.length === 1 ? " photo" : " photos") + "</span>" +
            "</div>" +
            '<div class="photo-grid">' + b.items.map(photoItemHTML).join("") + "</div>" +
          "</section>";
        }).join("");
      }
    }

    /* read a file, downscale it and hand back a data URL (keeps localStorage small) */
    function readImage(file, done) {
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          try {
            var max = 900;
            var scale = Math.min(1, max / Math.max(img.width, img.height));
            var c = document.createElement("canvas");
            c.width = Math.round(img.width * scale);
            c.height = Math.round(img.height * scale);
            c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
            done(c.toDataURL("image/jpeg", 0.72));
          } catch (e) { done(reader.result); }
        };
        img.onerror = function () { done(reader.result); };
        img.src = reader.result;
      };
      reader.onerror = function () { done(""); };
      reader.readAsDataURL(file);
    }

    function addFiles(files) {
      var list = Array.prototype.slice.call(files || []).filter(function (f) {
        return /^image\//.test(f.type);
      });
      if (!list.length) return;
      var room = MAX - uploadedPhotos.length;
      if (room <= 0) { showError("You can add up to " + MAX + " photos."); return; }
      if (list.length > room) {
        list = list.slice(0, room);
        showError("Only the first " + room + " photos were added — the limit is " + MAX + ".");
      } else {
        hideError();
      }
      list.forEach(function (f) {
        var item = { name: f.name, room: "", src: "" };
        uploadedPhotos.push(item);
        readImage(f, function (src) { item.src = src; render(); });
      });
      render();
    }

    if (drop && input) {
      drop.addEventListener("click", function () { input.click(); });
      drop.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); }
      });
      input.addEventListener("change", function () { addFiles(input.files); input.value = ""; });
      ["dragenter", "dragover"].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("is-drag"); });
      });
      ["dragleave", "drop"].forEach(function (ev) {
        drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("is-drag"); });
      });
      drop.addEventListener("drop", function (e) {
        if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
      });
    }

    if (groups) {
      groups.addEventListener("change", function (e) {
        var sel = e.target.closest("[data-label]");
        if (!sel) return;
        var i = parseInt(sel.dataset.label, 10);
        if (uploadedPhotos[i]) uploadedPhotos[i].room = sel.value;
        hideError();
        render();
      });
      groups.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-remove]");
        if (!btn) return;
        uploadedPhotos.splice(parseInt(btn.dataset.remove, 10), 1);
        render();
      });
    }

    if (clearBtn) clearBtn.addEventListener("click", function () {
      uploadedPhotos.length = 0;
      hideError();
      render();
    });

    uploaderRender = render;
    window.RENTNEST_UPLOADER = {
      photos: function () { return uploadedPhotos; },
      unlabelled: function () { return uploadedPhotos.filter(function (p) { return !p.room; }); },
      showError: showError,
      hideError: hideError,
      render: render
    };
    render();
  }

  /* ---------- List-your-property page → add card client-side ---------- */
  function initListProperty() {
    var form = $("#list-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var status = $(".form-status", form);

      /* Every uploaded photo must carry a room label before we accept the listing.
         This runs BEFORE the generic field gate so the message always shows. */
      var unlabelled = uploadedPhotos.filter(function (p) { return !p.room; });
      if (unlabelled.length) {
        if (status) {
          status.className = "form-status is-error";
          status.textContent = unlabelled.length + (unlabelled.length === 1 ? " photo still needs" : " photos still need") +
            " a room label. Choose a room for every photo before submitting.";
        }
        if (window.RENTNEST_UPLOADER) {
          window.RENTNEST_UPLOADER.showError(unlabelled.length + (unlabelled.length === 1 ? " photo needs" : " photos need") +
            " a room label — pick a room for each one above.");
        }
        var firstSel = $(".photo-label.is-unset");
        if (firstSel) {
          firstSel.focus();
          firstSel.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      /* generic required-field validation must also pass */
      if (form.dataset.valid !== "true") return;

      var title = form.elements.title.value.trim();
      var loc = form.elements.location.value.trim();
      var price = parseInt(form.elements.price.value, 10) || 0;
      var beds = parseInt(form.elements.beds.value, 10) || 1;
      var baths = parseInt(form.elements.baths.value, 10) || 1;
      var type = form.elements.type.value || "Apartment";
      var desc = form.elements.description.value.trim();
      var amenities = $$("input[name='amenities']:checked", form).map(function (c) { return c.value; });
      if (!amenities.length) amenities = ["Borehole Water", "Gated Compound"];

      /* group the labelled photos by room — this is what the floor-plan modal reads */
      var roomPhotos = {};
      var gallery = [];
      uploadedPhotos.forEach(function (p) {
        if (!p.src) return;
        (roomPhotos[p.room] = roomPhotos[p.room] || []).push(p.src);
        gallery.push(p.src);
      });
      var rooms = Object.keys(roomPhotos);

      var listing = {
        id: "submitted-" + Date.now(),
        title: title, location: loc, city: loc.split(",").pop().trim(),
        price: price, period: "/year", beds: beds, baths: baths, type: type,
        rating: 4.6, featured: false,
        badge: { text: "Just listed", style: "clay" },
        desc: desc || "A newly submitted rental home — contact the landlord for more details.",
        image: gallery[0] || "images/listing_1.png",
        amenities: amenities,
        gallery: gallery.length ? gallery : ["images/listing_1.png"],
        roomPhotos: roomPhotos,
        rooms: rooms,
        coords: { lat: 4.8533, lng: 7.0633 },
        agent: { name: "You", initials: "ME", role: "Landlord" }
      };
      if (window.RENTNEST_STORE) window.RENTNEST_STORE.add(listing);
      else if (window.RENTNEST_LISTINGS) window.RENTNEST_LISTINGS.unshift(listing);

      if (status) {
        status.className = "form-status is-ok";
        status.innerHTML = "🎉 Your listing <b>" + esc(title) + "</b> has been submitted for review with " +
          gallery.length + (gallery.length === 1 ? " photo" : " photos") + " across " + rooms.length +
          (rooms.length === 1 ? " room" : " rooms") + ". " +
          '<a href="property.html?id=' + encodeURIComponent(listing.id) + '" style="text-decoration:underline;font-weight:800">See how it looks →</a>';
      }

      uploadedPhotos.length = 0;
      if (window.RENTNEST_UPLOADER) window.RENTNEST_UPLOADER.render();
      form.reset();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Boot ---------- */
  function init() {
    initHeader();
    initHeroSearch();
    initFeatured();
    initListings();
    initDetail();
    initForms();
    initPhotoUploader();
    initListProperty();
    initRoomExplorer();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
