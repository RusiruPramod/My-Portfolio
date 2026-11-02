# 🌐 Vercel Deployment & Live Links — Rusiru Pramod Portfolio

මෙම ලේඛනයේ Rusiru Pramod ගේ Portfolio වෙබ් අඩවිය Vercel හරහා deploy කිරීම, live links සහ අදාළ configurations අඩංගු වේ.

---

## 🔗 Quick Links

| Description | Link |
| :--- | :--- |
| **GitHub Repository** | [github.com/RusiruPramod/My-Portfolio](https://github.com/RusiruPramod/My-Portfolio) |
| **1-Click Vercel Deploy** | [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRusiruPramod%2FMy-Portfolio) |
| **Vercel Dashboard** | [vercel.com/dashboard](https://vercel.com/dashboard) |
| **Expected Live URL** | `https://my-portfolio-rusirupramod.vercel.app` <br>*(හෝ Vercel Dashboard එකෙන් ලබාදෙන custom URL එක)* |

---

## 🚀 Vercel වෙත Deploy කරන ආකාරය (Step-by-Step)

### ක්‍රමය 1: Vercel Web Dashboard (නිර්දේශිත)

1. **Vercel වෙත පිවිසෙන්න:** [vercel.com/new](https://vercel.com/new) වෙත ගොස් ඔබගේ GitHub ගිණුමෙන් ලොග් වන්න.
2. **Repository එක Import කරන්න:** **`My-Portfolio`** repository එක තෝරා **Import** ක්ලික් කරන්න.
3. **Project Settings තහවුරු කරන්න:**
   - **Framework Preset:** `Vite` (Auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. **Environment Variables (Optional):**
   - Contact form එක සඳහා Formspree භාවිතා කරන්නේ නම්:
     - `VITE_FORMSPREE_FORM_ID` = `your_form_id`
5. **Deploy ක්ලික් කරන්න:**
   - තත්පර ~60ක් ඇතුළත Live link එකක් (උදා: `https://my-portfolio-rusirupramod.vercel.app`) ජනනය වේ.

---

### ක්‍රමය 2: Terminal / Vercel CLI හරහා

1. **Vercel වෙත ලොග් වන්න:**
   ```powershell
   npx vercel login
   ```
2. **Project එක Deploy කරන්න (Preview):**
   ```powershell
   npx vercel
   ```
3. **Production Live Deploy කරන්න:**
   ```powershell
   npx vercel --prod
   ```

---

## ⚙️ Configuration Details (`vercel.json`)

වෙබ් අඩවිය Single Page Application (SPA) එකක් බැවින් routing ගැටළු මඟහරවා ගැනීමට `vercel.json` පහත පරිදි සකසා ඇත:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 📌 Features & Updates Included
- **Profile:** Rusiru Pramod (Software Engineer & IoT Specialist)
- **Top 6 Projects:** Featured projects with GitHub & demo links
- **Education:** Siddhartha College, Weligama & Uva Wellassa University of Sri Lanka
- **Contact:** Smooth-scroll contact link with email & social links
- **Download CV:** Linked directly to `/cv.pdf`
