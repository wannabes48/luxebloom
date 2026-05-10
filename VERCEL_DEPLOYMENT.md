# Vercel Deployment Guide - Luxe Bloom

Your Luxe Bloom project is now ready for production on Vercel. Since you have already pushed the code to GitHub, follow these steps to go live.

## 🚀 Deployment Steps

1. **Connect to Vercel**: 
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **"Add New..."** > **"Project"**.
   - Import the `luxebloom` repository from your GitHub.

2. **Configure Environment Variables**:
   In the "Environment Variables" section of the Vercel setup, add the following keys from your `.env.local`:

   | Key | Value Source |
   |-----|--------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase Settings > API |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Settings > API |
   | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard |
   | `CLOUDINARY_API_KEY` | Cloudinary Dashboard |
   | `CLOUDINARY_API_SECRET` | Cloudinary Dashboard |
   | `RESEND_API_KEY` | Resend Dashboard |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard (Test/Live) |
   | `STRIPE_SECRET_KEY` | Stripe Dashboard (Test/Live) |

3. **Deploy**:
   - Click **"Deploy"**. Vercel will automatically detect Next.js and build the project.

## 🛠️ Post-Deployment Configuration

### 1. Stripe Webhooks (Optional)
Once deployed, you should add your Vercel URL (e.g., `https://luxebloom.vercel.app`) to your Stripe Dashboard under **Webhooks** to listen for successful payments in the future.

### 2. Custom Domain
You can add your custom domain (`luxebloom.com`) in the **Project Settings > Domains** tab on Vercel.

### 3. Authentication Redirects
In your Supabase Dashboard (**Authentication > URL Configuration**), add your production Vercel URL to the "Redirect URLs" list so that Magic Links and password resets work correctly on the live site.

---
**Your site will be live at a `.vercel.app` URL immediately after the build completes!**
