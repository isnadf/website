# Homepage Dynamic Content (Dashboard Contract)

This document defines what is currently dynamic on the homepage and what the dashboard should manage.

## Dynamic Sections on Homepage

The homepage fetches data from `GET /api/home`.

### 1) Hero Text
Source table: `public.home_hero`  
Dynamic fields:
- `banner_en`, `banner_ar`
- `heading_en`, `heading_ar`
- `subheading_en`, `subheading_ar`
- `description_en`, `description_ar`

Notes:
- Hero button labels are **not dynamic**.
- Hero button labels come from translations in the web app.

### 2) Hero Slider Images
Source table: `public.home_hero_images`  
Dynamic fields:
- `image` (must be full public URL)
- `alt_en`, `alt_ar`
- `display_order` (controls slide order)

Storage bucket for images:
- `home-hero-images`

### 3) Campaign Cards (Homepage)
Source table: `public.home_campaigns`  
Homepage includes only campaigns where:
- `is_featured = true`
- and returns max `3` cards

Dynamic fields used:
- `slug`
- `title_en`, `title_ar`
- `tagline_en`, `tagline_ar`
- `description_en`, `description_ar`
- `image` (must be full public URL)
- `pdf` (must be full public URL)
- `paid`
- `left_amount`
- `goal`
- `display_order` (ordering among featured records)
- `is_featured` (homepage inclusion flag)

Storage buckets:
- Campaign images: `home-campaign-images`
- Campaign PDFs: `home-campaign-pdfs`

### 4) Partners
Source table: `public.home_partners`  
Dynamic fields:
- `name`
- `logo` (must be full public URL)
- `type_en`, `type_ar`

Storage bucket:
- `home-partner-logos`

## Not Dynamic on Homepage

- Hero button labels (Donate / Quick Donate) are static translation-based.
- Homepage contact block is static translation-based.
- `home_contact` table is removed and not used.
- Partner special flag / ordering fields are removed and not used.

## URL Storage Rule (Important)

For media fields, store full public URLs in DB columns:
- `home_hero_images.image`
- `home_campaigns.image`
- `home_campaigns.pdf`
- `home_partners.logo`

Do not store local `/public/...` paths in these columns.

## Homepage Campaign Selection Rule

To control which campaigns appear on homepage:
1. Set `is_featured = true` for campaigns to show.
2. Keep at most 3 featured campaigns (homepage API already enforces max 3).
3. Use `display_order` to control featured campaign order.
