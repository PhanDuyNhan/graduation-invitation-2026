/**
 * Google Apps Script — RSVP (3 cột gọn)
 * Sheet header (dòng 1):  Tên | Lời chúc | Tham dự
 *
 * Deploy: Web app → Anyone → copy URL → VITE_RSVP_SCRIPT_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Chỉ 3 cột: Tên | Lời chúc | Tham dự
    sheet.appendRow([
      data.name || '',
      data.wish || '',
      data.attending || 'Không',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: 'rsvp' })
  ).setMimeType(ContentService.MimeType.JSON);
}
