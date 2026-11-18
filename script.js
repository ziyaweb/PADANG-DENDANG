const MENU = [
 {id:1,name:"Nasi Rendang",category:"Paket Nasi",price:28000,desc:"Nasi hangat dengan rendang daging kaya rempah.",tag:"Favorit",img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Nasi Ayam Pop",category:"Paket Nasi",price:26000,desc:"Ayam pop lembut dengan sambal khas.",tag:"Khas Minang",img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Nasi Ayam Gulai",category:"Paket Nasi",price:26000,desc:"Ayam berbumbu gulai santan yang gurih.",tag:"",img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Nasi Dendeng Balado",category:"Paket Nasi",price:28000,desc:"Dendeng renyah dengan sambal balado.",tag:"Pedas nikmat",img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Rendang Daging",category:"Lauk",price:18000,desc:"Daging sapi dimasak perlahan dengan rempah.",tag:"Best seller",img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Ayam Balado",category:"Lauk",price:16000,desc:"Ayam berbumbu cabai merah khas Padang.",tag:"",img:"https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Telur Balado",category:"Lauk",price:8000,desc:"Telur dengan balutan sambal balado.",tag:"",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Gulai Tunjang",category:"Lauk",price:20000,desc:"Tunjang empuk dalam kuah gulai gurih.",tag:"",img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80"},
 {id:9,name:"Daun Singkong",category:"Sayur & Sambal",price:7000,desc:"Daun singkong rebus dengan kuah santan.",tag:"",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"},
 {id:10,name:"Sambal Ijo",category:"Sayur & Sambal",price:5000,desc:"Sambal cabai hijau pelengkap hidangan.",tag:"",img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80"},
 {id:11,name:"Es Teh Manis",category:"Minuman",price:5000,desc:"Teh manis dingin yang menyegarkan.",tag:"",img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80"},
 {id:12,name:"Es Jeruk",category:"Minuman",price:8000,desc:"Perasan jeruk segar, cocok setelah makan.",tag:"",img:"https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=700&q=80"}
];
const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
let cart = [];
let activeCategory = "Semua";
const grid = document.getElementById("menuGrid");
const search = document.getElementById("menuSearch");
function renderMenu(){
 const term = search.value.trim().toLowerCase();
 const filtered = MENU.filter(m => (activeCategory==="Semua" || m.category===activeCategory) && (m.name.toLowerCase().includes(term)||m.desc.toLowerCase().includes(term)));
 grid.innerHTML = filtered.length ? filtered.map(m=>`<article class="menu-card"><div class="menu-photo"><img src="${m.img}" alt="${m.name}" loading="lazy" onerror="this.style.display='none'">${m.tag?`<span class="menu-tag">${m.tag}</span>`:""}</div><div class="menu-info"><h3>${m.name}</h3><p>${m.desc}</p><div class="menu-buy"><span class="price">${rupiah(m.price)}</span><button class="add-button" data-add="${m.id}" aria-label="Tambah ${m.name}">+</button></div></div></article>`).join("") : `<p>Menu tidak ditemukan. Coba kata kunci lain.</p>`;
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();toast("Menu ditambahkan ke keranjang.");}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+x.qty*MENU.find(m=>m.id===x.id).price,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=rupiah(total);
 document.getElementById("checkoutBtn").disabled=!count;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const m=MENU.find(a=>a.id===x.id);return `<div class="cart-row"><div><b>${m.name}</b><small>${rupiah(m.price)} / porsi</small></div><div class="qty"><button data-qty="${m.id}" data-delta="-1" aria-label="Kurangi">−</button><span>${x.qty}</span><button data-qty="${m.id}" data-delta="1" aria-label="Tambah">+</button></div></div>`}).join(""):`<div class="empty-cart">Keranjangmu masih kosong.<br><small>Yuk, pilih hidangan favoritmu!</small></div>`;
}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300)}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("drawerBackdrop").classList.add("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("drawerBackdrop").classList.remove("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","true")}
document.getElementById("categories").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x===b));renderMenu()});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add))});
document.getElementById("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const id=Number(b.dataset.qty),item=cart.find(x=>x.id===id);item.qty+=Number(b.dataset.delta);if(item.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart()});
search.addEventListener("input",renderMenu);
document.getElementById("cartOpen").addEventListener("click",openCart);document.getElementById("cartClose").addEventListener("click",closeCart);document.getElementById("drawerBackdrop").addEventListener("click",closeCart);
document.getElementById("checkoutBtn").addEventListener("click",()=>{closeCart();document.getElementById("checkoutModal").classList.add("show")});
document.getElementById("modalClose").addEventListener("click",()=>document.getElementById("checkoutModal").classList.remove("show"));
document.getElementById("checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")e.currentTarget.classList.remove("show")});
document.getElementById("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("customerName").value.trim(),type=document.getElementById("orderType").value,note=document.getElementById("orderNote").value.trim();
 const lines=cart.map(x=>{const m=MENU.find(a=>a.id===x.id);return `- ${m.name} x${x.qty} = ${rupiah(m.price*x.qty)}`});
 const total=cart.reduce((s,x)=>s+x.qty*MENU.find(m=>m.id===x.id).price,0);
 const msg=`Halo Padang Dendang, saya ingin memesan:\\n\\n${lines.join("\\n")}\\n\\nTotal sementara: ${rupiah(total)}\\nNama: ${name}\\nJenis pesanan: ${type}\\nCatatan: ${note||"-"}\\n\\nMohon konfirmasi pesanan saya. Terima kasih!`;
 // Ganti nomor di bawah dengan nomor WhatsApp resmi restoran (format internasional tanpa + atau spasi).
 const whatsappNumber = "6281234567890";
 if(whatsappNumber==="6281234567890"){toast("Atur nomor WhatsApp restoran di script.js terlebih dahulu.");return;}
 window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,"_blank");
 document.getElementById("checkoutModal").classList.remove("show");
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
renderMenu();renderCart();
