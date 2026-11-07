const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const peso = amount => '₱' + Number(amount).toLocaleString('en-PH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

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
  {id:31,name:'Ceramic Matcha Mug',cat:'Merchandise',price:1800,rate:4.8,img:'mug.webp',desc:'A beautiful ceramic mug perfect for enjoying your favorite matcha preparation.'}
];

const cart = new Map();
let category = 'all';
let toastTimer;

function showView(name) {
  $('#homeView').hidden = name !== 'home';
  $('#productsView').hidden = name !== 'products';
  $('#cartView').hidden = name !== 'cart';
  $$('.bar [data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === name));
  if (name === 'products') renderProducts();
  if (name === 'cart') renderCart();
  window.scrollTo(0, 0);
}

function renderProducts() {
  const query = $('#search').value.trim().toLowerCase();
  const sort = $('#sort').value;
  const products = PRODUCTS.filter(product =>
    (category === 'all' || product.cat === category) &&
    `${product.name} ${product.desc}`.toLowerCase().includes(query)
  );

  if (sort === 'asc') products.sort((a, b) => a.price - b.price);
  if (sort === 'desc') products.sort((a, b) => b.price - a.price);
  if (sort === 'rate') products.sort((a, b) => b.rate - a.rate);

  $('#productGrid').innerHTML = products.map(product => `
    <article class="prod">
      <div class="ph product-photo">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <span>${product.name}</span>
      </div>
      <div class="prod-b">
        <span class="tag">${product.cat}</span>
        <b>${product.name}</b>
        <small class="muted">${product.desc}</small>
        <span class="star" aria-label="${product.rate} out of 5 stars">★ ${product.rate}</span>
        <span class="price">${peso(product.price)}</span>
        <button class="btn" data-add="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join('') || '<p class="empty">No products found.</p>';
}

function updateCartCount() {
  const count = [...cart.values()].reduce((total, quantity) => total + quantity, 0);
  $('#cartCount').textContent = count;
}

function renderCart() {
  if (cart.size === 0) {
    $('#cartBox').innerHTML = '<div class="card empty"><b>Your cart is empty</b><p>Browse the collection to add a few favorites.</p><button class="btn" data-view="products">Browse Products</button></div>';
    return;
  }

  const items = [...cart].map(([id, quantity]) => ({product: PRODUCTS.find(item => item.id === id), quantity}));
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  $('#cartBox').innerHTML = `
    <div class="card">
      ${items.map(({product, quantity}) => `
        <div class="cart-preview">
          <div><b>${product.name}</b><br><span class="muted">${peso(product.price)} each</span></div>
          <div class="qty">
            <button data-change="${product.id}" data-delta="-1" aria-label="Remove one ${product.name}">−</button>
            <b>${quantity}</b>
            <button data-change="${product.id}" data-delta="1" aria-label="Add one ${product.name}">+</button>
            <button class="remove-item" data-remove="${product.id}">Remove</button>
          </div>
          <b>${peso(product.price * quantity)}</b>
        </div>
      `).join('')}
      <div class="row total"><span>Catalog total</span><span>${peso(total)}</span></div>
      <p class="muted">This is a catalog preview only. No order or payment will be submitted.</p>
      <button class="btn ghost" data-clear>Clear Cart</button>
    </div>
  `;
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('click', event => {
  const viewButton = event.target.closest('[data-view]');
  if (viewButton) {
    event.preventDefault();
    showView(viewButton.dataset.view);
  }

  const addButton = event.target.closest('[data-add]');
  if (addButton) {
    const id = Number(addButton.dataset.add);
    cart.set(id, (cart.get(id) || 0) + 1);
    updateCartCount();
    showToast('Added to your temporary cart.');
  }

  const changeButton = event.target.closest('[data-change]');
  if (changeButton) {
    const id = Number(changeButton.dataset.change);
    const quantity = (cart.get(id) || 0) + Number(changeButton.dataset.delta);
    if (quantity > 0) cart.set(id, quantity);
    else cart.delete(id);
    updateCartCount();
    renderCart();
  }

  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) {
    cart.delete(Number(removeButton.dataset.remove));
    updateCartCount();
    renderCart();
  }

  if (event.target.closest('[data-clear]')) {
    cart.clear();
    updateCartCount();
    renderCart();
  }

  const chip = event.target.closest('[data-cat]');
  if (chip) {
    category = chip.dataset.cat;
    $$('#chips .chip').forEach(button => button.classList.toggle('active', button === chip));
    renderProducts();
  }

  const flip = event.target.closest('.flip');
  if (flip) flip.classList.toggle('on');
});

$('#search').addEventListener('input', renderProducts);
$('#sort').addEventListener('change', renderProducts);
document.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) event.target.remove();
}, true);

renderProducts();
updateCartCount();
