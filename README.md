# Khanya Solar (front end)
React + Vite web app. Run: `npm install` then `npm run dev`. Build: `npm run build`.
Brand, contacts and supplier/engineering attribution: `src/data/siteConfig.js`. Colours and type: `src/styles/theme.css`.
Product data is demo data (`src/data/demoProducts.js`); prices are empty until Hanchu confirms them.
Admin, cart, forms, system wizard and the mock/API service layer folders are scaffolded and empty.

## Admin (demo)
Copy `.env.example` to `.env`, set `VITE_DEMO_ADMIN_EMAIL` and `VITE_DEMO_ADMIN_PASSWORD`, restart `npm run dev`, then open `/admin`.
This login is for demonstrations only. Records and product edits are stored in the browser; production authentication and storage come from the backend.
