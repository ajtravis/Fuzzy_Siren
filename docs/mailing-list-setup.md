# Mailing list → Google Sheet setup

The signup forms on the site POST each email to a tiny Google Apps Script attached to a Google Sheet you own. No third-party service, no cost. One-time setup, about 5 minutes.

## 1. Create the sheet
1. Go to https://sheets.new while signed in to the Google account you want to own the list.
2. Name it **Fuzzy Siren Mailing List** (any name is fine).

## 2. Add the script
1. In the sheet: **Extensions → Apps Script**.
2. Delete whatever is in `Code.gs` and paste the full contents of [`docs/Code.gs`](Code.gs) from this repo.
3. Click the save icon (or Ctrl+S). Name the project if asked.

## 3. Deploy it as a web app
1. Top right: **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Settings:
   - Description: `signup endpoint`
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required so visitors can submit without logging in
4. Click **Deploy**, then **Authorize access** → choose your account → if you see "Google hasn't verified this app", click **Advanced → Go to (project name) (unsafe)** → **Allow**. (It's your own script; this warning is standard.)
5. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy.../exec`.

Open that URL in a browser tab: you should see `{"ok":true,"message":"Fuzzy Siren mailing list endpoint is live."}`.

## 4. Connect the website
Send the Web app URL to Devin, or paste it yourself into `js/main.js`:

```js
var SIGNUP_ENDPOINT = 'https://script.google.com/macros/s/AKfy.../exec';
```

Commit and push; GitHub Pages redeploys in about a minute.

## 5. Test
Submit your own email on the homepage. A **Subscribers** tab appears in the sheet with the timestamp, email, page, and browser. Submitting the same email again is ignored (no duplicates).

## Changing the script later
If you edit `Code.gs` later, you must publish the change: **Deploy → Manage deployments → pencil icon → Version: New version → Deploy**. The URL stays the same.

## Sending to the list
When you're ready to email subscribers, export the **Email** column (File → Download → CSV) into whatever you use (Gmail BCC for a handful, or a free tier of Buttondown / MailerLite / Mailchimp for more). Include an unsubscribe line and remove anyone who asks — the privacy policy promises this.
