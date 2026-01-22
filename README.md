# Kevin & Wenona's Wedding Website

A beautiful, interactive wedding timeline website built with Next.js.

## Adding Your Hero Image

To add your engagement photo to the header:

1. **Save your image** as `hero-image.jpeg` (or `hero-image.jpg`) in the `public` folder
   - The image should be landscape orientation (wider than it is tall)
   - Recommended size: 1920x600 pixels or similar aspect ratio
   - File format: JPG or PNG

2. **File location**:
   ```
   public/hero-image.jpeg
   ```

3. The image will automatically appear at the top of the page with a gradient overlay at the bottom

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

```bash
npm run build
```

## Deploying

The site is configured to auto-deploy to Vercel when you push to GitHub:

```bash
git add .
git commit -m "Add hero image"
git push
```

## Features

- ✅ Interactive timeline with filtering
- ✅ Mobile responsive design
- ✅ Bridal party schedule toggle
- ✅ Jump to current time
- ✅ Filter by event type (couple/guests/everyone)
- ✅ Saved filter preferences
- ✅ Google Maps integration
- ✅ Hero image header

## Live Site

https://kevinandwenonawedding.com
