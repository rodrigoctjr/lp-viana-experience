/**
 * Colar em Extensões > Apps Script da planilha de vouchers.
 * Executar setupVoucherSheet uma vez.
 * Em Propriedades do script, criar VOUCHER_SECRET com o mesmo valor de VOUCHER_SCRIPT_SECRET.
 * Implantar como app da web: executar como eu, acesso: qualquer pessoa.
 */

function setupVoucherSheet() {
  const book = SpreadsheetApp.getActive();
  let config = book.getSheetByName("Cotas");
  if (!config) config = book.insertSheet("Cotas");
  config.clear();
  config.getRange(1, 1, 1, 4).setValues([["attractionId", "slotId", "label", "capacity"]]);
  config.getRange(2, 1, 4, 4).setValues([
    ["cantim-di-minas", "almoco", "Almoço, sem bebidas", 2],
    ["banho-de-floresta", "9h", "Sessão das 9h", 40],
    ["banho-de-floresta", "10h", "Sessão das 10h", 40],
    ["banho-de-floresta", "11h", "Sessão das 11h", 40],
  ]);

  let entries = book.getSheetByName("Inscricoes");
  if (!entries) entries = book.insertSheet("Inscricoes");
  if (entries.getLastRow() === 0) {
    entries.getRange(1, 1, 1, 5).setValues([["attractionId", "slotId", "name", "phone", "at"]]);
  }
}

function doPost(e) {
  const secret = PropertiesService.getScriptProperties().getProperty("VOUCHER_SECRET");
  const body = JSON.parse(e.postData.contents);
  if (!secret || body.secret !== secret) {
    return json_({ ok: false, reason: "invalid" });
  }
  if (body.action === "status") return json_({ ok: true, remaining: remainingMap_() });
  if (body.action === "claim") return json_(claim_(body));
  return json_({ ok: false, reason: "invalid" });
}

function remainingMap_() {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const quotas = quotas_();
    const taken = countTaken_();
    const remaining = {};
    quotas.forEach(function (quota) {
      if (!remaining[quota.attractionId]) remaining[quota.attractionId] = {};
      const used = taken[quota.attractionId + ":" + quota.slotId] || 0;
      remaining[quota.attractionId][quota.slotId] = Math.max(0, quota.capacity - used);
    });
    return remaining;
  } finally {
    lock.releaseLock();
  }
}

function claim_(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const quotas = quotas_();
    const quota = quotas.find(function (item) {
      return item.attractionId === body.attractionId && item.slotId === body.slotId;
    });
    const phone = String(body.phone || "");
    const name = String(body.name || "").trim();
    if (!quota || name.length < 2 || (phone.length !== 10 && phone.length !== 11)) {
      return { ok: false, reason: "invalid" };
    }
    const sheet = SpreadsheetApp.getActive().getSheetByName("Inscricoes");
    const rows = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
    const sameSlot = rows.filter(function (row) {
      return row[0] === body.attractionId && row[1] === body.slotId;
    });
    if (sameSlot.some(function (row) { return String(row[3]) === phone; })) {
      return { ok: false, reason: "duplicate" };
    }
    if (sameSlot.length >= quota.capacity) return { ok: false, reason: "full" };
    sheet.appendRow([body.attractionId, body.slotId, name, phone, new Date().toISOString()]);
    return { ok: true, remaining: quota.capacity - sameSlot.length - 1 };
  } finally {
    lock.releaseLock();
  }
}

function quotas_() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Cotas");
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues().map(function (row) {
    return {
      attractionId: String(row[0]),
      slotId: String(row[1]),
      label: String(row[2]),
      capacity: Number(row[3]) || 0,
    };
  });
}

function countTaken_() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("Inscricoes");
  const counts = {};
  if (sheet.getLastRow() < 2) return counts;
  sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues().forEach(function (row) {
    const key = row[0] + ":" + row[1];
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
