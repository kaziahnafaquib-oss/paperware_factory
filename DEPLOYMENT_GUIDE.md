# 🚀 Deployment Guide - Paperware Factory

## আপনার ওয়েবসাইট লাইভ করার সহজ উপায় (Bangla)

### ধাপ ১: Vercel অ্যাকাউন্ট তৈরি করুন
1. যান: https://vercel.com/signup
2. GitHub দিয়ে সাইন আপ করুন (সবচেয়ে সহজ)

### ধাপ ২: আপনার কোড GitHub এ আপলোড করুন
```bash
# Terminal এ এই কমান্ডগুলো চালান:
cd "/Users/kazi.ahnaf.aquib/Downloads/Paperware Factory24:01:2026"

# Git repository initialize করুন (যদি এখনো না করে থাকেন)
git init
git add .
git commit -m "Ready for deployment"

# GitHub এ একটি নতুন repository তৈরি করুন, তারপর:
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### ধাপ ৩: Vercel এ Deploy করুন
1. Vercel Dashboard এ যান: https://vercel.com/dashboard
2. "Add New Project" ক্লিক করুন
3. আপনার GitHub repository সিলেক্ট করুন
4. Framework Preset: **Vite** (automatically detected)
5. Build Command: `npm run build` (already set)
6. Output Directory: `dist` (already set)
7. **"Deploy"** বাটনে ক্লিক করুন

### ধাপ ৪: Environment Variables (যদি Supabase ব্যবহার করেন)
Vercel Dashboard এ:
1. Project Settings → Environment Variables
2. এই variables যোগ করুন:
   - `VITE_SUPABASE_URL` = আপনার Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = আপনার Supabase Anon Key

---

## 🚀 Quick Deploy (English)

### Option 1: Deploy with Vercel (Recommended - 2 minutes)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd "/Users/kazi.ahnaf.aquib/Downloads/Paperware Factory24:01:2026"
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **paperware-factory** (or your choice)
- Directory? **./** (press Enter)
- Override settings? **N**

#### Step 3: Production Deployment
```bash
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel Dashboard (No CLI needed)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   # Create a repo on GitHub, then:
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click "Deploy"

---

### Option 3: Deploy to Netlify

#### Create netlify.toml (already configured)
```bash
# Deploy using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

Or drag and drop the `dist` folder to https://app.netlify.com/drop

---

## 🔧 Build Locally First (Test before deploy)

```bash
# Build the production version
npm run build

# Preview the production build locally
npx vite preview
```

Visit `http://localhost:4173` to test the production build.

---

## 📋 Pre-Deployment Checklist

- [x] `vercel.json` configured
- [x] Build command: `npm run build`
- [x] Output directory: `dist`
- [x] Environment variables ready (if needed)
- [ ] Test production build locally: `npm run build && npx vite preview`
- [ ] Push code to GitHub
- [ ] Deploy to Vercel/Netlify

---

## 🌐 Custom Domain (Optional)

After deployment, add your custom domain:

### Vercel:
1. Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Domain Settings → Add custom domain
2. Configure DNS

---

## 🔍 Troubleshooting

### "Page not found" on refresh
✅ **Fixed** - `vercel.json` includes SPA routing configuration

### Build fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment variables not working
- Ensure they start with `VITE_`
- Redeploy after adding variables

---

## 📞 Support

যদি কোনো সমস্যা হয়, আমাকে জানান! (If you face any issues, let me know!)

---

## 🎉 Success!

Once deployed, your site will be live at:
- **Vercel**: `https://your-project.vercel.app`
- **Netlify**: `https://your-project.netlify.app`

You can then add a custom domain like `paperwarefactory.com`
