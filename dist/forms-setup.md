# Wiring the Partner and Contact Forms

No server is needed. Google Apps Script acts as the form backend.

## 1. Create the Sheet

Create a Google Sheet with this header row:

```text
Timestamp | Form | Name | Company | Email | Phone | Type | Message
```

## 2. Add the Apps Script

In the Sheet, open **Extensions -> Apps Script**, replace the code with:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var d = e.parameter;
  sheet.appendRow([
    new Date(),
    d._form || '',
    d.name || '',
    d.company || '',
    d.email || '',
    d.phone || '',
    d.type || '',
    d.message || ''
  ]);
  return ContentService.createTextOutput('ok');
}
```

## 3. Deploy

Use **Deploy -> New deployment -> Web app**.

- Execute as: **Me**
- Who has access: **Anyone**

Copy the Web app URL. It should look like:

```text
https://script.google.com/macros/s/.../exec
```

## 4. Paste the URL

Open `partner.html` and `contact.html`, find:

```javascript
window.__DOMINUS_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxDMsgQFZ3Jr_4zypdKwmH3TdZ1-b1T8NToc74iwGot3GsaQw5gaPvm6fkrjc0SR8hT/exec';
```

Keep that same Web app URL on both pages.
