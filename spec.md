# Store Lab — Premium Watches & Luxury Shoes

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full-screen 3D hero scene using React Three Fiber with floating/rotating luxury watch and shoe models (geometric representations)
- Smooth flowing particle/ribbon animations in the 3D scene background
- Navigation bar with brand logo, nav links (Watches, Shoes, Collections, About)
- Hero section with 3D canvas, tagline, and CTA buttons
- Products section: Watches catalog (listing premium watch products from backend)
- Products section: Shoes catalog (listing luxury shoe products from backend)
- Individual product cards with 3D tilt hover effects
- Featured Collections section with immersive fullscreen scroll-based transitions
- About/Brand section with luxury copy
- Footer with links and brand info
- Smooth scroll transitions between sections
- Backend: product catalog (watches and shoes) with name, price, description, category, imageUrl fields
- Sample seed data for watches and shoes

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Generate Motoko backend with product catalog actor (watches, shoes categories)
2. Build React frontend:
   - Install/use @react-three/fiber, @react-three/drei for 3D
   - Dark luxury design system: deep black/charcoal backgrounds, gold/champagne accent tokens
   - Fonts: Playfair Display (headings) + General Sans (body)
   - Hero: full-screen Three.js Canvas with animated floating 3D objects (abstract watch/shoe silhouettes), particle field, flowing ribbon geometry
   - Animated scroll-based section reveals
   - Product cards with glassmorphism and tilt hover
   - Collections grid
   - Responsive layout
3. Deploy
