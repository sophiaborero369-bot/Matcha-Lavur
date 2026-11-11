/* ===== MATCHA LAVUR - script.js ===== */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const peso = n => '₱' + Number(n).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
/* ---------- DATA (edit names, prices, images here) ---------- */
const PRODUCTS = [
  {id:1,name:'Blueberry Matcha Spring Latte',cat:'Drinks',price:180,rate:4.9,img:'Blueberry_Matcha Spring Latte.jfif',desc:'Fresh blueberries blended with creamy milk and layered with iced ceremonial matcha.'},
  {id:2,name:'Dirty Matcha Latte',cat:'Drinks',price:175,rate:4.7,img:'dirty matcha latte.jpg',desc:'Rich espresso layered with fresh milk and ceremonial matcha over ice.'},
  {id:3,name:'Strawberry Matcha',cat:'Drinks',price:215,rate:4.9,img:'StrawberryMatchaLatte-1.jpg',desc:'Ceremonial matcha with fresh milk, sweet strawberry cream, and ice.'},
  {id:4,name:'Honey Cinnamon Matcha',cat:'Drinks',price:205,rate:4.8,img:'honey cinnamon matcha latte.jfif',desc:'Ceremonial matcha with fresh milk, natural honey, and a hint of cinnamon over ice.'},
  {id:5,name:'Iced Matcha Latte',cat:'Drinks',price:175,rate:4.7,img:'Iced Matcha Latte.jpg',desc:'Ceremonial matcha blended with fresh milk over ice, topped with creamy milk foam and matcha powder.'},
  {id:6,name:'Iced Pistachio Matcha Mint Shake',cat:'Drinks',price:225,rate:5,img:'Iced-Pistachio-Matcha-Mint-Shake-.jpg',desc:'Creamy ceremonial matcha blended with pistachio, fresh mint, and milk, topped with whipped cream and crushed pistachios.'},
  {id:7,name:'Mango Sticky Rice Matcha',cat:'Drinks',price:195,rate:4.8,img:'mango-sticky-rice-matcha-latte.jpg',desc:'Ceremonial matcha with fresh milk, sweet mango puree, and creamy coconut sticky rice over ice.'},
  {id:8,name:'Matcha Bubble Milk Tea',cat:'Drinks',price:165,rate:4.7,img:'matcha bubble milk tea.jpg',desc:'Ceremonial matcha with fresh milk, chewy tapioca pearls, and ice.'},
  {id:9,name:'Matcha Ice Cream Latte',cat:'Drinks',price:190,rate:4.9,img:'Matcha Ice Cream Latte with crunchy cookies.jfif',desc:'Creamy ceremonial matcha blended with fresh milk and ice, topped with vanilla ice cream, whipped cream, and crunchy chocolate cookies.'},
  {id:10,name:'Matcha Lemonade',cat:'Drinks',price:155,rate:4.8,img:'Matcha-Lemonade.jpg',desc:'Ceremonial matcha blended with fresh lemonade and ice, topped with a refreshing citrus twist.'},
  {id:11,name:'Matcha Suman',cat:'Drinks',price:190,rate:5,img:'suman.png',desc:'Creamy iced matcha layered with fresh milk, rich latik syrup, topped with whipped cream, toasted coconut flakes, and a piece of sweet suman.'},
  {id:12,name:'Ube Matcha',cat:'Drinks',price:195,rate:4.9,img:'ube.jfif',desc:'Ceremonial matcha blended with sweet ube and fresh milk, served ice-cold and garnished with a slice of real purple yam.'},
  {id:13,name:'Turkish Delight Matcha',cat:'Drinks',price:220,rate:4.7,img:'turkish delight matcha.jpg',desc:'Ceremonial matcha infused with delicate rosewater and pistachio essence, steamed with fresh milk and finished with velvety milk foam.'},
  {id:14,name:'Matcha Gateau au Chocolat Cake',cat:'Sweets',price:2200,rate:4.9,img:'matcha gateau au chocolat.jfif',desc:'Rich ceremonial matcha baked with white chocolate, topped with fresh whipped cream and a fine dusting of green tea powder.'},
  {id:15,name:'Matcha Basque Cheesecake',cat:'Sweets',price:1950,rate:4.8,img:'matcha-basque-cheesecake.jpg',desc:'Creamy ceremonial matcha cheesecake baked with a caramelized top, finished with whipped cream and fresh thyme.'},
  {id:16,name:'Matcha Crepe Cake',cat:'Sweets',price:2500,rate:5,img:'matcha-crepe-cake.jpg',desc:'Delicate layers of paper-thin matcha crepes infused with light green tea cream, dusted with matcha powder and dollops of whipped cream.'},
  {id:17,name:'Matcha Mousse Cake',cat:'Sweets',price:1750,rate:4.8,img:'Matcha-Mousse-Cake-01.jpg',desc:'Silky double-layer mousse with ceremonial matcha and sweet white chocolate over a soft matcha sponge base, dusted with green tea powder.'},
  {id:18,name:'Matcha Strawberry Cake',cat:'Sweets',price:2150,rate:4.9,img:'Matcha-Strawberry cake.jpg',desc:'Light matcha sponge frosted with ceremonial green tea cream, topped with fresh strawberries and edible flowers.'},
  {id:19,name:'Triple Matcha Mousse Cake',cat:'Sweets',price:240,rate:4.9,img:'triple matcha mousse cake.jpg',desc:'Layers of light matcha sponge, silky green tea mousse, and pipe cream topped with fresh raspberries and matcha chocolate bar garnish.'},
  {id:20,name:'Matcha Cupcakes with Cinnamon Buttercream (Box of 12)',cat:'Sweets',price:1250,rate:4.8,img:'Matcha-cupcakes-with cinnamon buttercream.jpg',desc:'Moist ceremonial matcha sponge topped with swirl of spiced cinnamon buttercream and a fine dusting of green tea powder.'},
  {id:21,name:'Matcha Tiramisu',cat:'Sweets',price:220,rate:4.8,img:'Matcha-Tiramisu-.jpg',desc:'Matcha-soaked ladyfingers layered with rich mascarpone cream, finished with a generous dusting of green tea powder.'},
  {id:22,name:'Vegan Matcha Mochi (Box of 6)',cat:'Sweets',price:500,rate:4.9,img:'vegan matcha motchi.jpg',desc:'Chewy rice dough filled with smooth, plant-based ceremonial matcha ice cream.'},
  {id:23,name:'Matcha Cookies (Box of 12)',cat:'Sweets',price:720,rate:4.7,img:'matcha-cookies.jpg',desc:'Soft-baked ceremonial matcha cookies half-dipped in sweet white chocolate and sprinkled with toasted black sesame seeds.'},
  {id:24,name:'Matcha Powder Ceremonial Grade (100g)',cat:'Powder',price:2500,rate:4.9,img:'Matcha powder ceremonial grade 100g asayu japan.jpg',desc:'First-harvest Japanese green tea leaves stone-ground into a fine ceremonial powder, offering a vibrant emerald color with a smooth umami finish.'},
  {id:25,name:'Matcha Green Powder (Chocolate Flavor 30g)',cat:'Powder',price:1250,rate:4.9,img:'matcha green powder chocolate flavor.jfif',desc:'Authentic Kyoto Uji green tea powder subtly infused with a sweet chocolate aroma, offering a smooth finish without added sugar or harsh bitterness.'},
  {id:26,name:'Original Matcha Latte Powder',cat:'Powder',price:2350,rate:4.9,img:'original matcha latte ppowder.jpg',desc:'Ceremonial-grade Japanese Uji matcha lightly sweetened with organic cane sugar, crafted for a smooth, calm energy boost.'},
  {id:27,name:'Matcha Culinary Powder',cat:'Powder',price:1500,rate:4.8,img:'matcha culinary powder.jpg',desc:'100% Japanese green tea leaves from Kagoshima stone-ground into a robust, vibrant powder, perfect for baking, lattes, and culinary creations.'},
  {id:28,name:'Fukujuen Ceremonial Matcha (Pack of 10 sticks)',cat:'Powder',price:2050,rate:4.9,img:'4902405138202_02.jpg',desc:'Double-walled stainless steel tumbler with a ceramic interior, keeping your matcha drinks hot or cold for hours.'},
  {id:29,name:'AquaFlask AquaSip (32oz)',cat:'Merchandise',price:1390,rate:4.8,img:'aquaflask-7388-3478044-1.webp',desc:'32oz double-wall vacuum-insulated stainless steel water bottle in monochromatic Matcha green, keeping drinks cold for up to 24 hours or hot for up to 12 hours.'},
  {id:30,name:'7-Piece Ceramic Matcha Tea Ceremony Gift Set',cat:'Merchandise',price:1800,rate:4.8,img:'matcha tea set.webp',desc:'Authentic Japanese tea ceremony kit featuring a hand-glazed ceramic bowl, bamboo whisk and scoop, sifter, and tea towel.'},
  {id:31,name:'2 Ceramic Matcha Mug',cat:'Merchandise',price:1200,rate:4.8,img:'mug.webp',desc:'A beautiful ceramic mug perfect for enjoying your favorite matcha preparation.'},
  {id:32,name:'Matcha Roll Cow Plush (Sheepydust)',cat:'Merchandise',price:2600,rate:4.9,img:'toy.webp',desc:'Fluffy pastel-green Highland cow plush wearing a leafy headband topped with a mini matcha roll cake slice, complete with an embroidered pink butterfly and a green ribbon tied with a brass bell.'},
  {id:33,name:'Monchhichi Keychain',cat:'Merchandise',price:850,rate:5.0,img:'monchhichi keychain matcha.webp',desc:'Vibrant matcha green Monchhichi plush keychain featuring tea-leaf hair details, twin tails, soft green fur, and a classic bib with a tea cup illustration.'},
  {id:34,name:'Matcha Green Ring-Handle Folding Umbrella with Retractable Drip Sleeve',cat:'Merchandise',price:680,rate:4.9,img:'umbrella.webp',desc:'3-fold compact umbrella featuring a textured floral-embossed matcha green canopy, an ergonomic carabiner ring handle, and a built-in telescopic drip cover that slides over the folded umbrella to keep your bag and car dry.'},
  {id:35,name:'"But First, Matcha" Canvas Tote Bag',cat:'Merchandise',price:480,rate:4.7,img:'tote bag.jpeg',desc:'Eco-friendly off-white cotton canvas tote bag featuring an adorable smiling matcha cup graphic and bold "BUT FIRST Matcha" typography.'}



];
const VOUCHERS = [
  {code:'LAVUR50', label:'P50 off', type:'amt', val:50, min:300},
  {code:'WELCOME100', label:'P100 off', type:'amt', val:100, min:500},
  {code:'FREESHIP', label:'Free shipping', type:'ship', val:0, min:200}
];
const DISCOUNTS = [
  {code:'NEWOPEN10', label:'10% off (New Opening)', type:'pct', val:10, min:0},
  {code:'GRANDOPEN15', label:'15% off', type:'pct', val:15, min:600},
  {code:'MATCHA20', label:'20% off', type:'pct', val:20, min:1000}
];
const SHIP = {std: 49, exp: 99};
const DEMO_PAYMENT_METHODS = ['GCash', 'Maya', 'PayPal', 'Online Banking', 'BDO Online Banking', 'Other Online Banking', 'Credit/Debit Card (Demo)'];
const OWNER_EMAIL = 'matchalavur@gmail.com';
const FAQ = [
  ['How do I place an order?', 'Add items to your cart, open Purchase, fill in your details, choose delivery or pickup, and press Place Order.'],
  ['What payment methods are accepted?', 'Cash on delivery, cash on pickup, or demo e-wallet, online banking, and card options. Online payment details are test-only and no real payment is processed.'],
  ['How do vouchers and discounts work?', 'On the Purchase page choose either a voucher or a discount. Only one can be used per order and each has a minimum spend.'],
  ['Can I cancel my order?', 'Yes, while it is in To Ship. Go to My Purchase and press Cancel Order.'],
  ['How do I return or refund an item?', 'After an order is Completed, open My Purchase > Completed and press Request Return/Refund.'],
  ['How long does delivery take?', 'In Davao City, drinks and sweets arrive in minutes. Powder and merchandise deliver in 2 to 4 days. Outside Davao City, only powder and merchandise can be ordered and delivery takes 2 to 4 days. Pickup is also available.']
];
const SEED_REVIEWS = [
  {id:'s1', name:'Angela R.', pid:3, stars:5, text:'The strawberry matcha is perfect. Not too sweet and the matcha is rich!', img:'images/review1.jpg', date:'Nov 2, 2026', help:12},
  {id:'s2', name:'Marco D.', pid:15, stars:5, text:'Best matcha basque cheesecake I have tried. Arrived cold and intact.', img:'images/review2.jpg', date:'Nov 1, 2026', help:9},
  {id:'s3', name:'Kyla S.', pid:22, stars:4, text:'Mochi was so soft. Would love more flavors next time.', img:'images/review3.jpg', date:'Oct 30, 2026', help:4},
  {id:'s4', name:'Paolo T.', pid:5, stars:5, text:'My daily iced latte now. Smooth and not bitter at all.', img:'', date:'Oct 28, 2026', help:6},
  {id:'s5', name:'Jen L.', pid:6, stars:3, text:'Tasty frappe but it melted a bit on the way. Still good.', img:'', date:'Oct 27, 2026', help:2}
];
const P = id => PRODUCTS.find(p => p.id === id);
const phImg = (src, label) => `<div class="ph"><img src="${escapeHtml(src)}" alt=""><span>${escapeHtml(label)}<br>${escapeHtml(src)}</span></div>`;
const ICON_BAG = '<div class="empty-ic"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 016 0"/></svg></div>';

/* ---------- STATE ---------- */
const supabaseClient = window.supabase.createClient(window.MATCHA_SUPABASE_URL, window.MATCHA_SUPABASE_ANON_KEY);
let session = null, authUser = null, me = null, isAdmin = false;
let stock = Object.fromEntries(PRODUCTS.map(p => [p.id, 20]));
let userReviews = [], reviewVoteCounts = {}, ownerCustomers = [];
let cat = 'all', rating = 0, orderTab = 'To Ship', rateOrder = null, rf = 'all', pfPhoto = null, adminCustomer = '', pendingPage = 'home', cancelPage = 'home', realtimeChannel = null;
let saveQueue = Promise.resolve();
const save = () => {
  const operation = saveQueue.then(async () => {
    if (!authUser || !me) return;
    const profileResult = await supabaseClient.from('profiles').update({
      full_name: me.name,
      phone: me.profile.phone,
      address: me.profile.addr,
      bio: me.profile.bio,
      photo_url: me.profile.photo
    }).eq('id', authUser.id);
    if (profileResult.error) throw profileResult.error;
    if (!isAdmin) {
      const cartResult = await supabaseClient.from('cart_items').delete().eq('customer_id', authUser.id);
      if (cartResult.error) throw cartResult.error;
      if (me.cart.length) {
        const result = await supabaseClient.from('cart_items').insert(me.cart.map(item => ({
          customer_id: authUser.id, product_id: item.id, quantity: item.qty
        })));
        if (result.error) throw result.error;
      }
      const wishlistResult = await supabaseClient.from('wishlist_items').delete().eq('customer_id', authUser.id);
      if (wishlistResult.error) throw wishlistResult.error;
      if (me.wish.length) {
        const result = await supabaseClient.from('wishlist_items').insert(me.wish.map(id => ({
          customer_id: authUser.id, product_id: id
        })));
        if (result.error) throw result.error;
      }
    }
  });
  saveQueue = operation.catch(showDatabaseError);
  return operation.then(() => true, () => false);
};
async function loadStock() {
  const {data, error} = await supabaseClient.from('products').select('id,stock');
  if (error) throw error;
  stock = Object.fromEntries(data.map(product => [product.id, product.stock]));
}
const visiblePage = () => $('[data-page]:not([hidden])')?.dataset.page || 'home';
function setRealtimeStatus(status) {
  const badge = $('#liveStatus');
  badge.classList.toggle('is-live', status === 'live');
  badge.classList.toggle('is-error', status === 'error');
  badge.textContent = status === 'live' ? 'Live database'
    : status === 'error' ? 'Live updates unavailable'
      : 'Connecting to database';
}
async function refreshRealtimeState(userId) {
  await loadStock();
  if (userId) {
    if (isAdmin) {
      const {data: profile, error} = await supabaseClient.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      if (authUser?.id !== userId) return;
      me.name = profile.full_name || authUser.user_metadata?.full_name || authUser.email;
      me.profile = {photo: profile.photo_url || '', phone: profile.phone || '', addr: profile.address || '', bio: profile.bio || ''};
      me.cart = []; me.wish = []; me.orders = []; me.msgs = []; me.voted = [];
      const {data: customers, error: customersError} = await supabaseClient.from('profiles').select('id,email,full_name').neq('id', userId);
      if (customersError) throw customersError;
      ownerCustomers = customers;
      renderHeader();
      updateCount();
      if (visiblePage() === 'admin') await renderAdmin();
      return;
    }
    const results = await Promise.all([
      supabaseClient.from('profiles').select('*').eq('id', userId).single(),
      supabaseClient.from('cart_items').select('product_id,quantity').eq('customer_id', userId),
      supabaseClient.from('wishlist_items').select('product_id').eq('customer_id', userId),
      supabaseClient.from('orders').select('*,order_items(*)').order('created_at', {ascending: false}),
      supabaseClient.from('messages').select('*').eq('customer_id', userId).order('created_at'),
      supabaseClient.from('review_votes').select('review_id').eq('customer_id', userId)
    ]);
    for (const result of results) if (result.error) throw result.error;
    if (authUser?.id !== userId) return;
    const [profile, cart, wishlist, orders, messages, votes] = results.map(result => result.data);
    me.name = profile.full_name || authUser.user_metadata?.full_name || authUser.email;
    me.profile = {photo: profile.photo_url || '', phone: profile.phone || '', addr: profile.address || '', bio: profile.bio || ''};
    me.cart = cart.map(item => ({id: item.product_id, qty: item.quantity}));
    me.wish = wishlist.map(item => item.product_id);
    me.orders = orders.filter(order => order.customer_id === userId).map(mapDatabaseOrder);
    me.msgs = messages.map(message => ({
      id: message.id,
      from: message.sender_role === 'customer' ? 'me' : 'them',
      t: message.message,
      time: new Date(message.created_at).toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'})
    }));
    me.voted = votes.map(vote => vote.review_id);
    if (isAdmin) {
      const {data, error} = await supabaseClient.from('profiles').select('id,email,full_name').neq('id', userId);
      if (error) throw error;
      ownerCustomers = data;
    }
    renderHeader();
    updateCount();
  }
  const page = visiblePage();
  if (page === 'products') renderProducts();
  if (page === 'reviews') await renderReviews();
  if (page === 'cart') renderCart();
  if (page === 'checkout') renderCheckout();
  if (page === 'mypurchase') await renderOrders();
  if (page === 'message' && userId) await renderChat();
  if (page === 'admin' && isAdmin) await renderAdmin();
}
async function subscribeToStoreChanges(user) {
  if (realtimeChannel) await supabaseClient.removeChannel(realtimeChannel);
  setRealtimeStatus('connecting');
  const channel = supabaseClient.channel('matcha-store-' + (user?.id || 'public'))
    .on('postgres_changes', {event: '*', schema: 'public', table: 'products'}, async () => {
      try {
        await loadStock();
        const page = visiblePage();
        if (page === 'products') renderProducts();
        if (page === 'cart') renderCart();
        if (page === 'checkout') renderCheckout();
        if (page === 'admin' && isAdmin) await renderAdmin();
      } catch (error) { showDatabaseError(error); }
    })
    .on('postgres_changes', {event: '*', schema: 'public', table: 'reviews'}, () => {
      if (visiblePage() === 'reviews') renderReviews();
    });
  if (user) {
    channel
      .on('postgres_changes', {event: '*', schema: 'public', table: 'orders'}, async () => {
        try {
          if (isAdmin && visiblePage() === 'admin') await renderAdmin();
          if (!isAdmin && authUser?.id === user.id) {
            const {data, error} = await supabaseClient.from('orders').select('*,order_items(*)')
              .eq('customer_id', user.id).order('created_at', {ascending: false});
            if (error) throw error;
            me.orders = data.map(mapDatabaseOrder);
            if (visiblePage() === 'mypurchase') await renderOrders();
          }
        } catch (error) { showDatabaseError(error); }
      })
      .on('postgres_changes', {event: '*', schema: 'public', table: 'profiles'}, async () => {
        try {
          if (isAdmin && visiblePage() === 'admin') await renderAdmin();
          if (authUser?.id === user.id) {
            const {data, error} = await supabaseClient.from('profiles').select('*').eq('id', user.id).single();
            if (error) throw error;
            me.name = data.full_name || user.email;
            me.profile = {photo: data.photo_url || '', phone: data.phone || '', addr: data.address || '', bio: data.bio || ''};
            renderHeader();
            if (visiblePage() === 'admin' && isAdmin) await renderAdmin();
          }
        } catch (error) { showDatabaseError(error); }
      })
      .on('postgres_changes', {event: '*', schema: 'public', table: 'messages'}, async event => {
        try {
          if (authUser?.id === user.id && !isAdmin && visiblePage() === 'message') await renderChat();
          if (isAdmin && visiblePage() === 'admin') {
            const customerId = event.new?.customer_id || event.old?.customer_id;
            if (customerId && !ownerCustomers.some(customer => customer.id === customerId)) {
              await renderAdmin();
            } else if (!customerId || customerId === adminCustomer) {
              await renderAdminChat();
            }
          }
        } catch (error) { showDatabaseError(error); }
      })
      .on('postgres_changes', {event: '*', schema: 'public', table: 'cart_items'}, async () => {
        try {
          if (isAdmin || authUser?.id !== user.id) return;
          const {data, error} = await supabaseClient.from('cart_items').select('product_id,quantity').eq('customer_id', user.id);
          if (error) throw error;
          me.cart = data.map(item => ({id: item.product_id, qty: item.quantity}));
          updateCount();
          if (visiblePage() === 'cart') renderCart();
          if (visiblePage() === 'checkout') renderCheckout();
        } catch (error) { showDatabaseError(error); }
      })
      .on('postgres_changes', {event: '*', schema: 'public', table: 'wishlist_items'}, async () => {
        try {
          if (isAdmin || authUser?.id !== user.id) return;
          const {data, error} = await supabaseClient.from('wishlist_items').select('product_id').eq('customer_id', user.id);
          if (error) throw error;
          me.wish = data.map(item => item.product_id);
          if (visiblePage() === 'products') renderProducts();
        } catch (error) { showDatabaseError(error); }
      })
      .on('postgres_changes', {event: '*', schema: 'public', table: 'review_votes'}, async () => {
        try {
          if (isAdmin || authUser?.id !== user.id) return;
          const {data, error} = await supabaseClient.from('review_votes').select('review_id').eq('customer_id', user.id);
          if (error) throw error;
          me.voted = data.map(vote => vote.review_id);
          if (visiblePage() === 'reviews') await renderReviews();
        } catch (error) { showDatabaseError(error); }
      });
  }
  realtimeChannel = channel.subscribe(async status => {
    if (realtimeChannel !== channel) return;
    if (status === 'SUBSCRIBED') {
      setRealtimeStatus('live');
      try { await refreshRealtimeState(user?.id); } catch (error) { showDatabaseError(error); }
    } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
      setRealtimeStatus('error');
      console.error('Supabase realtime connection status:', status);
    }
  });
}
let toastT;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 3000); }
document.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.remove(); }, true);
const openModal = id => $('#' + id).hidden = false, closeModal = id => $('#' + id).hidden = true;
document.addEventListener('click', e => { const c = e.target.closest('[data-close]'); if (c) closeModal(c.dataset.close); });
const initial = n => (n || '?').trim()[0].toUpperCase();
const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
function setAv(el, name, photo) { el.style.backgroundImage = photo ? `url(${photo})` : ''; el.textContent = photo ? '' : initial(name); }

/* ---------- AUTH ---------- */
function showAuth(w) {
  $$('[data-auth]').forEach(x => x.classList.toggle('active', x.dataset.auth === w));
  $('#loginForm').hidden = w !== 'login'; $('#signupForm').hidden = w !== 'signup'; $('#resetForm').hidden = w !== 'reset';
  $('.auth-card .tabs').hidden = w === 'reset'; authMsg('');
}
function authMsg(t, ok) { const m = $('#authMsg'); m.textContent = t; m.className = ok ? 'ok' : 'err'; }
function authErrorMessage(error, flow) {
  const message = error.message || 'Authentication failed. Please try again.';
  if (error.code === 'over_email_send_rate_limit' || /email rate limit exceeded/i.test(message)) {
    return flow === 'signup'
      ? 'Sign-up email delivery is temporarily rate-limited. Please try again later. The store owner needs to configure custom email delivery in Supabase for customer sign-up.'
      : 'Email delivery is temporarily rate-limited. Please try again later or contact the store owner.';
  }
  if (/email not confirmed/i.test(message)) {
    return 'This email is not confirmed yet. Check your inbox for the confirmation link, or try again after the store email service is configured.';
  }
  return message;
}
$$('[data-auth]').forEach(b => b.onclick = () => showAuth(b.dataset.auth));
$('#auth').addEventListener('click', e => {
  const button = e.target.closest('[data-toggle-password]');
  if (!button) return;
  const input = document.getElementById(button.getAttribute('aria-controls'));
  const isVisible = input.type === 'password';
  input.type = isVisible ? 'text' : 'password';
  button.setAttribute('aria-pressed', String(isVisible));
  button.setAttribute('aria-label', isVisible ? 'Hide password' : 'Show password');
});
$('#forgotLink').onclick = e => { e.preventDefault(); showAuth('reset'); };
$('#backLogin').onclick = e => { e.preventDefault(); showAuth('login'); };
function showDatabaseError(error) {
  console.error('Supabase request failed:', error);
  toast(error.message || 'Database request failed. Please try again.');
}
async function loadAccountData(user) {
  isAdmin = user.email?.toLowerCase() === OWNER_EMAIL;
  const profileResult = await supabaseClient.from('profiles').select('*').eq('id', user.id).single();
  if (profileResult.error) throw profileResult.error;
  const profile = profileResult.data;
  let cart = [], wishlist = [], orders = [], messages = [], votes = [];
  if (!isAdmin) {
    const results = await Promise.all([
      supabaseClient.from('cart_items').select('product_id,quantity').eq('customer_id', user.id),
      supabaseClient.from('wishlist_items').select('product_id').eq('customer_id', user.id),
      supabaseClient.from('orders').select('*,order_items(*)').order('created_at', {ascending: false}),
      supabaseClient.from('messages').select('*').eq('customer_id', user.id).order('created_at'),
      supabaseClient.from('review_votes').select('review_id').eq('customer_id', user.id)
    ]);
    for (const result of results) if (result.error) throw result.error;
    [cart, wishlist, orders, messages, votes] = results.map(result => result.data);
  }
  me = {
    name: profile.full_name || user.user_metadata?.full_name || user.email,
    profile: {photo: profile.photo_url || '', phone: profile.phone || '', addr: profile.address || '', bio: profile.bio || ''},
    cart: cart.map(item => ({id: item.product_id, qty: item.quantity})),
    wish: wishlist.map(item => item.product_id),
    voted: votes.map(vote => vote.review_id),
    msgs: messages.map(message => ({id: message.id, from: message.sender_role === 'customer' ? 'me' : 'them', t: message.message, time: new Date(message.created_at).toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'})})),
    orders: orders.filter(order => order.customer_id === user.id).map(mapDatabaseOrder)
  };
  session = user.email;
  authUser = user;
  $('#auth').hidden = true; $('#app').hidden = false; $('#loginLink').hidden = true;
  $('#profileBtn').hidden = false; $('#logout').hidden = false;
  renderAccountNavigation();
  $('#coName').value = me.name; $('#coEmail').value = user.email; $('#coPhone').value = me.profile.phone; $('#coAddr').value = me.profile.addr;
  renderHeader(); updateCount(); go(isAdmin ? 'admin' : pendingPage); pendingPage = 'home';
}
function mapDatabaseOrder(order) {
  return {
    dbId: order.id, id: order.order_number, date: new Date(order.created_at).toLocaleString(),
    items: (order.order_items || []).map(item => ({id: item.product_id, qty: item.quantity, price: Number(item.unit_price), name: item.product_name})),
    total: Number(order.total), sub: Number(order.subtotal), ship: Number(order.shipping_fee),
    disc: Number(order.discount), code: order.promo_code, method: order.payment_method,
    delivery: order.delivery_estimate, fulfillment: order.fulfillment, note: order.note,
    status: order.status, rated: order.rated, name: order.customer_name,
    addr: order.address, phone: order.phone, email: order.customer_email,
    customerId: order.customer_id, refundReason: order.refund_reason, refundDecision: order.refund_decision
  };
}
async function startSession(user) {
  if (authUser?.id === user.id && me) return;
  try {
    await loadAccountData(user);
    if (isAdmin) {
      const {data, error} = await supabaseClient.from('profiles').select('id,email,full_name').neq('id', user.id);
      if (error) throw error;
      ownerCustomers = data;
    }
    await subscribeToStoreChanges(user);
    toast(isAdmin ? 'Welcome, owner!' : 'Welcome to Matcha Lavur!');
  } catch (error) {
    showDatabaseError(error);
    authMsg('Could not load your account data: ' + error.message);
  }
}
async function startGuest(signOut = false) {
  if (realtimeChannel) {
    await supabaseClient.removeChannel(realtimeChannel);
    realtimeChannel = null;
  }
  if (signOut) {
    const {error} = await supabaseClient.auth.signOut();
    if (error) return showDatabaseError(error);
  }
  me = null; authUser = null; isAdmin = false; session = null;
  await subscribeToStoreChanges(null);
  $('#auth').hidden = true; $('#app').hidden = false;
  $('#loginLink').hidden = false; $('#profileBtn').hidden = true; $('#logout').hidden = true;
  renderAccountNavigation();
  go('home');
}
function requireLogin(page = 'home') {
  if (me) return true;
  cancelPage = $('[data-page]:not([hidden])')?.dataset.page || 'home';
  pendingPage = page;
  showAuth('login'); $('#auth').hidden = false;
  return false;
}
$('#loginLink').onclick = () => {
  cancelPage = pendingPage = $('[data-page]:not([hidden])')?.dataset.page || 'home';
  showAuth('login'); $('#auth').hidden = false;
};
$('#cancelLogin').onclick = () => {
  const page = cancelPage;
  pendingPage = cancelPage = 'home';
  startGuest();
  go(page);
};
$('#logout').onclick = () => startGuest(true);
$('#reviewLogin').onclick = () => requireLogin('reviews');
$('#signupForm').onsubmit = async e => {
  e.preventDefault();
  if ($('#suPass').value !== $('#suPass2').value) return authMsg('Passwords do not match.');
  const {data, error} = await supabaseClient.auth.signUp({
    email: $('#suEmail').value.trim().toLowerCase(),
    password: $('#suPass').value,
    options: {data: {full_name: $('#suName').value.trim()}}
  });
  if (error) return authMsg(authErrorMessage(error, 'signup'));
  if (data.session) await startSession(data.user);
  else authMsg('Account created. Confirm your email, then log in.', true);
};
$('#loginForm').onsubmit = async e => {
  e.preventDefault();
  const {data, error} = await supabaseClient.auth.signInWithPassword({
    email: $('#liEmail').value.trim().toLowerCase(), password: $('#liPass').value
  });
  if (error) return authMsg(authErrorMessage(error, 'login'));
  if (data.user) await startSession(data.user);
};
$('#resetForm').onsubmit = async e => {
  e.preventDefault();
  const {data: sessionData} = await supabaseClient.auth.getSession();
  if (sessionData.session) {
    const {data, error} = await supabaseClient.auth.updateUser({password: $('#rsPass').value});
    if (error) return authMsg(error.message);
    if (data.user) await startSession(data.user);
    $('#auth').hidden = true; $('#app').hidden = false;
    toast('Password updated.');
    return;
  }
  const {error} = await supabaseClient.auth.resetPasswordForEmail($('#rsEmail').value.trim().toLowerCase(), {
    redirectTo: window.location.origin
  });
  if (error) return authMsg(authErrorMessage(error, 'reset'));
  authMsg('Password reset instructions were sent if this email has an account.', true);
};
$('#socBtns').onclick = async e => {
  const button = e.target.closest('[data-soc]');
  if (!button) return;
  const provider = button.dataset.soc.toLowerCase();
  const {error} = await supabaseClient.auth.signInWithOAuth({provider, options: {redirectTo: window.location.origin}});
  if (error) authMsg(error.message);
};
supabaseClient.auth.onAuthStateChange((event, currentSession) => {
  window.setTimeout(() => {
    if (event === 'PASSWORD_RECOVERY') {
      $('#rsEmail').value = currentSession?.user?.email || '';
      showAuth('reset');
      $('#auth').hidden = false;
    } else if (event === 'SIGNED_OUT' && authUser) startGuest();
  }, 0);
});

/* ---------- PROFILE ---------- */
function renderHeader() { $('#hello').textContent = 'Hi, ' + me.name.split(' ')[0]; setAv($('#avHead'), me.name, me.profile.photo); }
$('#profileBtn').onclick = () => {
  pfPhoto = me.profile.photo; $('#pfName').value = me.name; $('#pfEmail').value = session; $('#pfPhone').value = me.profile.phone;
  $('#pfAddr').value = me.profile.addr; $('#pfBio').value = me.profile.bio; setAv($('#pfAv'), me.name, pfPhoto); openModal('profileModal');
};
$('#pfPhoto').onchange = e => {
  const f = e.target.files[0]; if (!f) return;
  if (!f.type.startsWith('image/')) return toast('Choose an image file.');
  if (f.size > 10 * 1024 * 1024) return toast('Choose an image smaller than 10 MB.');
  const fr = new FileReader();
  fr.onload = () => { const im = new Image(); im.onload = () => {
    const c = document.createElement('canvas'), s = 180; c.width = c.height = s; const m = Math.min(im.width, im.height);
    c.getContext('2d').drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, s, s);
    pfPhoto = c.toDataURL('image/jpeg', .85); setAv($('#pfAv'), $('#pfName').value, pfPhoto); }; im.src = fr.result; };
  fr.readAsDataURL(f);
};
$('#pfRemove').onclick = () => { pfPhoto = ''; $('#pfPhoto').value = ''; setAv($('#pfAv'), $('#pfName').value, ''); };
$('#profileForm').onsubmit = e => {
  e.preventDefault();
  (async () => {
    me.name = $('#pfName').value.trim() || me.name;
    if (pfPhoto && pfPhoto.startsWith('data:')) {
      const blob = await (await fetch(pfPhoto)).blob();
      const path = `${authUser.id}/${crypto.randomUUID()}.jpg`;
      const {data, error} = await supabaseClient.storage.from('matcha-profile-photos').upload(path, blob, {contentType: 'image/jpeg'});
      if (error) return toast(error.message);
      pfPhoto = supabaseClient.storage.from('matcha-profile-photos').getPublicUrl(data.path).data.publicUrl;
    }
    Object.assign(me.profile, {photo: pfPhoto || '', phone: $('#pfPhone').value.trim(), addr: $('#pfAddr').value.trim(), bio: $('#pfBio').value.trim()});
    if (!await save()) return;
    renderHeader(); closeModal('profileModal'); if (isAdmin) renderAdmin(); toast('Profile updated');
  })().catch(showDatabaseError);
};

/* ---------- NAVIGATION ---------- */
function renderAccountNavigation() {
  $$('[data-customer-nav]').forEach(button => { button.hidden = isAdmin; });
  $('#adminNav').hidden = !isAdmin;
}
const backgroundMusic = $('#backgroundMusic');
const musicToggle = $('#musicToggle');
const scrollProgress = $('#scrollProgress');
const backToTop = $('#backToTop');
backgroundMusic.volume = 0.35;
function updateScrollUI() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(100, Math.round(window.scrollY / maxScroll * 100)) : 0;
  scrollProgress.setAttribute('aria-valuenow', String(progress));
  scrollProgress.firstElementChild.style.width = `${progress}%`;
  backToTop.hidden = window.scrollY < 320;
}
window.addEventListener('scroll', updateScrollUI, {passive: true});
window.addEventListener('resize', updateScrollUI);
backToTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
updateScrollUI();
function syncMusicToggle() {
  const isPlaying = !backgroundMusic.paused;
  const isMuted = backgroundMusic.muted || backgroundMusic.paused;
  musicToggle.setAttribute('aria-pressed', String(isPlaying && !isMuted));
  musicToggle.setAttribute('aria-label', isMuted ? 'Unmute background music' : 'Mute background music');
  musicToggle.title = musicToggle.getAttribute('aria-label');
  $('[data-music-sound]').hidden = isMuted;
  $('[data-music-muted]').hidden = !isMuted;
}
backgroundMusic.addEventListener('play', syncMusicToggle);
backgroundMusic.addEventListener('pause', syncMusicToggle);
backgroundMusic.addEventListener('volumechange', syncMusicToggle);
backgroundMusic.muted = true;
backgroundMusic.play().catch(error => {
  syncMusicToggle();
  console.error('Background music autoplay failed:', error);
});
musicToggle.addEventListener('click', async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      backgroundMusic.muted = false;
    } catch (error) {
      syncMusicToggle();
      toast('Background music could not play. Check that the audio file is available and try again.');
      console.error('Background music playback failed:', error);
    }
  } else {
    backgroundMusic.muted = !backgroundMusic.muted;
  }
  syncMusicToggle();
});
function go(page) {
  if (isAdmin && ['checkout', 'mypurchase', 'cart', 'message', 'support'].includes(page)) return go('admin');
  if (['checkout', 'mypurchase', 'cart', 'message'].includes(page) && !requireLogin(page)) return;
  if (page === 'admin' && !isAdmin) return go('home');
  $$('[data-page]').forEach(s => s.hidden = s.dataset.page !== page);
  $$('#nav button').forEach(b => b.classList.toggle('active', b.dataset.go === page));
  ({products: renderProducts, reviews: renderReviews, checkout: renderCheckout, mypurchase: renderOrders, cart: renderCart, message: renderChat, support: renderFaq, admin: renderAdmin})[page]?.();
  window.scrollTo(0, 0);
}
document.addEventListener('click', e => { const t = e.target.closest('[data-go]'); if (t) go(t.dataset.go); });

/* ---------- HOME ---------- */
$('#voucherCards').innerHTML = [...VOUCHERS, ...DISCOUNTS].map(v =>
  `<div class="vcard"><b>${v.label}</b><small>${v.min ? 'Min. spend ' + peso(v.min) : 'No minimum spend'}</small><br>Code: <code>${v.code}</code></div>`).join('');
$$('.flip').forEach(f => f.onclick = () => f.classList.toggle('on'));
$('#deliveryOptionsToggle').onclick = () => {
  const options = $('#deliveryOptions');
  const isExpanded = $('#deliveryOptionsToggle').getAttribute('aria-expanded') === 'true';
  $('#deliveryOptionsToggle').setAttribute('aria-expanded', String(!isExpanded));
  options.hidden = isExpanded;
};
$('#deliveryOptions').onclick = e => {
  const zoneButton = e.target.closest('[data-delivery-zone]');
  if (zoneButton) {
    const zone = zoneButton.dataset.deliveryZone;
    const isDavao = zone === 'davao';
    const categories = isDavao ? ['Drinks', 'Sweets', 'Powder', 'Merchandise'] : ['Powder', 'Merchandise'];
    $$('#deliveryOptions [data-delivery-zone]').forEach(button => {
      button.setAttribute('aria-pressed', String(button === zoneButton));
    });
    $('#deliveryAvailability').innerHTML = `
      <p>${isDavao
        ? 'Davao City delivery: drinks and sweets arrive in minutes; powder and merchandise take 2–4 days.'
        : 'Outside Davao City: only powder and merchandise are available for delivery (2–4 days). Drinks and sweets are not available for delivery to this area.'}</p>
      <div class="delivery-categories" aria-label="Shop available product categories">
        ${categories.map(category => `<button type="button" class="delivery-category" data-delivery-category="${category}">Shop ${category}</button>`).join('')}
      </div>`;
    return;
  }
  const categoryButton = e.target.closest('[data-delivery-category]');
  if (!categoryButton) return;
  cat = categoryButton.dataset.deliveryCategory;
  $$('#chips .chip').forEach(button => button.classList.toggle('active', button.dataset.cat === cat));
  go('products');
};

/* ---------- PRODUCTS ---------- */
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
function renderProducts() {
  const q = $('#search').value.toLowerCase(), s = $('#sort').value;
  const wishlist = me ? me.wish : [];
  let list = PRODUCTS.filter(p => (cat === 'all' || (cat === 'Wishlist' ? wishlist.includes(p.id) : p.cat === cat)) && (p.name + p.desc).toLowerCase().includes(q));
  if (s === 'asc') list.sort((a, b) => a.price - b.price); if (s === 'desc') list.sort((a, b) => b.price - a.price); if (s === 'rate') list.sort((a, b) => b.rate - a.rate);
  $('#productGrid').innerHTML = list.map(p => `<div class="prod">
    ${isAdmin ? '' : `<button class="heart ${wishlist.includes(p.id) ? 'on' : ''}" data-wish="${p.id}" title="Wishlist">♥</button>`}
    <div class="zoom" data-view="${p.id}">${phImg(p.img, 'PRODUCT PHOTO')}</div>
    <div class="prod-b"><span class="tag">${p.cat}</span><b>${p.name}</b><small class="muted">${p.desc}</small>
    <span class="star">${stars(p.rate)} <small>${p.rate}</small></span><span class="price">${peso(p.price)}</span>
    <small class="muted">${Math.max(0, Number(stock[p.id]) || 0)} available</small>
    ${isAdmin ? '' : `<button class="btn" data-add="${p.id}" ${Number(stock[p.id]) < 1 ? 'disabled' : ''}>${Number(stock[p.id]) < 1 ? 'Out of stock' : 'Add to Cart'}</button>`}</div></div>`).join('') || '<p class="empty">No products found.</p>';
}
$('#search').oninput = $('#sort').onchange = renderProducts;
$('#chips').onclick = e => { const c = e.target.closest('.chip'); if (!c) return; cat = c.dataset.cat; $$('#chips .chip').forEach(x => x.classList.toggle('active', x === c)); renderProducts(); };
document.addEventListener('click', e => {
  const a = e.target.closest('[data-add]'), w = e.target.closest('[data-wish]');
  if (a) {
    if (isAdmin) return;
    if (!requireLogin('products')) return;
    const id = +a.dataset.add, it = me.cart.find(i => i.id === id);
    if ((Number(stock[id]) || 0) < (it ? it.qty + 1 : 1)) return toast('Sorry, this item is out of stock.');
    it ? it.qty++ : me.cart.push({id, qty: 1}); save(); updateCount();
    toast('Added to cart: ' + P(id).name); if (!$('[data-page=cart]').hidden) renderCart();
  }
  if (w) { if (isAdmin || !requireLogin('products')) return; const id = +w.dataset.wish, i = me.wish.indexOf(id); i < 0 ? me.wish.push(id) : me.wish.splice(i, 1); save(); renderProducts(); }
});

/* ---------- CART ---------- */
function updateCount() { const c = $('#cartCount'); c.textContent = me.cart.reduce((n, i) => n + i.qty, 0); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
const subtotal = () => me.cart.reduce((n, i) => n + P(i.id).price * i.qty, 0);
function renderCart() {
  if (!me.cart.length) return $('#cartBox').innerHTML = `<div class="card empty">${ICON_BAG}<b>Your cart is empty</b><p>Add some matcha to get started.</p><button class="btn" data-go="products">Start Shopping</button></div>`;
  const sub = subtotal(), offers = [...VOUCHERS, ...DISCOUNTS].filter(v => v.min > sub).sort((a, b) => a.min - b.min), nx = offers[0];
  const prog = nx ? `Add <b>${peso(nx.min - sub)}</b> more to unlock <b>${nx.code}</b> (${nx.label}).<i style="--w:${Math.min(100, sub / nx.min * 100)}%"></i>` : `You qualify for every voucher and discount. Choose one at checkout!<i style="--w:100%"></i>`;
  const sugg = PRODUCTS.filter(p => !me.cart.some(i => i.id === p.id) && Number(stock[p.id]) > 0).sort((a, b) => b.rate - a.rate).slice(0, 4);
  $('#cartBox').innerHTML = `<div class="cart-layout"><div>
    <div class="cart-top"><span>${me.cart.reduce((n, i) => n + i.qty, 0)} item(s) in your cart</span><button data-clear>Clear cart</button></div>
    ${me.cart.map(i => { const p = P(i.id); return `<div class="cart-row">${phImg(p.img, 'PHOTO')}
      <div class="cart-info"><span class="tag">${p.cat}</span><b>${p.name}</b><span class="muted">${peso(p.price)} each</span>
      <div class="links"><button data-sv="${i.id}">Save for later</button><button class="rm" data-rm="${i.id}">Remove</button></div></div>
      <div class="cart-end"><div class="qty"><button data-q="${i.id}" data-d="-1">-</button><b>${i.qty}</b><button data-q="${i.id}" data-d="1">+</button></div><b class="price">${peso(p.price * i.qty)}</b></div></div>`; }).join('')}</div>
    <aside class="card cart-sum"><h4>Order Summary</h4><div class="prog">${prog}</div>
      <div class="row"><span>Subtotal</span><span>${peso(sub)}</span></div><div class="row"><span>Shipping</span><span>Calculated at checkout</span></div>
      <div class="row total"><span>Estimated Total</span><span>${peso(sub)}</span></div>
      <button class="btn big" data-go="checkout">Proceed to Purchase</button></aside></div>
    <h4 class="sec-h">You may also like</h4><div class="mini">${sugg.map(p => `<div><b>${p.name}</b><span class="price">${peso(p.price)}</span><button class="btn small" data-add="${p.id}">Add to Cart</button></div>`).join('')}</div>`;
}
$('#cartBox').onclick = e => {
  const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]'), s = e.target.closest('[data-sv]'), c = e.target.closest('[data-clear]');
  if (q) {
    const it = me.cart.find(i => i.id == q.dataset.q);
    if (+q.dataset.d > 0 && it.qty >= Number(stock[it.id])) return toast('Available stock limit reached.');
    it.qty += +q.dataset.d; if (it.qty < 1) me.cart = me.cart.filter(i => i !== it);
  }
  if (r) me.cart = me.cart.filter(i => i.id != r.dataset.rm);
  if (s) { const id = +s.dataset.sv; if (!me.wish.includes(id)) me.wish.push(id); me.cart = me.cart.filter(i => i.id !== id); toast('Saved to your wishlist'); }
  if (c && confirm('Remove all items from your cart?')) me.cart = [];
  if (q || r || s || c) { save(); updateCount(); renderCart(); }
};

/* ---------- CHECKOUT (PURCHASE) ---------- */
const val = n => document.querySelector(`input[name=${n}]:checked`).value;
function deliveryDetails() {
  const isDavao = /\bdavao\s+city\b/i.test($('#coAddr').value);
  const hasFreshItems = me.cart.some(i => ['Drinks', 'Sweets'].includes(P(i.id).cat));
  const pickup = val('fulfillment') === 'pickup';
  const fee = pickup ? 0 : (isDavao && hasFreshItems ? SHIP.exp : SHIP.std);
  let estimate = hasFreshItems && isDavao ? 'Drinks and sweets: minutes' : '';
  if (me.cart.some(i => ['Powder', 'Merchandise'].includes(P(i.id).cat))) {
    estimate += (estimate ? '; ' : '') + 'Powder and merchandise: 2–4 days';
  }
  return {
    isDavao, hasFreshItems, pickup, fee,
    label: pickup ? 'Pick Up' : (isDavao && hasFreshItems ? 'Davao City delivery' : 'Delivery'),
    estimate: pickup ? 'Pickup selected' : (estimate || 'Powder and merchandise: 2–4 days')
  };
}
function calc() {
  const sub = subtotal(); let ship = me.cart.length ? deliveryDetails().fee : 0, disc = 0, msg = '', code = null;
  const mode = val('promo');
  if (mode !== 'none') {
    const v = (mode === 'voucher' ? VOUCHERS : DISCOUNTS).find(x => x.code === $('#promoSel').value);
    if (v) {
      if (sub < v.min) msg = `Spend at least ${peso(v.min)} to use ${v.code}.`;
      else { code = v.code; if (v.type === 'amt') disc = v.val; if (v.type === 'pct') disc = sub * v.val / 100; if (v.type === 'ship') disc = ship; msg = `${v.code} applied!`; }
    }
  }
  disc = Math.min(disc, sub + ship);
  return {sub, ship, disc, code, msg, total: sub + ship - disc};
}
function checkoutPayment() {
  const choice = val('payment_method');
  if (choice === 'E-wallet') {
    const method = document.querySelector('input[name="wallet_provider"]:checked').value;
    return {method, demo: 'wallet', bankName: ''};
  }
  if (choice === 'Online Banking') {
    const bank = $('#bankProvider').value;
    return {method: 'Online Banking', demo: 'bank', bankName: bank};
  }
  return {method: choice, demo: '', bankName: ''};
}
function renderCheckout() {
  const empty = !me.cart.length; $('#coEmpty').hidden = !empty; $('#coWrap').hidden = empty; if (empty) return;
  const delivery = deliveryDetails();
  const deliveryArea = $('#coDeliveryArea').value;
  $('#coDeliveryAreaField').hidden = delivery.pickup;
  $('#coDeliveryArea').required = !delivery.pickup;
  $('#coAreaHint').textContent = deliveryArea === 'davao'
    ? 'Drinks, sweets, powder and merchandise. Delivery in minutes.'
    : 'Powder and merchandise only. Delivery in 2–4 days.';
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value;
  const cashDelivery = $('#paymentOptions [data-payment-fulfillment="delivery"]');
  const cashPickup = $('#paymentOptions [data-payment-fulfillment="pickup"]');
  cashDelivery.hidden = delivery.pickup;
  cashPickup.hidden = !delivery.pickup;
  if ((delivery.pickup && paymentMethod === 'Cash on Delivery') || (!delivery.pickup && paymentMethod === 'Cash on Pickup')) {
    (delivery.pickup ? cashPickup : cashDelivery).querySelector('input').checked = true;
  }
  const selectedPayment = val('payment_method');
  const payment = checkoutPayment();
  $('#walletOptions').hidden = selectedPayment !== 'E-wallet';
  $('#bankOptions').hidden = selectedPayment !== 'Online Banking';
  $('#demoPaymentFields').hidden = !payment.demo;
  const isWallet = payment.demo === 'wallet';
  const isBank = payment.demo === 'bank';
  $('#walletDemoFields').hidden = !isWallet;
  $('#bankDemoFields').hidden = !isBank;
  $('#walletDemoName').required = isWallet;
  $('#walletDemoAccount').required = isWallet;
  $('#bankDemoName').required = isBank;
  $('#bankDemoAccount').required = isBank;
  const walletProvider = isWallet ? payment.method : '';
  const requiresMpin = isWallet && walletProvider !== 'PayPal';
  $('#walletAccountLabel').textContent = walletProvider === 'PayPal'
    ? 'PayPal email address'
    : `${walletProvider} mobile number (09XXXXXXXXX)`;
  $('#walletDemoAccount').placeholder = walletProvider === 'PayPal' ? 'demo@example.com' : '09XXXXXXXXX';
  $('#walletMpinField').hidden = !requiresMpin;
  $('#walletDemoMpin').required = requiresMpin;
  if (!requiresMpin) $('#walletDemoMpin').value = '';
  if (!isWallet) {
    $('#walletDemoName').value = '';
    $('#walletDemoAccount').value = '';
  }
  if (!isBank) {
    $('#bankDemoName').value = '';
    $('#bankDemoAccount').value = '';
    $('#bankDemoExpiry').value = '';
    $('#bankDemoCvv').value = '';
  }
  $('#bankDemoExpiry').required = isBank;
  $('#bankDemoCvv').required = isBank;
  $('#demoPaymentDescription').textContent = payment.demo
    ? `${payment.method}${payment.bankName ? ` (${payment.bankName})` : ''} selected. This project will simulate the payment result.`
    : '';
  $('#coForm button[type="submit"], #coForm button:not([type])').textContent = payment.demo ? 'Simulate Payment & Place Order' : 'Place Order';
  $('#deliveryFee').textContent = delivery.pickup ? 'Free' : peso(delivery.fee);
  $('#deliveryHint').textContent = delivery.isDavao
    ? 'Davao City orders: drinks and sweets arrive in minutes; powder and merchandise deliver in 2–4 days.'
    : 'Outside Davao City, only powder and merchandise can be ordered; delivery takes 2–4 days.';
  $('#deliveryHint').classList.toggle('err', !delivery.isDavao && delivery.hasFreshItems);
  const mode = val('promo'), list = mode === 'voucher' ? VOUCHERS : DISCOUNTS;
  if ($('#promoSel').dataset.mode !== mode) {
    $('#promoSel').dataset.mode = mode; $('#promoSel').hidden = mode === 'none';
    $('#promoSel').innerHTML = mode === 'none' ? '' : list.map(v => `<option value="${v.code}">${v.code} - ${v.label}${v.min ? ' (min ' + peso(v.min) + ')' : ''}</option>`).join('');
  }
  const c = calc();
  $('#coItems').innerHTML = me.cart.map(i => `<div class="item"><span>${i.qty} x ${P(i.id).name}</span><span>${peso(P(i.id).price * i.qty)}</span></div>`).join('');
  $('#sSub').textContent = peso(c.sub); $('#sShip').textContent = peso(c.ship);
  $('#sDisc').textContent = c.disc ? '-' + peso(c.disc) : peso(0); $('#sTotal').textContent = peso(c.total); $('#promoMsg').textContent = c.msg;
  syncSteps();
}
function syncSteps() {
  const detailsComplete = $('#coName').value.trim() && $('#coAddr').value.trim() && $('#coEmail').value.trim() && $('#coPhone').value.trim();
  $('#st2').classList.toggle('done', !!detailsComplete);
  $('#st3').classList.toggle('done', !!detailsComplete);
  $('#st4').classList.toggle('done', !!detailsComplete);
}
$('#coForm').addEventListener('change', renderCheckout); $('#coForm').addEventListener('input', () => { renderCheckout(); syncSteps(); });
$('#useProfile').onclick = () => {
  $('#coName').value = me.name; $('#coEmail').value = session; $('#coPhone').value = me.profile.phone; $('#coAddr').value = me.profile.addr;
  syncSteps(); toast(me.profile.phone || me.profile.addr ? 'Profile details filled in' : 'Add your phone and address in My Profile first');
};
$('#coForm').onsubmit = async e => {
  e.preventDefault(); const err = $('#coErr'); err.textContent = '';
  const delivery = deliveryDetails();
  if (!delivery.isDavao && delivery.hasFreshItems) return err.textContent = 'Drinks and sweets are only available for Davao City customers. Remove those items to continue.';
  if (!delivery.pickup && (($('#coDeliveryArea').value === 'davao') !== delivery.isDavao)) {
    return err.textContent = 'Choose a delivery area that matches the city in your complete address.';
  }
  if (!/^09\d{9}$/.test($('#coPhone').value.trim())) return err.textContent = 'Enter a valid 11-digit contact number starting with 09.';
  const payment = checkoutPayment();
  if (payment.demo === 'wallet') {
    const account = $('#walletDemoAccount').value.trim();
    const validAccount = payment.method === 'PayPal' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account) : /^09\d{9}$/.test(account);
    const validMpin = payment.method === 'PayPal' || /^\d{4}$/.test($('#walletDemoMpin').value);
    if (!$('#walletDemoName').value.trim() || !validAccount || !validMpin) {
      return err.textContent = `Enter fictional ${payment.method} test details to continue the demo.`;
    }
  }
  if (payment.demo === 'bank') {
    const expiry = $('#bankDemoExpiry').value.trim();
    if (!$('#bankDemoName').value.trim() || !/^\d{10,16}$/.test($('#bankDemoAccount').value.trim()) ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) || !/^\d{3,4}$/.test($('#bankDemoCvv').value.trim())) {
      return err.textContent = 'Enter fictional test values: account name, 10–16 digit number, MM/YY expiry, and 3–4 digit CVV.';
    }
  }
  const orderNote = [
    $('#coNote').value.trim(),
    payment.demo ? `Demo payment simulated: ${payment.method}${payment.bankName ? ` - ${payment.bankName}` : ''}. No real payment was processed.` : ''
  ].filter(Boolean).join('\n');
  const totals = calc();
  const button = $('#coForm').querySelector('button[type="submit"], button:not([type])');
  button.disabled = true;
  const {data: orderId, error} = await supabaseClient.rpc('place_matcha_order', {
    p_customer_name: $('#coName').value.trim(),
    p_phone: $('#coPhone').value.trim(),
    p_address: $('#coAddr').value.trim(),
    p_note: orderNote,
    p_fulfillment: delivery.pickup ? 'Pick Up' : 'Delivery',
    p_payment_method: payment.method,
    p_promo_code: totals.code,
    p_promo_mode: val('promo'),
    p_items: me.cart.map(item => ({product_id: item.id, quantity: item.qty}))
  });
  if (error) {
    err.textContent = error.message;
    button.disabled = false;
    return;
  }
  me.cart = [];
  updateCount();
  const {data: order, error: orderError} = await supabaseClient.from('orders').select('*,order_items(*)').eq('id', orderId).single();
  if (orderError) {
    err.textContent = 'Your order was placed, but its confirmation could not be loaded. Check My Purchase before trying again.';
    button.disabled = false;
    orderTab = 'To Ship';
    go('mypurchase');
    return;
  }
  me.orders.unshift(mapDatabaseOrder(order));
  try { await loadStock(); } catch (loadError) { showDatabaseError(loadError); }
  updateCount();
  $('#coNote').value = '';
  $('#walletDemoName').value = ''; $('#walletDemoAccount').value = '';
  $('#walletDemoMpin').value = '';
  $('#bankDemoName').value = ''; $('#bankDemoAccount').value = '';
  $('#bankDemoExpiry').value = ''; $('#bankDemoCvv').value = '';
  toast(payment.demo ? 'Demo payment simulated. No money was transferred.' : 'Order placed!');
  orderTab = 'To Ship';
  go('mypurchase');
};

/* ---------- MY PURCHASE ---------- */
const TABS = ['To Ship', 'Preparing', 'Packaging', 'Ready for Pickup', 'Out for Delivery', 'To Receive', 'Completed', 'Return/Refund', 'Cancelled', 'To Rate'], FLOW = ['To Ship', 'Preparing', 'Packaging', 'Ready for Pickup', 'Out for Delivery', 'To Receive', 'Completed'];
const ordersOf = t => me.orders.filter(o => t === 'To Rate' ? o.status === 'Completed' && !o.rated : o.status === t);
async function renderOrders() {
  const {data, error} = await supabaseClient.from('orders').select('*,order_items(*)')
    .eq('customer_id', authUser.id).order('created_at', {ascending: false});
  if (error) return showDatabaseError(error);
  me.orders = data.map(mapDatabaseOrder);
  const act = me.orders.filter(o => ['To Ship', 'Preparing', 'Packaging', 'Ready for Pickup', 'Out for Delivery', 'To Receive'].includes(o.status)).length, spent = me.orders.filter(o => !['Cancelled', 'Return/Refund'].includes(o.status)).reduce((n, o) => n + o.total, 0);
  $('#orderStats').innerHTML = `<div class="stat"><small>Total orders</small><b>${me.orders.length}</b></div><div class="stat"><small>In progress</small><b>${act}</b></div><div class="stat"><small>Total spent</small><b>${peso(spent)}</b></div>`;
  $('#orderTabs').innerHTML = TABS.map(t => { const n = ordersOf(t).length; return `<button class="tab ${t === orderTab ? 'active' : ''}" data-tab="${t}">${t}${n ? ' (' + n + ')' : ''}</button>`; }).join('');
  const q = $('#orderSearch').value.trim().toLowerCase();
  const list = ordersOf(orderTab).filter(o => !q || o.id.toLowerCase().includes(q) || o.items.some(i => P(i.id).name.toLowerCase().includes(q)));
  $('#orderList').innerHTML = list.map(o => `<div class="card order"><div class="order-h"><b>Order #${o.id}</b><span class="muted">${o.date}</span><span class="status st-${o.status.replace(/\W+/g, '')}">${o.status}</span></div>
    ${FLOW.includes(o.status) ? `<div class="track">${(o.fulfillment === 'Pick Up' ? FLOW.filter(s => s !== 'Out for Delivery') : FLOW.filter(s => s !== 'Ready for Pickup')).map((s, i, steps) => `<span class="${i <= steps.indexOf(o.status) ? 'on' : ''}">${s}</span>`).join('')}</div>` : ''}
    ${o.items.map(i => `<div class="oi">${phImg(P(i.id).img, 'IMG')}<div><b>${P(i.id).name}</b><br><small>Qty ${i.qty} x ${peso(i.price)}</small></div><b>${peso(i.price * i.qty)}</b></div>`).join('')}
    <div class="row"><span>Payment: ${o.method}${o.code ? ' | Promo: ' + o.code : ''}${o.delivery ? ' | ' + o.delivery : ''}${o.fulfillment ? ' | ' + o.fulfillment : ''}</span><b>Total ${peso(o.total)}</b></div>
    <small class="muted">${o.fulfillment === 'Pick Up' ? 'Pickup order' : 'Ship to'}: ${escapeHtml(o.name)}, ${escapeHtml(o.addr)} | ${escapeHtml(o.phone)}${o.note ? ' | Note: ' + escapeHtml(o.note) : ''}</small><div class="actions">${actions(o)}</div></div>`).join('')
    || `<div class="card empty">${ICON_BAG}<b>${q ? 'No matching orders' : 'No orders under "' + orderTab + '" yet'}</b><p>${q ? 'Try a different order number or product.' : 'Your orders will show up here.'}</p><button class="btn" data-go="products">Shop Matcha</button></div>`;
}
$('#orderSearch').oninput = renderOrders;
function actions(o) {
  const b = (a, l, c = '') => `<button class="btn small ${c}" data-act="${a}" data-id="${o.id}">${l}</button>`;
  return ({'To Ship': b('cancel', 'Cancel Order', 'danger'),
    'To Receive': b('receive', 'Order Received'),
    'Completed': (o.rated ? '' : b('rate', 'Rate', 'pink')) + b('again', 'Buy Again', 'ghost') + b('ret', 'Request Return/Refund', 'ghost'),
    'Return/Refund': `<span class="muted">${o.refundDecision ? 'Refund request ' + o.refundDecision.toLowerCase() + ' by the seller.' : 'Return requested. Waiting for the seller to review it.'}</span>`,
    'Cancelled': b('again', 'Buy Again', 'ghost')})[o.status] || '';
}
$('#orderTabs').onclick = e => { const t = e.target.closest('[data-tab]'); if (t) { orderTab = t.dataset.tab; renderOrders(); } };
$('#orderList').onclick = async e => {
  const b = e.target.closest('[data-act]'); if (!b) return; const o = me.orders.find(x => x.id === b.dataset.id), a = b.dataset.act;
  if (a === 'cancel') {
    if (!confirm('Cancel this order?')) return;
    const {error} = await supabaseClient.rpc('customer_matcha_order_action', {p_order_id: o.dbId, p_action: 'cancel'});
    if (error) return toast(error.message);
    orderTab = 'Cancelled';
  }
  if (a === 'receive') {
    const {error} = await supabaseClient.rpc('customer_matcha_order_action', {p_order_id: o.dbId, p_action: 'received'});
    if (error) return toast(error.message);
    orderTab = 'Completed'; toast('Order completed. Please rate your items!');
  }
  if (a === 'ret') {
    const reason = prompt('Reason for return/refund?'); if (!reason) return;
    const {error} = await supabaseClient.rpc('customer_matcha_order_action', {p_order_id: o.dbId, p_action: 'refund', p_reason: reason});
    if (error) return toast(error.message);
    orderTab = 'Return/Refund';
  }
  if (a === 'again') { o.items.forEach(i => { const c = me.cart.find(x => x.id === i.id); c ? c.qty += i.qty : me.cart.push({id: i.id, qty: i.qty}); }); updateCount(); save(); return go('cart'); }
  if (a === 'rate') { rateOrder = o; return go('reviews'); }
  await renderOrders();
};

/* ---------- REVIEWS ---------- */
const allReviews = () => [...userReviews, ...SEED_REVIEWS];
async function renderReviews() {
  const [reviewsResult, countsResult] = await Promise.all([
    supabaseClient.from('reviews').select('*').order('created_at', {ascending: false}),
    supabaseClient.rpc('matcha_review_vote_counts')
  ]);
  if (reviewsResult.error) return showDatabaseError(reviewsResult.error);
  if (countsResult.error) return showDatabaseError(countsResult.error);
  userReviews = reviewsResult.data.map(review => ({
    id: review.id, name: review.customer_name || 'Customer', pid: review.product_id,
    stars: review.stars, text: review.review_text, img: review.photo_url,
    date: new Date(review.created_at).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}),
    help: Number((countsResult.data || []).find(vote => vote.review_id === review.id)?.vote_count || 0)
  }));
  reviewVoteCounts = Object.fromEntries(userReviews.map(review => [review.id, review.help]));
  const opts = rateOrder ? rateOrder.items.map(i => P(i.id)).filter(Boolean) : PRODUCTS, all = allReviews();
  $('#reviewLoginNote').hidden = !!me;
  const canReview = !!me && !!rateOrder;
  $('#reviewForm').querySelectorAll('select, textarea, input, button[type="submit"]').forEach(el => { el.disabled = !canReview; });
  $('#reviewForm > button').disabled = !canReview;
  $('#rvProduct').innerHTML = opts.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  $('#rateNote').textContent = !me
    ? 'Sign in and rate an item from a completed order.'
    : rateOrder
      ? `Rating order #${rateOrder.id}. Choose an item from this order.`
      : 'To keep feedback matched to real purchases, open a completed order in My Purchase and choose Rate.';
  $('#stars').innerHTML = [1, 2, 3, 4, 5].map(n => `<button type="button" class="${n <= rating ? 'on' : ''}" data-s="${n}" ${me ? '' : 'disabled'}>★</button>`).join('');
  const avg = all.reduce((n, r) => n + r.stars, 0) / all.length;
  $('#rSummary').innerHTML = `<div><span class="big">${avg.toFixed(1)}</span><span class="star">${stars(avg)}</span><small class="muted">${all.length} reviews</small></div>
    <div class="bars">${[5, 4, 3, 2, 1].map(n => { const c = all.filter(r => r.stars === n).length; return `<div><span>${n}★</span><i style="--w:${c / all.length * 100}%"></i><span>${c}</span></div>`; }).join('')}</div>`;
  const list = all.filter(r => rf === 'all' || (rf === 'photo' ? r.img : rf === '3' ? r.stars <= 3 : r.stars === +rf));
  $('#reviewList').innerHTML = list.map(r => { const n = r.id.startsWith('s') ? r.help || 0 : reviewVoteCounts[r.id] || 0, on = me ? me.voted.includes(r.id) : false, p = P(r.pid);
    return `<div class="card rv"><span class="rv-av">${escapeHtml(initial(r.name))}</span><div class="rv-main"><div class="rv-top"><b>${escapeHtml(r.name)}</b><small>${escapeHtml(r.date)}</small></div>
    <span class="star">${stars(r.stars)}</span><p><span class="tag">${p ? p.name : 'Product'}</span></p><p>${escapeHtml(r.text)}</p>
    ${r.id.startsWith('s') ? `<span class="helpful">Helpful (${n})</span>` : `<button class="helpful ${on ? 'on' : ''}" data-help="${r.id}">Helpful (${n})</button>`}</div>${r.img ? phImg(r.img, 'PHOTO') : ''}</div>`; }).join('') || '<div class="card empty">No reviews match this filter yet.</div>';
}
$('#rFilter').onclick = e => { const c = e.target.closest('[data-rf]'); if (!c) return; rf = c.dataset.rf; $$('#rFilter .chip').forEach(x => x.classList.toggle('active', x === c)); renderReviews(); };
$('#reviewList').onclick = async e => {
  const h = e.target.closest('[data-help]'); if (!h) return; if (!requireLogin()) return; const id = h.dataset.help;
  const {data, error} = await supabaseClient.rpc('toggle_matcha_review_vote', {p_review_id: id});
  if (error) return toast(error.message);
  me.voted.includes(id) ? me.voted = me.voted.filter(x => x !== id) : me.voted.push(id);
  reviewVoteCounts[id] = data; await renderReviews();
};
$('#stars').onclick = e => { const s = e.target.closest('[data-s]'); if (s) { rating = +s.dataset.s; renderReviews(); } };
$('#reviewForm').onsubmit = async e => {
  e.preventDefault(); if (!requireLogin('reviews')) return;
  if (!rateOrder) return toast('Open a completed order in My Purchase and choose Rate first.');
  if (!rating) return toast('Please choose a star rating');
  const f = $('#rvPhoto').files[0];
  let photoUrl = '';
  if (f) {
    if (!f.type.startsWith('image/')) return toast('Choose an image file.');
    if (f.size > 5 * 1024 * 1024) return toast('Choose an image no larger than 5 MB.');
    const path = `${authUser.id}/${crypto.randomUUID()}.${f.name.split('.').pop().toLowerCase()}`;
    const {data, error} = await supabaseClient.storage.from('matcha-review-photos').upload(path, f, {upsert: false});
    if (error) return toast(error.message);
    photoUrl = supabaseClient.storage.from('matcha-review-photos').getPublicUrl(data.path).data.publicUrl;
  }
  const {error} = await supabaseClient.rpc('submit_matcha_review', {
    p_product_id: +$('#rvProduct').value,
    p_stars: rating,
    p_review_text: $('#rvText').value,
    p_photo_url: photoUrl,
    p_order_id: rateOrder?.dbId || null
  });
  if (error) return toast(error.message);
  rateOrder = null; rating = 0; e.target.reset(); toast('Thanks for your review!'); await renderReviews();
};

/* ---------- MESSAGE ---------- */
const clock = () => new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
async function renderChat() {
  const {data, error} = await supabaseClient.from('messages').select('*').eq('customer_id', authUser.id).order('created_at');
  if (error) return showDatabaseError(error);
  me.msgs = data.map(message => ({id: message.id, from: message.sender_role === 'customer' ? 'me' : 'them', t: message.message, time: new Date(message.created_at).toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'})}));
  const d = new Date(), open = d.getDay() !== 0 && d.getHours() >= 9 && d.getHours() < 18;
  $('#sellerStatus').textContent = open ? 'Online now' : 'Away. Replies when the store opens';
  $('#chatBody').innerHTML = (me.msgs.length ? '<span class="dsep">Today</span>' : '<p class="muted center">Send a message to the owner.</p>') + me.msgs.map(m => `<div class="msg ${m.from === 'me' ? 'me' : 'them'}">${escapeHtml(m.t)}<small>${escapeHtml(m.time || '')}</small></div>`).join('');
  $('#chatBody').scrollTop = 1e6;
}
async function send(t) {
  if (!t.trim()) return;
  const {error} = await supabaseClient.from('messages').insert({customer_id: authUser.id, sender_role: 'customer', message: t.trim()});
  if (error) return toast(error.message);
  await renderChat();
}
$('#chatForm').onsubmit = async e => { e.preventDefault(); await send($('#chatInput').value); $('#chatInput').value = ''; };
$('#quick').onclick = e => { if (e.target.tagName === 'BUTTON') send(e.target.textContent); };
$('#clearChat').onclick = async () => {
  if (!confirm('Clear this conversation?')) return;
  const {error} = await supabaseClient.from('messages').delete().eq('customer_id', authUser.id);
  if (error) return toast(error.message);
  await renderChat();
};
$('#shareOrder').onclick = () => { if (!me.orders.length) return toast('You have no orders to share yet'); $('#chatInput').value = 'Hi! I have a question about order #' + me.orders[0].id + '.'; $('#chatInput').focus(); };

/* ---------- OWNER ADMIN ---------- */
async function renderAdmin() {
  if (!isAdmin) return;
  const [ordersResult, stockResult, profilesResult] = await Promise.all([
    supabaseClient.from('orders').select('*,order_items(*)').order('created_at', {ascending: false}),
    supabaseClient.from('products').select('id,stock'),
    supabaseClient.from('profiles').select('id,email,full_name').neq('id', authUser.id)
  ]);
  for (const result of [ordersResult, stockResult, profilesResult]) if (result.error) return showDatabaseError(result.error);

  ownerCustomers = profilesResult.data;
  stock = Object.fromEntries(stockResult.data.map(product => [product.id, product.stock]));
  const customerById = Object.fromEntries(ownerCustomers.map(customer => [customer.id, customer]));
  const allOrders = ordersResult.data.map(order => ({
    email: order.customer_email,
    user: customerById[order.customer_id] || {full_name: order.customer_name},
    order: mapDatabaseOrder(order)
  }));
  const salesOrders = allOrders.filter(({order}) => !['Cancelled', 'Return/Refund'].includes(order.status));
  const salesTotal = salesOrders.reduce((sum, {order}) => sum + Number(order.total || 0), 0);
  const pending = allOrders.filter(({order}) => ['To Ship', 'Preparing', 'Packaging', 'Ready for Pickup', 'Out for Delivery', 'To Receive'].includes(order.status)).length;
  const refunds = allOrders.filter(({order}) => order.status === 'Return/Refund' && !order.refundDecision).length;
  const productSales = new Map();
  salesOrders.forEach(({order}) => order.items.forEach(item => {
    const product = P(item.id);
    if (!product) return;
    const current = productSales.get(item.id) || {name: product.name, quantity: 0, revenue: 0};
    current.quantity += Number(item.qty || 0);
    current.revenue += Number(item.price || product.price) * Number(item.qty || 0);
    productSales.set(item.id, current);
  }));
  const bestSellers = [...productSales.values()].sort((a, b) => b.revenue - a.revenue);
  $('#ownerName').textContent = me.name;
  $('#ownerEmail').textContent = session;
  setAv($('#ownerAvatar'), me.name, me.profile.photo);
  $('#ownerStats').innerHTML = `<div class="stat"><small>Order value (excluding cancelled/refunded)</small><b>${peso(salesTotal)}</b></div>
    <div class="stat"><small>Total orders</small><b>${allOrders.length}</b></div>
    <div class="stat"><small>Active orders</small><b>${pending}</b></div>
    <div class="stat"><small>Refunds to review</small><b>${refunds}</b></div>`;
  $('#ownerSales').innerHTML = bestSellers.length ? bestSellers.map(item => `<div class="sales-row"><span>${escapeHtml(item.name)} <small class="muted">(${item.quantity} sold)</small></span><b>${peso(item.revenue)}</b></div>`).join('') : '<p class="muted">Sales will appear here after customers place orders.</p>';
  $('#adminOrders').innerHTML = allOrders.length ? allOrders.map(({email, user, order}) => {
    const demoPayment = DEMO_PAYMENT_METHODS.includes(order.method);
    return `
    <div class="card order">
      <div class="order-h"><b>Order #${escapeHtml(order.id)} · ${escapeHtml(user.full_name)}</b><span>${escapeHtml(email)}</span><span class="status">${escapeHtml(order.status)}</span></div>
      <p class="muted">${order.items.map(i => `${escapeHtml(P(i.id).name)} × ${i.qty}`).join(', ')} | ${peso(order.total)}</p>
      <p class="muted">${escapeHtml(order.delivery || '')} ${escapeHtml(order.fulfillment || '')} | ${escapeHtml(order.addr || '')}</p>
      <p class="muted"><b>Payment:</b> ${escapeHtml(order.method)}${demoPayment ? ' — demo payment simulated; no money transferred' : ''}</p>
      ${order.note ? `<p class="muted">Order note: ${escapeHtml(order.note)}</p>` : ''}
      <div class="actions">
        <select data-admin-status="${escapeHtml(order.id)}">${['To Ship', 'Preparing', 'Packaging', 'Ready for Pickup', 'Out for Delivery', 'To Receive', 'Completed', 'Return/Refund', 'Cancelled'].map(s => `<option ${order.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select>
        <button class="btn small" data-admin-update="${escapeHtml(order.id)}" data-db-id="${order.dbId}">Update Order</button>
        ${order.status === 'Return/Refund' && !order.refundDecision ? `<button class="btn small" data-refund="Approved" data-db-id="${order.dbId}">Approve Refund</button><button class="btn small danger" data-refund="Declined" data-db-id="${order.dbId}">Decline Refund</button>` : ''}
        ${order.refundDecision ? `<span class="muted">Refund ${escapeHtml(order.refundDecision.toLowerCase())}</span>` : ''}
      </div>
    </div>`;
  }).join('') : '<div class="card empty">No orders yet.</div>';
  $('#adminStock').innerHTML = PRODUCTS.map(p => `<div class="stock-row"><b>${escapeHtml(p.name)}</b><input type="number" min="0" step="1" value="${Math.max(0, Number(stock[p.id]) || 0)}" data-stock="${p.id}" aria-label="Available stock for ${escapeHtml(p.name)}"><button class="btn small" data-stock-save="${p.id}">Save</button></div>`).join('');
  if (!ownerCustomers.some(customer => customer.id === adminCustomer)) adminCustomer = ownerCustomers[0]?.id || '';
  $('#adminCustomer').innerHTML = ownerCustomers.map(customer => `<option value="${customer.id}" ${customer.id === adminCustomer ? 'selected' : ''}>${escapeHtml(customer.full_name)} (${escapeHtml(customer.email)})</option>`).join('');
  $('#adminCustomer').disabled = !ownerCustomers.length;
  renderAdminChat();
}
$('#ownerEditProfile').onclick = () => $('#profileBtn').click();
async function renderAdminChat() {
  if (!adminCustomer) return $('#adminChatBody').innerHTML = '<p class="muted">No customer accounts yet.</p>';
  const {data, error} = await supabaseClient.from('messages').select('*').eq('customer_id', adminCustomer).order('created_at');
  if (error) return showDatabaseError(error);
  $('#adminChatBody').innerHTML = data.map(message => `<div class="msg ${message.sender_role === 'owner' ? 'me' : 'them'}">${escapeHtml(message.message)}<small>${new Date(message.created_at).toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'})}</small></div>`).join('') || '<p class="muted">No messages from this customer yet.</p>';
  $('#adminChatBody').scrollTop = 1e6;
}
$('#adminCustomer').onchange = e => { adminCustomer = e.target.value; renderAdminChat(); };
$('#adminChatForm').onsubmit = async e => {
  e.preventDefault();
  if (!isAdmin || !adminCustomer) return;
  const text = $('#adminChatInput').value.trim();
  if (!text) return;
  const {error} = await supabaseClient.from('messages').insert({customer_id: adminCustomer, sender_role: 'owner', message: text});
  if (error) return toast(error.message);
  $('#adminChatInput').value = '';
  renderAdminChat();
};
$('#adminStock').onclick = async e => {
  const button = e.target.closest('[data-stock-save]'); if (!button || !isAdmin) return;
  const input = $(`[data-stock="${button.dataset.stockSave}"]`), quantity = Number(input.value);
  if (!Number.isInteger(quantity) || quantity < 0) return toast('Enter a valid non-negative stock quantity.');
  const {error} = await supabaseClient.from('products').update({stock: quantity}).eq('id', button.dataset.stockSave);
  if (error) return toast(error.message);
  stock[button.dataset.stockSave] = quantity; renderAdmin();
  toast('Stock updated.');
};
$('#adminOrders').onclick = async e => {
  if (!isAdmin) return;
  const update = e.target.closest('[data-admin-update]');
  const refund = e.target.closest('[data-refund]');
  const orderId = update?.dataset.dbId || refund?.dataset.dbId;
  if (!orderId) return;
  let result;
  if (refund) {
    result = await supabaseClient.from('orders').update({refund_decision: refund.dataset.refund}).eq('id', orderId);
  } else {
    const statusControl = [...$('#adminOrders').querySelectorAll('[data-admin-status]')].find(el => el.dataset.adminStatus === update.dataset.adminUpdate);
    if (!statusControl) return;
    result = await supabaseClient.from('orders').update({status: statusControl.value}).eq('id', orderId);
  }
  if (result.error) return toast(result.error.message);
  await renderAdmin();
  toast(refund ? `Refund ${refund.dataset.refund.toLowerCase()}.` : 'Order updated.');
};

/* ---------- SUPPORT ---------- */
function renderFaq() { $('#faq').innerHTML = FAQ.map(f => `<div class="faq-i"><button>${f[0]}</button><p hidden>${f[1]}</p></div>`).join(''); }
$('#faq').onclick = e => { const b = e.target.closest('button'); if (b) b.nextElementSibling.hidden = !b.nextElementSibling.hidden; };
$('#csForm').onsubmit = async e => {
  e.preventDefault();
  if (!requireLogin('support')) return;
  const message = `Support: ${$('#csTopic').value}\n${$('#csMsg').value.trim()}`;
  const {error} = await supabaseClient.from('messages').insert({customer_id: authUser.id, sender_role: 'customer', message});
  if (error) return toast(error.message);
  $('#csDone').textContent = 'Your message was sent to the owner. You can continue the conversation in Message the Seller.';
  $('#csMsg').value = '';
};

/* ---------- INIT ---------- */
$$('img').forEach(i => { if (i.complete && !i.naturalWidth) i.remove(); });
(async function initialize() {
  try {
    await loadStock();
    const {data, error} = await supabaseClient.auth.getSession();
    if (error) throw error;
    if (data.session?.user) await startSession(data.session.user);
    else startGuest();
    if (data.session?.user && !me) await startGuest();
  } catch (error) {
    startGuest();
    showDatabaseError(error);
  }
})();
/* ---------- VIEW FULL PRODUCT PICTURE ---------- */
document.addEventListener('click', e => {
  const v = e.target.closest('[data-view]');
  if (v) {
    const p = P(+v.dataset.view);
    $('#imgFull').style.backgroundImage = 'url("' + p.img + '")';
    $('#imgName').textContent = p.name;
    $('#imgDesc').textContent = p.desc + ' | ' + peso(p.price);
    $('#imgAdd').dataset.add = p.id;
    $('#imgAdd').hidden = !me || Number(stock[p.id]) < 1;
    openModal('imgModal');
  }
  if (e.target.id === 'imgModal') closeModal('imgModal');
});
$('#imgAdd').addEventListener('click', () => closeModal('imgModal'));
