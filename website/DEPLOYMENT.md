# Deployment Guide for Beacon Landing Page

## Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

### 1. Content Updates
- [ ] Update Twilio number in CTASection.tsx
- [ ] Replace all placeholder images with actual photos
- [ ] Update social media links in Footer.tsx
- [ ] Add actual App Store link
- [ ] Review and update all copy/text

### 2. Configuration
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Configure email newsletter service
- [ ] Add meta tags for SEO
- [ ] Test all links and buttons
- [ ] Test mobile responsiveness

### 3. Performance
- [ ] Optimize images (use WebP format)
- [ ] Test page load speed
- [ ] Check Core Web Vitals
- [ ] Enable caching

## Deployment Options

### Option 1: Vercel (Recommended) ⚡

**Why Vercel?**
- Optimized for Next.js
- Automatic deployments
- Edge network (CDN)
- Free SSL certificates
- Preview deployments

**Steps:**

1. Install Vercel CLI (optional):
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd website
vercel
```

Or connect via GitHub:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Deploy!

**Environment Variables:** (if needed)
```
NEXT_PUBLIC_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_API_URL=your-api-url
```

### Option 2: Netlify 🌐

**Steps:**

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

4. Connect repository and deploy

### Option 3: AWS Amplify 🔶

**Steps:**

1. Push to GitHub/GitLab/Bitbucket
2. Go to AWS Amplify Console
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Base directory: `website`
5. Deploy

### Option 4: Docker 🐳

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

**Build and run:**
```bash
docker build -t beacon-landing .
docker run -p 3000:3000 beacon-landing
```

## Custom Domain Setup

### Vercel
1. Go to project settings
2. Add custom domain
3. Configure DNS:
   - Type: CNAME
   - Name: www (or @)
   - Value: cname.vercel-dns.com

### Netlify
1. Go to domain settings
2. Add custom domain
3. Update DNS:
   - Type: CNAME
   - Name: www
   - Value: [your-site].netlify.app

## SSL/HTTPS

All recommended platforms provide free SSL automatically:
- ✅ Vercel: Automatic
- ✅ Netlify: Automatic
- ✅ AWS Amplify: Automatic

## Performance Optimization

### Image Optimization

1. Use Next.js Image component:
```tsx
import Image from 'next/image'

<Image
  src="/hero-bg.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
/>
```

2. Use WebP format
3. Lazy load images below fold

### Caching

Add headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ]
  },
}
```

### Bundle Size

Analyze bundle:
```bash
npm install @next/bundle-analyzer
```

Update `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // config
})
```

Run analysis:
```bash
ANALYZE=true npm run build
```

## Analytics Setup

### Google Analytics 4

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Plausible (Privacy-friendly alternative)

Add to `app/layout.tsx`:
```tsx
<Script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
/>
```

## SEO Optimization

Update `app/layout.tsx` metadata:

```tsx
export const metadata: Metadata = {
  title: 'Beacon - Your AI Lifeline When Cellular Fails',
  description: 'Emergency intelligence via satellite...',
  keywords: 'satellite messaging, emergency communication...',
  authors: [{ name: 'Beacon Team' }],
  openGraph: {
    title: 'Beacon - Emergency AI Assistant',
    description: '...',
    url: 'https://yourdomain.com',
    siteName: 'Beacon',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beacon - Emergency AI Assistant',
    description: '...',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
}
```

## Monitoring

### Error Tracking

**Sentry:**
```bash
npm install @sentry/nextjs
```

### Uptime Monitoring

- UptimeRobot (free)
- Pingdom
- StatusCake

### Performance Monitoring

- Vercel Analytics (built-in)
- Google PageSpeed Insights
- WebPageTest.org

## Post-Deployment

1. **Test thoroughly:**
   - All links work
   - Forms submit correctly
   - Mobile responsive
   - Cross-browser compatibility

2. **Monitor:**
   - Check analytics daily
   - Review error logs
   - Monitor performance metrics

3. **Iterate:**
   - A/B test CTAs
   - Optimize conversion rate
   - Update content regularly

## Rollback Plan

If something goes wrong:

**Vercel:**
- Go to Deployments
- Find previous working deployment
- Click "Promote to Production"

**Netlify:**
- Go to Deploys
- Find previous deploy
- Click "Publish deploy"

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

---

**Ready to deploy?** Choose a platform and follow the steps above! 🚀

Need help? Check the main README or contact the development team.
