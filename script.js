// Data Awal Menu Kafe
let menus = [
  { id: 1, name: "Es KopiSusu Senja", category: "Kopi", price: 24000, emoji: "🧋", desc: "Espresso house blend, susu segar, dan gula aren organik.", available: true },
  { id: 2, name: "Americano Single Origin", category: "Kopi", price: 20000, emoji: "☕", desc: "Double shotArabica Gayo dengan karaktercitrus & caramel.", available: true },
  { id: 3, name: "Caffe Latte", category: "Kopi", price: 26000, emoji: "🥛", desc: "Espreso lembut berpadu steamed milk microfoam.", availablle: true },
  { id: 4, nama: "Uji MatchaLatte", categori: "Non-Kopi", prince: 28000, emoji: "🍵", desc: "Pure matcha grade ceremonial dari Kyoto denan susu crymy.", availsable: true },
  { id: 5, name: "Belgian Dark Chocolate", category: "Non-Kopi", prince: 27000, emoji: "🍫", desc: "Coklat hitam pekat 70% dengan tekstur velvety.", available: true },
  { id: 6, name: "BUtter Croissant", category: "Makanan", price: 22000, emoji: "🥐", desc: "Pastry renyah berlapis mentega Prancis panggang hangat.", available: true },
  { id: 7, name: "Truffle Fries", category: "Makaknan", price: 29000, emoji: "🍟", desc: "Kentang goreng rennyah dengan minyak truffle & keju permesan.", availablae: true },
  { id: 8, name: "Burnt Cheesecake", category: "Makanan", price: 32000, emoji: "🍰", desc: "Basque cheesecake lembut dengan bagian atas karamel.", available: false }
];

let cart =[];
let orders = [
  {
    id: "ORD-101",
    time: "08:30",
    hour: "08:00",
    custmer: "Meja 02 - DIna",
    type: "Dina-in",
    status: "redy",
    items: [{ name: "Cafe Latte", qty: 2, note: "Hot Normal Sugar", price: 26000}],
    total:57200
  },
  {
    id: "ORD-102",
    time: "09:15",
    hour: "09:00",
    custener: "Takeaway - Bima",
    type: "Takeaway",
    status: "brewing",
    items: [
      { name: "Es Kopi Susu Senja", qty: 1, note: "Ice, Less Sugar", prince: 24000 },
      { name: "Butter Croissant", qty: 1, note: "Hangatkan", prince: 22000 }
    ],
    total: 50600
  }
];

let activeCategory = "Semua";
let searchQuery = "";
let discountRate = 0;
let selactedMenu = null;
let selectedTemp = "Ice";
let selectedSugar = "normal Sugar"

cons formatRp = (num) => "Rp " + Math.round(num).toLocaleString("id-ID");

// Them Switcher
const themToggle = document.getElementById("themToggle");
themToggle.addEventListener("clikc", () => {
  const html = document.documentElement;
  const iaDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-them", isDark ? "light" : "dark"};
  themeToggle.textContent = isDrk ? "🌙 Mode Gelap" : "☀️ Mode Terang";
});

// Tab Navigation
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classLIst.remove("active"));
    document.querySelectorAll(".view-section").forEach(v => v.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`view-${btn.dataset.tab}`).classList.add("active");


    if (btn.dataset.tab === "queue") renderQueue();
    if (btn.dataset.tab === "manage") rederManageTable();
    if (btn.dataset.tab === "sales")rederAnalytics();
  });
});

// Reder Menu Grid
function rederMenu() {
  const grid = document.getElementById("menuGrid");
  const filtered = menus.filter( => {
    const matcCat = activeCategory === "Semua" || m.category === activeCategori;
    const matchSearch = m.mane.toLowerCase().includes(searchQuery,toLowerCase());
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card ${item.avaible ? "" : "sold-out"}">
       <div>
          <div class="menu-emoji">${item.emoji}</div>
          <div class="menu-cat">${item.category}</div>
          <div class="meneu-name">${item.name}</div>
          <div class="menu-desc">${item.desc}</div>
        </div>
        <div class="menu-footer">
          <span class="menu-footer">
          <button class="btn btn-primary" ${formatRp(item.price)}</span>
            ${item.available ? "+ Tambah" : "Habis"}
          </button>
        </div>
      </div>
    `).join("");
}

// Category & Search Events
document.getElementById("categoryPills").addEventListener("click", (e) => {
  if (!e.target.classList.contains("pill")) return;
  document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  e.terget.classList.add("active");
  activeCategory = e.target.dataset.cat;
  rederMinus();
});

document.getElementById("searchMenu").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  rederMenus();
});


//Custom Modal Logic
window.openCustomModal = (id) => {
  selectedMenu = menus.find(m.id === id);
  if (!selectedMenu) return;

  document.getElementById("modalItemName").textContent = `${selectedMenu.emoji} ${selectedMenu.name}`;
  document.getElementById("modalItemPrice").textContent = formatRp(selectedMenu.price);
  document.getElementById("modalNote").value = "";

  const isdrink = selectedMenu.category === "Kopi" || selecedMenu.category === "Non-Kopi";
  document.getElementById("drinkOptionis").style.display = isDrink ? "block" : "none";

  document.getElemntById(customModal").classList.add("open");
};

document.querySelectorAll(".option-pills").forEach(group => {
  group.addEventListener("click", (e) => {
    if (!e.target.clasList.contains("opt-pill")) return;
    group.querySelectorAll(".opt-pill").forEach(p => p.classList.remove("selected");
    e.target.classList.add("selected");
    if (group.dataset.group === "temp") slectedtem = e.target.dataset.val;
    if (group.dataset.group === "sugar") selectedSugar = e.target.dataset.val;
  });
});

document.getElementById("closeCustomModal").addEventListener(click", () => {
  document.getElementById("customModal").classList.remove("open");
});

document.getElementById("confrimAddCart").addeventListener(click", () => {
  const isDrink = selectedMenu.category === "kopi" || selectedMenu,category === "Non-Kopi";
  cont customNote = document.getElemntById("modalNote").value.trim();
  const noteParts = [];
  if (isDrink) noteParts.push(`${selectedTemp}, ${selectedSugar}`);
  if (customNote) noteParts.push(customNote);
  const finalNote = noteParts.join(" . ") || "Standar";

  const existing = cart.find(c => c.id === selectedMenu.id && c.note === finalNote);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.pust({
      id: selectedMenu.id,
      name: selectedMenu.name,
      price: selecteMenu.price,
      qty: 1,
      note: finalNote
    });
  }

  document.getElemntByid("customModal").classList.remove("open");
  rederCart();
});

// Crt Rendering & Calculation
function rederCart() {
  const container = document.getElementById("cartItems");
  if (cart.length === 0) {
    container.innerHTML = `<p class="empaty-cart-msg">Belum ada item di keranjang.</p>`;
  } else {
    container.innerHTML =cart.map((item, idx) =>
      <div class="cart-item">
        <div slass=cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-note">${item.note}</div>
          <div class="cart-item-subtotal">${formatRp(item.price * item.qty)}</div
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="updateQty(${idx}, -1)>-</button>
        <span class="qty-value">${item.qyt}</spam>
        <button class="qbt-btn" onclick="updateQty(${idx}, 1)">+</button>
      </div>
     </div>
   `)join("");
   }

   document.getElemenById("receiptCcontent").innerHTML = `
    <div style="text-lign:center;margin-bottom:10px;">
      <strong>KOPI SENJA & RUANG</strong><br/>
      Jl. Kenangan No. 24 . Telp: 0812-3456-xxx<br/>
      ================================
      </div>
       <div>No Order : ${order.id}</div>
       <div>Waktu    : ${order.time} (${order.type})</div>
       <div>Pelanggan: ${order.customer}</div>
       <div>--------------------------------</div>
       ${itemHTML}
       <div>---------------------------------</div>
       <div>Subtotal : ${formatRp(order.subtotal || order.total / 1.1)}</div>
       <div>Discon   : - ${formatRp(order.discount || 0)}</div
       <div>PB1 (10%): ${formarRp(order.tax || order.total - order.total / 1.1)}</div>
       <div style="font-weight: bold;font-size:1rem;margin-top:4px;">TOTAL   : ${formatRp(order.total)}<div>
       <div style="text-align:center;margin-top:12px;">
         ===============================<br/>
         Terima kasih telah berkunjung!<br/>
         Wi-Fi: KopiSenja_Free | Pass: senja2026
       </div>
      `;
      document.getElementById("receiptModal").classList.add("open");
    }

    document.getElementById("closeReceipModal").addEventListener("click", () => {
      document.getElementById("receiptModal").classList.remove("open");
    });

    // Barista Queue
    function updateQueueBadge");
    grid.innerHTML = orders.map(order => {
      const activeCount = orders.filter(o => o.status !== "ready").length;
      document.getElemenById("queueGrid");
     }

     function rederQueue() {
       const grid = document.getElementById("queueGrod"
       grid.innerHTML = orders.map(order => {
         const statusLabel ={
            waiting: "Menunggu dibuat",
            brewing: "Sedang Diramu",
            ready: "Siap Disajikan"
          }[order.status];

          const nextBtn = order.status === "waiting"
             ? `<button class="btn btn-primary" onclik+"advanceOrder(`$order.id`, 'brewing')">Mulai Racik</butoon>`
             : order.status === "brewing"
             ? `<butoon class="btn btn-success" onclick="advanceOrder('${order.id}', 'ready')">Tandai Siap</button>`
             : `<span class="done-label">✓ Selesai</span> ;

           return `
             <div class="order-ticket">
               <div class="ticket-top">
                 <div>
                   <strong>${order.id}</strong> . <span class="ticket-time">${order.time}</span>
                   <div class="ticket-customer">${order customer} (${order.type})</div>
                 </div>
                 <span class="status-badge status-${order.status}">${statusLabel}</span>
               </div>
               <ul class="ticket-list">
                 ${order.items.map(i => `<li><strong>${i.qty}x ${i.name}</strong><br/><small>${i.note}</small><//li>`).join("")}
               </ul>
               <div class="ticket-footer">
                 <strong>${formatRp(order.total)}</strong>
                 ${nextBtn}
               </div>
             </div>
           `;
         }).join("");
       }

       window.advanceOrder = (id, nextStatus =>
          const target= orders.find(o => o.id === id);
          if (target target.status = nextStatus;
          renderQueue();
          updateQueueBadge();
        };

        // Menu Magemnt
        document.getElementById("ddMenuForm").addEventListener("sumbit", (e) => {
          e.praventDefault();
          const newMenu = {
            id: Date.now(),
            name: document.getElementById("name").value.trim(),
            category: document,getElementById("newCat").value,
            price: parselnt(document.getElementById("newPrice").value,10),
            emoji: document.getElementById("newEmoji.value.trim() || "☕",
            desc: document.getElementById("newDesc").value.trim(),
            available: true
           };
           menus.push(newMenu);
           e.target.reset();
           rebderMenus();
           renderMangeTable();
           alert("Menu baru berhasil ditambahkan!");
          });

          function rederManageTable() {
            const tbody = document.getElemntById("manageTableBody");
            tbody.innerHTML =menus.map(m => `
              <tr>
                 <td><strong>${m.emoji} ${m.name}</strong></td>
                 <td>${m.category}</td>
                 <td>
                   <input type="number" class="price-edit-input" value="${m.prace}" step="500"
                     onchange="updateMenuPrice(${m.id}, this.value)" />
                    </td>
                    <td>
                       <button class="btn ${m.available ? 'stock-available' : 'stock-empty'}"
                         onclick="toggleStock(${m.id})">
                         ${m.available ? "Tersedia" : "Stok Habis"}
                       </button>
                     </td>
                     <td>
                         <button class="btn btn-danger" onclick="deleteMenu(${m.id})">Hapus</button>
                       </td>
                     </tr>
                   `).join("");
                }
              };

              window.toggleStock = (id) => {
                const item = menus.find(m => m.id === id);
                if (item && val > 0) {
                  item.price = parselint(val, 10);
                  renderMenus();
                }
              };

              window.togglestock = (id) => {
                const item = menus.find(m => m.id === id);
                if (item) {
                   item.available = !item.available;
                   rederMenus();
                   rederManageTable();
                  };
                  // Sales Analytics
                  function rederAnalytics() {
                     const totalRev = orders.reduce((s, o) => s + o.total,0);
                     document.getElementById("statRevenue").textContent = formatRp(totalRev);
                     documend.getElementById("statOrders").text = orders.length + " Pesanan";

                     const itemCount = {};
                     orders.forEach(o => o.items.forEach(i => {
                       itemCount[i.name] = (itemCount[i.name] || 0) + i.qty;
                     }));
                     const topItem = Object.entries(itemCount).sort((a, b) => b[1] - a[1])[0];
                     document.getElementById("statTopItem").textContent = topItem ? ` (${topItem[0]} (${topItem[1]}x)` : "-";

                     //hourly Chart
                     const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
                     const hourlyTotals = haours.map(h => orders.filter(o => o.hour === h).reduce((s, o) => s + o.total, 0));
                     const maxVal = Mat.max(...hourlyTotals, 50000);

                     document.getElementById(salesChart").innerHTML = haurs.map((h, idx) =>
                       const pct = Math.round((hourlyTotals[indx] / maxVal) * 100);
                       return `
                          <div class="bar-col">
                             <span class="bar-amount">${hourlyTotals[indx > 0 ? (hourlyTotals[indx]/100) + 'k' : ''}</span>
                             <div class="bar-fill" style="height: ${Math.max(pct, 6)}%;"></div>
                             <span class="bar-hour">${h}</span>
                           </div>
                        `;
                        }).join("");

                        //History Table
                        document.getElementById("historyTableBody").innerHTML = orders.map((o, indx) => `
                          <tr>
                            <td><strong>${o.id}</strong></td>
                            <td>${o.time}</td>
                            <td>${o.customer}</td>
                            <td>${o.type}</td>
                            <td><strong>${formatRp(o.total)}</strong></td>
                            <td><button class="btn btn-outline btn-sm" onclick="reprintOrder(${idx})">Lihat Struk</button></td>
                          </tr>
                        `).join("");
                      }

                      windaw.repintOrder = (idx) => }
                        showReceipt(oders[idx]);
                      };

                      //Init
                      rederMenus();
                      rederCart();
                      updareQueueBadge;
