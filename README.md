# Generation of Assam Learning — Website

Plain HTML/CSS/JS, ready to push to GitHub and deploy on Netlify (no build step needed — just deploy the folder as-is, publish directory `/`).

## Files
- `index.html` — page structure
- `style.css` — all styling (blue/white/gold theme, dark mode via `[data-theme="dark"]`)
- `script.js` — ebook rendering, search suggestions, filters, counters, theme toggle, mock auth modal

## What's real vs. mocked right now
- Layout, responsive design, dark/light toggle, search suggestions, ebook filtering — fully working.
- Login/Sign Up modal, Buy Now, Preview — UI only, show explanatory alerts. Wire these to:
  - **Firebase Authentication** (Email/Password + Google) for login/signup
  - **Firestore** for ebooks, users, purchase history
  - **Razorpay or Stripe** for payments

## Next steps to add Firebase (when ready)
1. Create a project at https://console.firebase.google.com
2. Add this snippet before `</body>` in `index.html`:
```html
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  const firebaseConfig = { /* paste your config here */ };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
</script>
```
3. Replace `mockLogin()` in `script.js` with real `createUserWithEmailAndPassword` / `signInWithPopup` calls.

## Deploy
- GitHub: push these 3 files to a repo.
- Netlify: "Add new site" → "Import from Git" → select repo → Deploy (no build command needed).
- 
