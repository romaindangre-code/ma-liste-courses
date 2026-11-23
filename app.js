const RAYONS = ["Boissons", "Épicerie salée", "Épicerie sucrée", "Hygiène", "Légumes / Fruits", "Maison", "Produits frais", "Surgelé", "Autre"];
const INITIAL_PRODUCTS = [
  [true,"Eau","Boissons"],[true,"Jus","Boissons"],[false,"Couscous perle","Épicerie salée"],[false,"Croquettes","Épicerie salée"],[false,"Haricots rouges","Épicerie salée"],[false,"Huile d'olive","Épicerie salée"],[false,"Lentilles corail","Épicerie salée"],[false,"Lentilles vertes","Épicerie salée"],[false,"Maïs","Épicerie salée"],[false,"Maquereaux","Épicerie salée"],[false,"Olives","Épicerie salée"],[false,"Pain_Baguette","Épicerie salée"],[false,"Pain_Complet","Épicerie salée"],[false,"Pain_Tartines","Épicerie salée"],[false,"Pâtes courtes","Épicerie salée"],[false,"Pâtes longues","Épicerie salée"],[true,"Pâtes rapides","Épicerie salée"],[false,"Pois chiches","Épicerie salée"],[false,"Poivre","Épicerie salée"],[true,"Riz","Épicerie salée"],[false,"Riz complet","Épicerie salée"],[false,"Riz risotto","Épicerie salée"],[false,"Sardines","Épicerie salée"],[false,"Sauce tomate","Épicerie salée"],[true,"Sauces pâtes","Épicerie salée"],[false,"Sel","Épicerie salée"],[false,"Semoule","Épicerie salée"],[true,"Soupe","Épicerie salée"],[false,"Tartines","Épicerie salée"],[false,"Thon","Épicerie salée"],[false,"Ananas","Épicerie sucrée"],[false,"Biscuits Prince","Épicerie sucrée"],[false,"Café","Épicerie sucrée"],[true,"Céréales grands","Épicerie sucrée"],[false,"Céréales petites","Épicerie sucrée"],[false,"Chocolat dessert","Épicerie sucrée"],[false,"Confiture","Épicerie sucrée"],[false,"Farine","Épicerie sucrée"],[false,"Levure","Épicerie sucrée"],[false,"Pêches","Épicerie sucrée"],[false,"Sucre blanc","Épicerie sucrée"],[false,"Sucre de canne","Épicerie sucrée"],[false,"Brosse à dents grands","Hygiène"],[false,"Brosses à dents petites","Hygiène"],[true,"Brossettte petites","Hygiène"],[false,"Cotons petites","Hygiène"],[false,"Cotons grands","Hygiène"],[false,"Dentifrice grands","Hygiène"],[false,"Dentifrice petites","Hygiène"],[false,"Mouchoirs","Hygiène"],[false,"Produit toilette filles","Hygiène"],[false,"Savon douche","Hygiène"],[false,"Savon main","Hygiène"],[false,"Shampooing","Hygiène"],[false,"Avocats","Légumes / Fruits"],[false,"Bananes","Légumes / Fruits"],[false,"Courgettes","Légumes / Fruits"],[false,"Courgettes","Légumes / Fruits"],[false,"Echalottes","Légumes / Fruits"],[false,"Jus","Légumes / Fruits"],[false,"Oignons rouges","Légumes / Fruits"],[false,"Oranges","Légumes / Fruits"],[false,"Poirreaux","Légumes / Fruits"],[false,"Poivrons","Légumes / Fruits"],[false,"Pommes","Légumes / Fruits"],[false,"Pommes de terre","Légumes / Fruits"],[false,"Tomates","Légumes / Fruits"],[false,"Destop","Maison"],[false,"Éponge","Maison"],[false,"Essuie-tout","Maison"],[false,"Lessive","Maison"],[false,"Lingettes désinfectantes","Maison"],[false,"Papier alu","Maison"],[false,"Papier cuisson","Maison"],[false,"Papier film","Maison"],[false,"PQ","Maison"],[false,"Produit désinfectant","Maison"],[false,"Produit plaques","Maison"],[false,"Produit sol","Maison"],[false,"Produit toilettes","Maison"],[false,"Produit vaisselle","Maison"],[false,"Produit vitre","Maison"],[false,"Sacs poubelles","Maison"],[true,"Beurre","Produits frais"],[true,"Camembert","Produits frais"],[true,"Chorizo","Produits frais"],[true,"Compotes","Produits frais"],[true,"Crème","Produits frais"],[false,"Feta","Produits frais"],[true,"Fromage de chèvre","Produits frais"],[false,"Fromage fouetté","Produits frais"],[false,"Fromage râpé","Produits frais"],[false,"Gnocchis","Produits frais"],[false,"Jambon blanc","Produits frais"],[true,"Jambon fumé","Produits frais"],[true,"Lait","Produits frais"],[false,"Lardons","Produits frais"],[true,"Mozzarella","Produits frais"],[false,"Œufs","Produits frais"],[true,"Parmesan","Produits frais"],[false,"Poisson frais","Produits frais"],[true,"Skyr","Produits frais"],[false,"Yaourts fruits","Produits frais"],[false,"Ail","Surgelé"],[false,"Brocolis","Surgelé"],[false,"Oignon","Surgelé"],[false,"Petits pois","Surgelé"],[false,"Poisson surgelé","Surgelé"],[false,"Bicarbonate de soude","Maison"],[false,"Vinaigre ","Maison"]
].map(([selected,name,rayon], index) => ({ id: `p${String(index + 1).padStart(3,"0")}`, selected, purchased: false, name: name.trim(), rayon }));

const STORAGE_KEY = "ma-liste-courses-v1";
const BACKUP_FORMAT = "ma-liste-courses";
const BACKUP_VERSION = 1;
let products = loadProducts();
let editingId = null;
let toastTimer;
let confirmationResolver = null;
const frenchCollator = new Intl.Collator("fr", { sensitivity: "base", numeric: true });

const $ = (id) => document.getElementById(id);
const els = {
  coursesView: $("coursesView"), productsView: $("productsView"), coursesTab: $("coursesTab"), productsTab: $("productsTab"),
  courseGroups: $("courseGroups"), productGroups: $("productGroups"), emptyCourses: $("emptyCourses"),
  remainingCount: $("remainingCount"), purchasedCount: $("purchasedCount"), courseBadge: $("courseBadge"), catalogCount: $("catalogCount"),
  searchInput: $("searchInput"), dialog: $("productDialog"), form: $("productForm"), dialogTitle: $("dialogTitle"),
  name: $("productName"), rayon: $("productRayon"), formError: $("formError"), toast: $("toast"),
  confirmDialog: $("confirmDialog"), confirmTitle: $("confirmTitle"), confirmMessage: $("confirmMessage"), confirmAction: $("confirmAction")
};

function loadProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : structuredClone(INITIAL_PRODUCTS);
  } catch { return structuredClone(INITIAL_PRODUCTS); }
}
function saveProducts(message) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  render();
  if (message) showToast(message);
}
function showToast(message) {
  clearTimeout(toastTimer); els.toast.textContent = message; els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2100);
}

function requestConfirmation({ title, message, confirmLabel = "Confirmer", danger = false }) {
  if (confirmationResolver) confirmationResolver(false);
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmAction.textContent = confirmLabel;
  els.confirmAction.classList.toggle("danger-button", danger);
  els.confirmDialog.showModal();
  return new Promise(resolve => { confirmationResolver = resolve; });
}

function finishConfirmation(confirmed) {
  if (!confirmationResolver) return;
  const resolve = confirmationResolver;
  confirmationResolver = null;
  els.confirmDialog.close();
  resolve(confirmed);
}

function backupFileName() {
  const today = new Date();
  const date = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  return `ma-liste-courses-sauvegarde-${date}.json`;
}

function downloadBackup() {
  const backup = {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    products
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = backupFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Sauvegarde téléchargée");
}

function validatedBackup(data) {
  if (!data || data.format !== BACKUP_FORMAT || data.version !== BACKUP_VERSION || !Array.isArray(data.products)) {
    throw new Error("format");
  }
  const ids = new Set();
  return data.products.map((item, index) => {
    if (!item || typeof item.name !== "string" || !item.name.trim() || item.name.trim().length > 80 || typeof item.selected !== "boolean" || typeof item.purchased !== "boolean") {
      throw new Error("product");
    }
    let id = typeof item.id === "string" && item.id.trim() ? item.id.trim() : `r-${Date.now().toString(36)}-${index}`;
    if (ids.has(id)) id = `${id}-${index}`;
    ids.add(id);
    const rayon = typeof item.rayon === "string" && RAYONS.includes(item.rayon) ? item.rayon : "Autre";
    return { id, name: item.name.trim(), rayon, selected: item.selected, purchased: item.selected && item.purchased };
  });
}

async function restoreBackup(file) {
  if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error("size");
    const restoredProducts = validatedBackup(JSON.parse(await file.text()));
    const message = `Restaurer ${restoredProducts.length} produit${restoredProducts.length > 1 ? "s" : ""} ? Les données actuelles seront remplacées.`;
    if (!await requestConfirmation({ title: "Restaurer la sauvegarde ?", message, confirmLabel: "Restaurer", danger: true })) return;
    products = restoredProducts;
    els.searchInput.value = "";
    saveProducts("Données restaurées");
  } catch {
    showToast("Ce fichier de sauvegarde n’est pas valide");
  } finally {
    $("restoreFile").value = "";
  }
}
function escapeHtml(text) { const div = document.createElement("div"); div.textContent = text; return div.innerHTML; }
function icon(name) {
  const paths = {
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"/>'
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24">${paths[name]}</svg>`;
}
function grouped(list) {
  return RAYONS.map(rayon => [rayon, list.filter(p => p.rayon === rayon).sort((a, b) => frenchCollator.compare(a.name, b.name))]).filter(([, items]) => items.length);
}
function courseRow(p) {
  return `<div class="item-row ${p.purchased ? "purchased" : ""}">
    <label class="check-control"><span class="sr-only">${p.purchased ? "Retirer" : "Mettre"} ${escapeHtml(p.name)} du caddie</span><input type="checkbox" data-action="purchased" data-id="${p.id}" ${p.purchased ? "checked" : ""}></label>
    <span class="item-name">${escapeHtml(p.name)}</span><span></span>
  </div>`;
}
function productRow(p) {
  return `<div class="item-row">
    <label class="check-control"><span class="sr-only">${p.selected ? "Retirer" : "Ajouter"} ${escapeHtml(p.name)} ${p.selected ? "de" : "à"} la liste</span><input type="checkbox" data-action="selected" data-id="${p.id}" ${p.selected ? "checked" : ""}></label>
    <span class="item-name">${escapeHtml(p.name)}</span>
    <span class="row-actions"><button class="icon-button quiet" data-action="edit" data-id="${p.id}" aria-label="Modifier ${escapeHtml(p.name)}">${icon("edit")}</button><button class="icon-button quiet danger" data-action="delete" data-id="${p.id}" aria-label="Supprimer ${escapeHtml(p.name)}">${icon("trash")}</button></span>
  </div>`;
}
function groupMarkup(entries, rowRenderer) {
  return entries.map(([rayon, items]) => `<section class="group"><div class="group-title">${escapeHtml(rayon)}<span>${items.length} produit${items.length > 1 ? "s" : ""}</span></div>${items.map(rowRenderer).join("")}</section>`).join("");
}
function render() {
  const selected = products.filter(p => p.selected);
  const remaining = selected.filter(p => !p.purchased).length;
  els.remainingCount.textContent = remaining; els.purchasedCount.textContent = selected.length - remaining; els.courseBadge.textContent = selected.length;
  els.courseGroups.innerHTML = groupMarkup(grouped(selected), courseRow); els.emptyCourses.hidden = selected.length > 0;
  const query = els.searchInput.value.trim().toLocaleLowerCase("fr");
  const filtered = products.filter(p => `${p.name} ${p.rayon}`.toLocaleLowerCase("fr").includes(query));
  els.catalogCount.textContent = `${filtered.length} produit${filtered.length > 1 ? "s" : ""}${query ? " trouvé" + (filtered.length > 1 ? "s" : "") : " dans le catalogue"}`;
  els.productGroups.innerHTML = groupMarkup(grouped(filtered), productRow);
}
function switchView(name) {
  const courses = name === "courses";
  els.coursesView.hidden = !courses; els.productsView.hidden = courses;
  els.coursesTab.classList.toggle("active", courses); els.productsTab.classList.toggle("active", !courses);
  els.coursesTab.toggleAttribute("aria-current", courses); els.productsTab.toggleAttribute("aria-current", !courses);
  window.scrollTo({top: 0, behavior: "smooth"});
}
function openDialog(product) {
  editingId = product?.id ?? null; els.dialogTitle.textContent = product ? "Modifier le produit" : "Ajouter un produit";
  els.name.value = product?.name ?? ""; els.rayon.value = product?.rayon ?? RAYONS[0]; els.formError.textContent = "";
  els.dialog.showModal(); setTimeout(() => els.name.focus(), 0);
}
function closeDialog() { els.dialog.close(); editingId = null; }

els.rayon.innerHTML = RAYONS.map(r => `<option>${escapeHtml(r)}</option>`).join("");
els.coursesTab.addEventListener("click", () => switchView("courses"));
els.productsTab.addEventListener("click", () => switchView("products"));
$("openProducts").addEventListener("click", () => switchView("products"));
$("addProduct").addEventListener("click", () => openDialog());
$("closeDialog").addEventListener("click", closeDialog); $("cancelDialog").addEventListener("click", closeDialog);
$("cancelConfirm").addEventListener("click", () => finishConfirmation(false));
els.confirmAction.addEventListener("click", () => finishConfirmation(true));
els.confirmDialog.addEventListener("cancel", event => { event.preventDefault(); finishConfirmation(false); });
els.searchInput.addEventListener("input", render);
$("clearPurchased").addEventListener("click", async () => {
  const purchased = products.filter(p => p.selected && p.purchased);
  if (!purchased.length) { showToast("Aucun produit acheté à retirer"); return; }
  const message = `${purchased.length} produit${purchased.length > 1 ? "s achetés seront retirés" : " acheté sera retiré"}. Les produits encore à trouver resteront dans la liste.`;
  if (!await requestConfirmation({ title: "Retirer les produits achetés ?", message, confirmLabel: "Retirer" })) return;
  purchased.forEach(p => { p.selected = false; p.purchased = false; });
  saveProducts("Produits achetés retirés");
});
$("resetList").addEventListener("click", async () => {
  const hasItems = products.some(p => p.selected || p.purchased);
  if (!hasItems) { showToast("La liste est déjà vide"); return; }
  if (!await requestConfirmation({ title: "Tout réinitialiser ?", message: "Tous les produits seront retirés de la liste de courses, y compris ceux qui ne sont pas cochés. Le catalogue sera conservé.", confirmLabel: "Tout réinitialiser", danger: true })) return;
  products.forEach(p => { p.selected = false; p.purchased = false; });
  saveProducts("Liste réinitialisée");
});

function buildShareText() {
  const remaining = products.filter(p => p.selected && !p.purchased);
  if (!remaining.length) return "";
  const lines = ["Ma liste de courses", ""];
  grouped(remaining).forEach(([rayon, items], index, groups) => {
    lines.push(rayon);
    items.forEach(item => lines.push(`• ${item.name}`));
    if (index < groups.length - 1) lines.push("");
  });
  return lines.join("\n");
}

async function copyShareText(text) {
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
  else {
    const area = document.createElement("textarea");
    area.value = text; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
    document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
  }
  showToast("Liste copiée — colle-la dans WhatsApp");
}

$("shareList").addEventListener("click", async () => {
  const text = buildShareText();
  if (!text) { showToast("Aucun produit restant à partager"); return; }
  try {
    if (navigator.share) await navigator.share({ title: "Ma liste de courses", text });
    else await copyShareText(text);
  } catch (error) {
    if (error?.name !== "AbortError") {
      try { await copyShareText(text); }
      catch { showToast("Le partage n’est pas disponible sur ce navigateur"); }
    }
  }
});

$("backupData").addEventListener("click", downloadBackup);
$("restoreData").addEventListener("click", () => $("restoreFile").click());
$("restoreFile").addEventListener("change", event => restoreBackup(event.target.files?.[0]));

document.addEventListener("change", (event) => {
  const input = event.target.closest("input[data-action]"); if (!input) return;
  const product = products.find(p => p.id === input.dataset.id); if (!product) return;
  product[input.dataset.action] = input.checked;
  if (input.dataset.action === "selected" && !input.checked) product.purchased = false;
  saveProducts(input.dataset.action === "selected" ? "Liste mise à jour" : null);
});
document.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]"); if (!button) return;
  const product = products.find(p => p.id === button.dataset.id); if (!product) return;
  if (button.dataset.action === "edit") openDialog(product);
  if (button.dataset.action === "delete" && await requestConfirmation({ title: "Supprimer ce produit ?", message: `« ${product.name} » sera supprimé définitivement du catalogue.`, confirmLabel: "Supprimer", danger: true })) {
    products = products.filter(p => p.id !== product.id); saveProducts("Produit supprimé");
  }
});
els.form.addEventListener("submit", (event) => {
  event.preventDefault(); const name = els.name.value.trim(); const rayon = els.rayon.value;
  if (!name) { els.formError.textContent = "Saisis un nom de produit."; return; }
  const duplicate = products.some(p => p.id !== editingId && p.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr") && p.rayon === rayon);
  if (duplicate) { els.formError.textContent = "Ce produit existe déjà dans ce rayon."; return; }
  const isEdit = Boolean(editingId);
  if (isEdit) { const product = products.find(p => p.id === editingId); product.name = name; product.rayon = rayon; }
  else products.push({ id: `p-${Date.now().toString(36)}`, name, rayon, selected: false, purchased: false });
  closeDialog(); saveProducts(isEdit ? "Produit modifié" : "Produit ajouté");
});
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
