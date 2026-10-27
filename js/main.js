/**
 * LUMEN Modern Luxury Atelier Storefront - Core JavaScript Engine
 * Handles State Management (Cart, Wishlist, Promo), Dynamic Rendering,
 * Page Navigation, Toast Notifications, and Checkout Workflow.
 */

// Initial Default Demo Cart Items (Matches design brief & initial state)
const DEFAULT_CART_ITEMS = [
  {
    id: 'p1-overcoat',
    title: 'Double-Faced Cashmere Overcoat',
    subtitle: 'Maison de Lumen',
    variant: 'Warm Camel · Size M',
    price: 420.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1m6_po9Nz3fzW5EIZxRdtogSaavOETxnv6MbebgX9ydV07WUejSz_lYHxbAPIXUtDcxoaHL1iwOX99_F4IUuK234Da2fJ6O9Tiak1JcuiuQOEp-zVbmaMjcqieVnaX9kvLtzb-NhzpxOUinKca4lvX4aDRRaTF_hy9DcGMO6xlN9MXVpdMyN4Jh3bgpXQZh2aLURlHVyRisOw39-NsASCJC6-0vObKqd_-1LdnHLxrYpJ8BpxBy1h'
  },
  {
    id: 'p2-candle',
    title: 'Santal & Amber Candle',
    subtitle: 'Maison Scent',
    variant: '300g · Approx. 65hr Burn',
    price: 62.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3cIHZ7SR8Cg_MSXfRxEm13lc1FbSUz2DHoppZTDwsdAo3Mcydi6Gh-BhdGZzsxtybV2JSl9RBKWs9Qo6dk1SEahRlI1mH4m_eNXW_HpjX9ewkYf-XDrTAPuXQGB0CYyhFtXxC0hT6zuCfO2BpBiFzRcYaKyP8bOoZQ9FWXVQtK135CIvtk2TuaJ0PDxMRPi166UeiP9WcACcyn5vZ0x-cUL9wWhlBgGBC0zlqQCrZP4ng15VnvX7'
  },
  {
    id: 'p3-vessel',
    title: 'Arch Ceramic Table Vessel #04',
    subtitle: 'Atelier Terre',
    variant: 'Natural Terracotta',
    price: 185.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC46bBDix6G0pNU26PG5zBTDTgigzZDiRz-rZag8h6_PYand_ww4pGtpdCRGkG_ke-K4SlE8nTDpx4Hd3qiw5eqqY02HHba9HKCIjnht8BXj6QOB_1ZK8h3XzhAfJAmeiDJCRd9NycKG-VN62t5uyhtbKCZ19wLc7DuhB_lPtoeIBSD7RzyTvsocRdx2BGG5k5q7FPlQTS4khj8wfd_KjTzPIlWTfr7pS4d1wkrLRlNsI_2yyou9vGA'
  }
];

const DEFAULT_WISHLIST = ['p1-overcoat', 'p2-candle'];

/* ============================================================
   1. State Management (LocalStorage)
============================================================ */

function getCart() {
  const saved = localStorage.getItem('lumen_cart_items');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing cart JSON', e);
    }
  }
  saveCart(DEFAULT_CART_ITEMS);
  return DEFAULT_CART_ITEMS;
}

function saveCart(cart) {
  localStorage.setItem('lumen_cart_items', JSON.stringify(cart));
  updateBadges();
}

function getWishlist() {
  const saved = localStorage.getItem('lumen_wishlist_items');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing wishlist JSON', e);
    }
  }
  localStorage.setItem('lumen_wishlist_items', JSON.stringify(DEFAULT_WISHLIST));
  return DEFAULT_WISHLIST;
}

function saveWishlist(list) {
  localStorage.setItem('lumen_wishlist_items', JSON.stringify(list));
  updateBadges();
}

function getActivePromo() {
  return localStorage.getItem('lumen_active_promo') || '';
}

function setActivePromo(code) {
  if (code) {
    localStorage.setItem('lumen_active_promo', code);
  } else {
    localStorage.removeItem('lumen_active_promo');
  }
}

/* ============================================================
   2. Cart Operations
============================================================ */

function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id && item.variant === product.variant);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += (product.quantity || 1);
  } else {
    cart.push({
      id: product.id || 'prod-' + Date.now(),
      title: product.title || 'Curated Product',
      subtitle: product.subtitle || 'LUMEN Collection',
      variant: product.variant || 'Standard Edition',
      price: parseFloat(product.price) || 0,
      quantity: product.quantity || 1,
      image: product.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1m6_po9Nz3fzW5EIZxRdtogSaavOETxnv6MbebgX9ydV07WUejSz_lYHxbAPIXUtDcxoaHL1iwOX99_F4IUuK234Da2fJ6O9Tiak1JcuiuQOEp-zVbmaMjcqieVnaX9kvLtzb-NhzpxOUinKca4lvX4aDRRaTF_hy9DcGMO6xlN9MXVpdMyN4Jh3bgpXQZh2aLURlHVyRisOw39-NsASCJC6-0vObKqd_-1LdnHLxrYpJ8BpxBy1h'
    });
  }

  saveCart(cart);
  showToast(`Added "${product.title}" to bag`, 'shopping_bag');
  
  if (window.location.pathname.endsWith('cart.html')) {
    renderCartPage();
  }
}

function updateCartQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  if (window.location.pathname.endsWith('cart.html')) {
    renderCartPage();
  }
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  showToast('Item removed from cart', 'delete');
  if (window.location.pathname.endsWith('cart.html')) {
    renderCartPage();
  }
}

function clearCart() {
  localStorage.removeItem('lumen_cart_items');
  localStorage.removeItem('lumen_active_promo');
  updateBadges();
}

function calculateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const promo = getActivePromo();
  let discountRate = 0;
  if (promo === 'LUMEN10') discountRate = 0.10;
  if (promo === 'LUMENEARTH' || promo === 'LUMEN15') discountRate = 0.20;

  const discount = subtotal * discountRate;
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 25; // Free over $150
  const tax = subtotal > 0 ? (subtotal - discount) * 0.08875 : 0; // NY ~8.875% tax
  const total = (subtotal - discount) + shipping + tax;

  return {
    subtotal,
    discountRate,
    discount,
    shipping,
    tax,
    total,
    count: cart.reduce((sum, i) => sum + i.quantity, 0)
  };
}

/* ============================================================
   3. Wishlist Operations
============================================================ */

function toggleWishlist(productId, title = 'Item') {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let isAdded = false;

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed from Wishlist`, 'favorite_border');
  } else {
    wishlist.push(productId);
    showToast(`Saved to Curated Wishlist`, 'favorite');
    isAdded = true;
  }

  saveWishlist(wishlist);
  return isAdded;
}

function isWishlisted(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

/* ============================================================
   4. UI Badges & Navigation Highlighter
============================================================ */

function updateBadges() {
  const cart = getCart();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const wishlist = getWishlist();
  const wishlistCount = wishlist.length;

  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
  });

  document.querySelectorAll('.wishlist-count-badge').forEach(badge => {
    badge.textContent = wishlistCount;
    badge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  });
}

function setupActiveNavigation() {
  const path = window.location.pathname.toLowerCase();
  
  let currentKey = 'home';
  if (path.includes('shop.html')) currentKey = 'shop';
  else if (path.includes('product-detail.html')) currentKey = 'shop';
  else if (path.includes('cart.html')) currentKey = 'cart';
  else if (path.includes('checkout.html')) currentKey = 'cart';
  else if (path.includes('index.html') || path.endsWith('/') || path.endsWith('\\')) currentKey = 'home';

  document.querySelectorAll('[data-path]').forEach(link => {
    const key = link.getAttribute('data-path');
    if (key === currentKey) {
      if (link.tagName === 'A' && link.closest('nav.md\\:hidden')) {
        link.classList.add('text-primary', 'font-semibold');
        link.classList.remove('text-on-surface-variant');
      }
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ============================================================
   5. Interactive Toast System
============================================================ */

function showToast(message, iconName = 'check_circle') {
  let toast = document.getElementById('lumen-global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lumen-global-toast';
    toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-0 translate-y-4 transition-all duration-300 flex items-center gap-2.5 px-5 py-3 rounded-full bg-inverse-surface text-white shadow-2xl text-xs font-semibold max-w-[90vw] whitespace-nowrap border border-white/10';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-primary-fixed text-[18px]" id="toast-global-icon">${iconName}</span>
      <span id="toast-global-message">${message}</span>
    `;
    document.body.appendChild(toast);
  }

  const iconEl = document.getElementById('toast-global-icon');
  const msgEl = document.getElementById('toast-global-message');
  if (iconEl) iconEl.textContent = iconName;
  if (msgEl) msgEl.textContent = message;

  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  if (window._lumenToastTimer) clearTimeout(window._lumenToastTimer);
  window._lumenToastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }, 2600);
}

/* ============================================================
   6. Cart Page Renderer (`cart.html`)
============================================================ */

function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  const cart = getCart();
  const totals = calculateCartTotals();

  // Update Item Count header
  const headerCount = document.getElementById('cart-header-count');
  if (headerCount) headerCount.textContent = `(${totals.count})`;

  // Shipping progress indicator ($800 threshold)
  const shippingThreshold = 800;
  const shippingProgress = Math.min(100, Math.round((totals.subtotal / shippingThreshold) * 100));
  const freeRemain = Math.max(0, shippingThreshold - totals.subtotal);

  const shippingText = document.getElementById('shipping-progress-text');
  const progressBar = document.getElementById('shipping-progress-bar');
  const progressRatio = document.getElementById('shipping-progress-ratio');
  const progressPercent = document.getElementById('shipping-progress-percent');

  if (shippingText) {
    if (freeRemain > 0) {
      shippingText.innerHTML = `Add <strong class="text-primary font-bold">$${freeRemain.toFixed(2)}</strong> more for Free Express Delivery`;
    } else {
      shippingText.innerHTML = `<span class="text-tertiary font-bold">Complimentary Worldwide Express Unlocked!</span>`;
    }
  }
  if (progressBar) progressBar.style.width = `${shippingProgress}%`;
  if (progressRatio) progressRatio.textContent = `$${totals.subtotal.toFixed(2)} of $${shippingThreshold.toFixed(2)}`;
  if (progressPercent) progressPercent.textContent = `${shippingProgress}%`;

  // Render items or empty state
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center my-4 border border-outline-variant/30 shadow-xs">
        <div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline-variant mb-4">
          <span class="material-symbols-outlined text-[36px]">production_quantity_limits</span>
        </div>
        <h3 class="font-editorial text-2xl font-bold text-on-surface">Your Bag is Empty</h3>
        <p class="font-body-md text-sm text-on-surface-variant max-w-sm mt-2 mb-6 leading-relaxed">
          Discover our curated collection of architectural outerwear, raw Mongolian cashmere, and artisan stoneware.
        </p>
        <a href="shop.html" class="px-8 py-3.5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-primary-hover active:scale-95 transition-all">
          Explore Collection
        </a>
      </div>
    `;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="bg-white rounded-2xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs transition-all duration-300" id="cart-item-${item.id}">
        <div class="flex gap-4 sm:gap-5">
          <a href="product-detail.html" class="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-surface-container shrink-0 block border border-outline-variant/20 shadow-xs">
            <img class="w-full h-full object-cover" src="${item.image}" alt="${item.title}"/>
            <span class="absolute top-1 left-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">Atelier</span>
          </a>
          <div class="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <div class="flex items-start justify-between gap-2">
                <span class="text-[10px] uppercase font-bold text-secondary tracking-wider block truncate">${item.subtitle}</span>
                <button aria-label="Remove item" class="text-on-surface-variant hover:text-error transition-colors p-1 -mr-1" onclick="removeFromCart('${item.id}')" type="button" title="Remove piece">
                  <span class="material-symbols-outlined text-[19px]">delete</span>
                </button>
              </div>
              <a href="product-detail.html" class="hover:text-primary transition-colors">
                <h2 class="font-editorial text-base sm:text-lg font-semibold text-on-surface leading-tight mt-0.5 truncate">${item.title}</h2>
              </a>
              <p class="text-xs text-on-surface-variant mt-0.5 font-medium">${item.variant}</p>
            </div>
            
            <div class="flex items-center justify-between pt-2 mt-1 border-t border-outline-variant/20">
              <div class="flex items-center bg-surface-container rounded-lg p-0.5 border border-outline-variant/20">
                <button aria-label="Decrease quantity" class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-white rounded text-sm transition-colors" onclick="updateCartQty('${item.id}', -1)" type="button">
                  <span class="material-symbols-outlined text-[15px]">remove</span>
                </button>
                <span class="w-7 text-center text-xs font-bold text-on-surface">${item.quantity}</span>
                <button aria-label="Increase quantity" class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-white rounded text-sm transition-colors" onclick="updateCartQty('${item.id}', 1)" type="button">
                  <span class="material-symbols-outlined text-[15px]">add</span>
                </button>
              </div>
              <div class="text-right">
                <span class="font-editorial text-lg font-bold text-on-surface">$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-between pt-3 mt-3 border-t border-outline-variant/20 text-xs">
          <button class="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-medium" onclick="toggleWishlist('${item.id}', '${item.title}'); removeFromCart('${item.id}');" type="button">
            <span class="material-symbols-outlined text-[16px]">favorite</span>
            <span>Move to Wishlist</span>
          </button>
          <span class="badge-lumen bg-tertiary-fixed text-on-tertiary-fixed">Verified Atelier Stock</span>
        </div>
      </div>
    `).join('');
  }

  // Update summary numbers
  const subtotalEl = document.getElementById('summary-subtotal');
  const discountRow = document.getElementById('summary-discount-row');
  const discountEl = document.getElementById('summary-discount');
  const shippingEl = document.getElementById('summary-shipping');
  const taxEl = document.getElementById('summary-tax');
  const totalEl = document.getElementById('summary-total');
  const btnTotalEl = document.getElementById('btn-total-amount');

  if (subtotalEl) subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
  
  if (discountRow && discountEl) {
    if (totals.discount > 0) {
      discountRow.classList.remove('hidden');
      discountEl.textContent = `-$${totals.discount.toFixed(2)}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${totals.tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${totals.total.toFixed(2)}`;
  if (btnTotalEl) btnTotalEl.textContent = `$${totals.total.toFixed(2)}`;

  // Update promo tag UI
  const appliedTag = document.getElementById('applied-tag');
  const promoInput = document.getElementById('promo-input');
  const activePromo = getActivePromo();
  if (appliedTag) {
    if (activePromo) {
      appliedTag.classList.remove('hidden');
      if (promoInput) promoInput.value = activePromo;
    } else {
      appliedTag.classList.add('hidden');
    }
  }
}

/* ============================================================
   7. Checkout Page Sync & Order Placement (`checkout.html`)
============================================================ */

function setupCheckoutPage() {
  const totals = calculateCartTotals();
  const cart = getCart();

  const countBadge = document.getElementById('summary-items-count');
  if (countBadge) countBadge.textContent = `Order Summary (${totals.count} items)`;

  const drawerContainer = document.getElementById('checkout-items-list');
  if (drawerContainer) {
    if (cart.length > 0) {
      drawerContainer.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between py-2 gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <img class="w-10 h-12 rounded-lg object-cover bg-surface-container shrink-0 border border-outline-variant/30" src="${item.image}" alt="${item.title}"/>
            <div class="min-w-0">
              <span class="font-semibold text-on-surface truncate block text-xs">${item.title}</span>
              <span class="text-[11px] text-on-surface-variant">${item.variant} • Qty: ${item.quantity}</span>
            </div>
          </div>
          <span class="font-editorial text-sm font-bold text-on-surface shrink-0">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');
    } else {
      drawerContainer.innerHTML = `<div class="text-on-surface-variant italic py-2">No items currently in order</div>`;
    }
  }

  const taxSummaryEl = document.getElementById('checkout-tax-val');
  if (taxSummaryEl) taxSummaryEl.textContent = `$${totals.tax.toFixed(2)}`;

  const finalTotalEl = document.getElementById('checkout-final-total');
  if (finalTotalEl) finalTotalEl.textContent = `$${totals.total.toFixed(2)}`;

  const headerTotalEl = document.getElementById('checkout-header-total');
  if (headerTotalEl) headerTotalEl.textContent = `$${totals.total.toFixed(2)}`;

  const footerTotalDisplay = document.getElementById('footer-total-display');
  if (footerTotalDisplay) footerTotalDisplay.textContent = `$${totals.total.toFixed(2)}`;

  // Delivery options switcher
  const deliveryRadios = document.querySelectorAll('input[name="delivery_method"]');
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      let deliveryExtra = e.target.value === 'overnight' ? 25 : 0;
      let newTotal = totals.total + deliveryExtra;
      if (footerTotalDisplay) footerTotalDisplay.textContent = `$${newTotal.toFixed(2)}`;
      if (finalTotalEl) finalTotalEl.textContent = `$${newTotal.toFixed(2)}`;
    });
  });

  // Card input formatting & auto card brand detector
  const cardInput = document.getElementById('input-card');
  const cardTypeDetected = document.getElementById('card-type-detected');
  const badgeVisa = document.getElementById('badge-visa');
  const badgeMaster = document.getElementById('badge-master');
  const badgeAmex = document.getElementById('badge-amex');

  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = formatted.substring(0, 19);

      if (badgeVisa && badgeMaster && badgeAmex) {
        [badgeVisa, badgeMaster, badgeAmex].forEach(b => {
          b.classList.remove('bg-primary', 'text-white');
          b.classList.add('bg-white', 'text-on-surface');
        });

        if (val.startsWith('4')) {
          if (cardTypeDetected) cardTypeDetected.textContent = 'Visa';
          badgeVisa.classList.add('bg-primary', 'text-white');
          badgeVisa.classList.remove('bg-white', 'text-on-surface');
        } else if (val.startsWith('5') || val.startsWith('2')) {
          if (cardTypeDetected) cardTypeDetected.textContent = 'Mastercard';
          badgeMaster.classList.add('bg-primary', 'text-white');
          badgeMaster.classList.remove('bg-white', 'text-on-surface');
        } else if (val.startsWith('3')) {
          if (cardTypeDetected) cardTypeDetected.textContent = 'Amex';
          badgeAmex.classList.add('bg-primary', 'text-white');
          badgeAmex.classList.remove('bg-white', 'text-on-surface');
        } else {
          if (cardTypeDetected) cardTypeDetected.textContent = '';
        }
      }
    });
  }

  // Expiry date formatter
  const expiryInput = document.getElementById('input-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length >= 2) {
        e.target.value = val.substring(0, 2) + ' / ' + val.substring(2, 4);
      } else {
        e.target.value = val;
      }
    });
  }

  // Place Order CTA with Confirmation Modal
  const placeOrderBtn = document.getElementById('place-order-cta');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      placeOrderBtn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Processing Securely...';
      placeOrderBtn.disabled = true;

      setTimeout(() => {
        const orderId = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
        showOrderSuccessModal(orderId, totals);
        clearCart();
      }, 1400);
    });
  }
}

function showOrderSuccessModal(orderId, totals) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in';
  modal.innerHTML = `
    <div class="bg-white max-w-sm w-full rounded-3xl p-7 shadow-2xl text-center flex flex-col items-center border border-outline-variant/30">
      <div class="w-16 h-16 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-3">
        <span class="material-symbols-outlined text-[32px]">verified</span>
      </div>
      <span class="font-label-sm text-[11px] uppercase tracking-widest text-primary font-bold">Order Confirmed</span>
      <h3 class="font-editorial text-2xl font-bold text-on-surface mt-1">Thank You For Your Order</h3>
      <p class="font-body-md text-xs text-on-surface-variant mt-1.5 leading-relaxed">
        A bespoke confirmation and real-time courier tracking link have been dispatched to your email.
      </p>
      
      <div class="w-full bg-surface-container-low rounded-2xl p-4 my-5 text-left text-xs font-body-sm space-y-1.5 border border-outline-variant/20">
        <div class="flex justify-between text-on-surface">
          <span class="text-on-surface-variant">Order Reference:</span>
          <span class="font-semibold text-primary font-mono">${orderId}</span>
        </div>
        <div class="flex justify-between text-on-surface">
          <span class="text-on-surface-variant">Estimated Delivery:</span>
          <span class="font-semibold">Thursday, Oct 29</span>
        </div>
        <div class="flex justify-between text-on-surface pt-2 border-t border-outline-variant/30">
          <span class="font-bold">Total Paid:</span>
          <span class="font-editorial text-lg font-bold text-on-surface">$${totals.total.toFixed(2)}</span>
        </div>
      </div>

      <a href="index.html" class="w-full py-3.5 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-primary-hover active:scale-95 transition-all text-center">
        Back to Storefront
      </a>
    </div>
  `;
  document.body.appendChild(modal);
}

/* ============================================================
   8. Global DOM Init
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  updateBadges();
  setupActiveNavigation();

  // If on Cart page
  if (window.location.pathname.endsWith('cart.html') || document.getElementById('cart-items-container')) {
    renderCartPage();

    const promoBtn = document.getElementById('apply-promo-btn');
    if (promoBtn) {
      promoBtn.addEventListener('click', () => {
        const input = document.getElementById('promo-input');
        if (!input) return;
        const code = input.value.trim().toUpperCase();
        if (code === 'LUMEN10' || code === 'LUMENEARTH' || code === 'LUMEN15') {
          setActivePromo(code);
          showToast(`Promo Code ${code} Applied!`);
          renderCartPage();
        } else {
          showToast('Invalid voucher code', 'error');
        }
      });
    }

    const removePromoBtn = document.getElementById('remove-promo-btn');
    if (removePromoBtn) {
      removePromoBtn.addEventListener('click', () => {
        setActivePromo('');
        showToast('Promo code removed');
        renderCartPage();
      });
    }
  }

  // If on Checkout page
  if (window.location.pathname.endsWith('checkout.html') || document.getElementById('place-order-cta')) {
    setupCheckoutPage();
  }

  // Global Wishlist heart triggers
  document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-product-id') || 'item-' + Date.now();
      const title = btn.getAttribute('data-product-title') || 'Piece';
      const isAdded = toggleWishlist(id, title);
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        if (isAdded) {
          icon.style.fontVariationSettings = "'FILL' 1";
          btn.classList.add('text-primary');
        } else {
          icon.style.fontVariationSettings = "'FILL' 0";
          btn.classList.remove('text-primary');
        }
      }
    });
  });
});
