# Welcome Homes WA

## Project Overview
- **Name**: Welcome Homes WA
- **Goal**: Professional website for a custom home builder in Perth, WA to generate enquiries and build credibility
- **Stack**: React 19 + Vite 7 + Tailwind CSS v4 + Motion (Framer Motion) + React Router v7
- **Design**: Minimal, light, spacious with warm neutral palette. Mobile-first responsive.

## Features
- **6 Full Pages** with premium scroll animations
- **Mobile-First Typography System** with root font-size scaling across breakpoints
- **Smooth Page Transitions** with AnimatePresence
- **Parallax Scroll Effects** on hero sections and image breaks
- **Reveal-on-Scroll Animations** throughout all pages
- **Responsive Design** optimised for mobile, tablet, and desktop
- **Image Lightbox** on project detail pages
- **Lead Generation Form** with validation

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, stats, what we build, why choose us, featured projects, testimonials, CTA |
| `/about` | About/Our Story | Founder story, philosophy, why custom builds, YouTube embed |
| `/services` | Services | Custom Homes (primary) + Development/Multi-lot (secondary) |
| `/projects` | Projects | Filterable project grid |
| `/projects/:id` | Project Detail | Individual project pages with gallery, details, lightbox |
| `/testimonials` | Testimonials | Featured quote, all testimonials, video testimonial placeholders |
| `/contact` | Start Your Build | Lead generation form with sidebar info |

## Design System

### Typography (Mobile-First Root Scaling)
- **Mobile (< 640px)**: 14px root
- **Tablet (640px+)**: 15px root
- **Desktop (1024px+)**: 16px root
- **Large (1440px+)**: 17px root

### Colour Palette
- **Warm tones**: #fdfcfb through #6b5e4c (backgrounds, accents)
- **Charcoal**: #f6f6f7 through #1a1b1f (text, dark sections)
- **Accent**: #8a7a66 (warm gold/brown)

### Fonts
- **Inter** - Variable weight, via Google Fonts

## URLs
- **Preview**: `http://localhost:3000`

## Data Architecture
- All content managed in `src/data/siteData.js`
- 6 sample projects with multiple images
- 5 client testimonials
- Services data with features and process steps

## Deployment
- **Platform**: Vite (React SPA)
- **Status**: Running
- **Last Updated**: 2026-03-08
