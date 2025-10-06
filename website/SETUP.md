# Beacon Landing Page - Quick Setup Guide

## 🚀 Quick Start

Follow these steps to get the landing page running:

### 1. Install Dependencies

```bash
cd website
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Other required packages

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📋 Customization Checklist

Before deploying, update these items:

### Required Changes

- [ ] **Update Twilio Number** in `components/sections/CTASection.tsx`
  ```typescript
  const twilioNumber = '+YOUR_ACTUAL_NUMBER'
  ```

- [ ] **Replace Placeholder Images**
  - Hero background (mountain/wilderness)
  - Problem section (hiker in distress)
  - Use case images (4 scenarios)
  - App screenshots (from your iOS app)

- [ ] **Update Footer Links**
  - Social media links
  - Company links
  - Legal pages

### Optional Enhancements

- [ ] Add Google Analytics
- [ ] Set up email newsletter integration
- [ ] Add actual App Store link
- [ ] Create legal pages (Privacy, Terms)
- [ ] Add meta tags for SEO
- [ ] Set up custom domain

## 🎨 Key Features Implemented

✅ **Hero Section** - Parallax background with sparkles effect  
✅ **Problem Statement** - Animated stats with scroll triggers  
✅ **Solution Overview** - 4-step timeline with animations  
✅ **Features Grid** - Bento grid layout with hover effects  
✅ **Comparison Table** - Competitors vs Beacon  
✅ **Use Cases** - 4 scenario cards with images  
✅ **Tech Stack** - Animated architecture diagram  
✅ **Screenshots** - iPhone mockups carousel  
✅ **Stats Section** - Animated counters  
✅ **Safety Notice** - Important disclaimer  
✅ **CTA Section** - Interactive message demo  
✅ **Footer** - Links and newsletter signup  

## 🎯 Aceternity Components Used

- ✨ **SparklesCore** - Hero and CTA backgrounds
- 🎴 **BentoGrid** - Features section layout
- 🔄 **InfiniteMovingCards** - Ready for testimonials
- ⚡ **AnimatedBeam** - Tech stack connections
- 🎭 **Framer Motion** - All animations and transitions

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Scheme

Primary colors defined in `tailwind.config.js`:
- **Beacon Blue**: `#1e40af`
- **Beacon Purple**: `#7c3aed`
- **Beacon Orange**: `#f97316`
- **Beacon Dark**: `#0f172a`

## 🚢 Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### AWS/Custom Server
1. Build: `npm run build`
2. Start: `npm start`
3. Configure reverse proxy (nginx)

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Missing Dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npm run lint
```

## 📚 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons (via SVG)
- **Fonts**: Inter (Google Fonts)

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 💡 Pro Tips

1. **Performance**: Lazy load images below the fold
2. **SEO**: Add proper meta tags and alt text
3. **Analytics**: Integrate GA4 for tracking
4. **A/B Testing**: Test different CTA variations
5. **Feedback**: Add hotjar or similar for user insights

## 📞 Support

Questions? Check:
- Project README
- Next.js documentation
- Tailwind CSS docs

---

**Ready to launch?** Run `npm run build` and deploy! 🚀
