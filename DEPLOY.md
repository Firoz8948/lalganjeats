# Deploying Lalganjeats to Vercel

## Step 1 — Create a Neon (free) Postgres database

1. Go to **https://console.neon.tech** and sign up (free tier is plenty)
2. Click **New Project** → name it `lalganjeats`
3. Once created, click **Connection Details** and copy the **Connection string**
   - It looks like: `postgresql://USER:PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`
4. Keep this tab open — you'll need it in Step 3

---

## Step 2 — Push your code to GitHub

```bash
cd lalganjeats
git init   # (if not already done)
git add .
git commit -m "Initial commit — Lalganjeats launch page"
```

Create a new repo on GitHub (e.g. `lalganjeats`) then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lalganjeats.git
git branch -M main
git push -u origin main
```

---

## Step 3 — Deploy on Vercel

1. Go to **https://vercel.com** → New Project
2. Import the `lalganjeats` GitHub repo
3. Under **Environment Variables**, add:
   - `DATABASE_URL` → paste your Neon connection string
4. Click **Deploy** ✅

---

## Step 4 — Run database migration (one-time)

After deploy, run this locally with your real DATABASE_URL set in `.env`:

```bash
# Update .env with your real Neon DATABASE_URL first, then:
npx prisma migrate dev --name init
```

Or if deploying fresh with Vercel, run via Vercel CLI:

```bash
npm i -g vercel
vercel env pull .env.local
npx prisma migrate deploy
```

---

## Step 5 — Add custom domain (lalganjeats.com)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add `lalganjeats.com` and `www.lalganjeats.com`
3. Vercel will give you **DNS records** to add at your domain registrar
4. Add the records (A / CNAME) at wherever you bought the domain
5. SSL is automatic — takes 1–5 minutes ⚡

---

## View registrations

Connect to Neon and run:

```sql
SELECT village, mobile, "createdAt" FROM "Registration" ORDER BY "createdAt" DESC;
```

Or use **Neon's built-in SQL editor** at console.neon.tech → your project → SQL Editor.

To see which villages have the most registrations:

```sql
SELECT village, COUNT(*) as registrations
FROM "Registration"
GROUP BY village
ORDER BY registrations DESC;
```

---

## Local development

```bash
# 1. Set real DATABASE_URL in .env
# 2. Run migrations
npx prisma migrate dev --name init

# 3. Start dev server
npm run dev
```

Open http://localhost:3000
