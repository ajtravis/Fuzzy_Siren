// Fuzzy Siren mailing list — Google Apps Script (bound to the Google Sheet).
// Receives POSTs from the website signup form and appends a row: timestamp, email, source page, user agent.
// Duplicate emails (case-insensitive) are ignored.

var SHEET_NAME = 'Subscribers';

function doPost(e) {
  var p = (e && e.parameter) || {};
  var email = String(p.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond({ ok: false, error: 'invalid email' });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = getSheet();
    var existing = sheet.getLastRow() > 1
      ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().map(function (r) { return String(r[0]).toLowerCase(); })
      : [];
    if (existing.indexOf(email) === -1) {
      sheet.appendRow([new Date(), email, String(p.source || ''), String(p.ua || '').slice(0, 200)]);
    }
  } finally {
    lock.releaseLock();
  }
  return respond({ ok: true });
}

// Visiting the web-app URL in a browser just confirms it is deployed.
function doGet() {
  return respond({ ok: true, message: 'Fuzzy Siren mailing list endpoint is live.' });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Email', 'Source page', 'User agent']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
