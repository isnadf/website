# Activities Migration Plan

Complete end-to-end migration plan for activities system to Supabase, learning from news migration experience.

## Overview

Migrate activities from hardcoded `app/activities/data.ts` to Supabase database with full asset management in Supabase Storage.

## Current Structure Analysis

### Data Structure (from `app/activities/data.ts`)
- `id`: number (0-7)
- `title`: { en: string, ar: string }
- `date`: { en: string, ar: string } (formatted dates like "January 1, 2026")
- `location`: { en: string, ar: string }
- `description`: { en: string, ar: string } (short description for cards)
- `full_description`: { en: string, ar: string } (long description with paragraphs)
- `image`: string (main image URL)
- `category`: { en: string, ar: string }
- `featured`: boolean
- `year`: number

### Gallery Images (hardcoded in `components/activity-gallery.tsx`)
- Activity 0 (id: 0): `/1-1-2026/*.jpeg` (8 images)
- Activity 1 (id: 1): `/one/*.jpg` (12 images + 1 video)
- Activity 2 (id: 2): `/two/*.jpg` (14 images)
- Activity 3 (id: 3): `/three/*.jpg` (5 images)
- Activity 4 (id: 4): `/four/*.jpg` (5 images + 1 video)
- Activity 5 (id: 5): `/five/*.jpg` (18 images + 1 video)
- Activity 6 (id: 6): `/six/*.jpg` (3 images + 1 video)
- Activity 7 (id: 7): `/seven/*.jpeg` (2 images)

## Database Schema Design

### Activities Table

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  date_en TEXT NOT NULL,
  date_ar TEXT NOT NULL,
  date_value DATE NOT NULL,
  location_en TEXT NOT NULL,
  location_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  full_description_en TEXT NOT NULL,
  full_description_ar TEXT NOT NULL,
  image TEXT,
  category_en TEXT NOT NULL,
  category_ar TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  year INTEGER NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  gallery_videos TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_activities_slug ON activities(slug);
CREATE INDEX idx_activities_year ON activities(year DESC);
CREATE INDEX idx_activities_featured ON activities(featured) WHERE featured = true;
CREATE INDEX idx_activities_date_value ON activities(date_value DESC);
```

### Storage Bucket

- Bucket: `activities-assets` (public)
- Structure: Store images/videos with same folder structure as public folder

## Implementation Steps

### Phase 1: Database Setup
1. Create `activities` table with all columns
2. Add indexes for performance (slug, year, featured, date_value)
3. Set up RLS policies (public read access)
4. Create `updated_at` trigger
5. Create featured limit trigger (max 3 featured activities)

### Phase 2: Storage Setup
1. Create `activities-assets` bucket (public)
2. Set up storage policies (public read/write/update/delete)
3. Upload all existing assets from public folder to storage
4. Map folder structure:
   - `/1-1-2026/*` → `activities-assets/1-1-2026/*`
   - `/one/*` → `activities-assets/one/*`
   - `/two/*` → `activities-assets/two/*`
   - `/three/*` → `activities-assets/three/*`
   - `/four/*` → `activities-assets/four/*`
   - `/five/*` → `activities-assets/five/*`
   - `/six/*` → `activities-assets/six/*`
   - `/seven/*` → `activities-assets/seven/*`

### Phase 3: Data Migration
1. Extract all 8 activities from `app/activities/data.ts`
2. Generate slugs from titles (URL-friendly)
3. Parse date strings to extract `date_value` (DATE type)
4. Map gallery images/videos from hardcoded arrays in `activity-gallery.tsx`
5. Upload all assets and get Supabase Storage URLs
6. Insert all activities with full URLs

### Phase 4: API Endpoints
1. `GET /api/activities` - List all activities (with filtering)
2. `GET /api/activities/[slug]` - Get single activity by slug
3. `POST /api/activities` - Create new activity
4. `PUT /api/activities/[slug]` - Update activity
5. `DELETE /api/activities/[slug]` - Delete activity
6. `POST /api/activities/upload` - Upload files to storage
7. `PATCH /api/activities/[slug]/featured` - Toggle featured status

### Phase 5: Frontend Updates
1. Update `app/activities/page.tsx`:
   - Remove `activitiesData` import
   - Add `useState` for activities and loading
   - Add `useEffect` to fetch from `/api/activities`
   - Update filtering logic to work with fetched data
   - Update featured section to show "No featured activities" when empty

2. Update `app/activities/[id]/page.tsx`:
   - Change route from `[id]` to `[slug]`
   - Remove `activitiesData` import
   - Add `useState` for activity and loading
   - Add `useEffect` to fetch from `/api/activities/[slug]`
   - Update to use slug instead of numeric ID

3. Update `components/activity-gallery.tsx`:
   - Remove hardcoded image arrays
   - Use `activity.gallery_images` and `activity.gallery_videos` from API
   - Handle Supabase Storage URLs and Mux URLs

4. Update `components/activity-gallery-hero.tsx`:
   - Fetch activities from API instead of props
   - Update to use fetched data

### Phase 6: Type Definitions
1. Create `types/activities.ts`:
   - `Activity` interface matching database schema
   - `ActivityListItem` interface for list view

### Phase 7: Slug Generation
- Convert activity titles to URL-friendly slugs
- Ensure uniqueness
- Examples:
  - "Pulse of Life Scholarship..." → `pulse-of-life-scholarship-gaza-biman`
  - "Isnad Foundation Organizes..." → `isnad-networking-meeting-turkey`

## Key Differences from News Migration

1. **Date Handling**: Activities use formatted date strings (bilingual) + need `date_value` for sorting
2. **Gallery Structure**: Gallery images are per-activity, stored in arrays
3. **Route Change**: Change from `/activities/[id]` to `/activities/[slug]`
4. **No Content Array**: Uses `full_description` (single text field) instead of content array
5. **Year Field**: Activities have explicit `year` field for filtering

## Lessons Learned from News Migration

1. ✅ **Upload assets first, then update database** - Avoids path issues
2. ✅ **Use full Supabase Storage URLs in database** - No path conversion needed
3. ✅ **Create storage bucket and policies before migration** - Prevents permission errors
4. ✅ **Generate slugs properly** - Ensure uniqueness and URL-friendliness
5. ✅ **Update frontend to handle loading/error states** - Better UX
6. ✅ **Featured limit enforcement** - Database trigger + API validation
7. ✅ **Remove all hardcoded data** - Clean migration

## Migration Script Structure

```typescript
// Script will:
1. Read activitiesData from data.ts
2. Read gallery mappings from activity-gallery.tsx
3. Generate slugs for each activity
4. Parse dates to extract date_value
5. Upload all images/videos to storage
6. Build gallery_images and gallery_videos arrays with full URLs
7. Insert all activities into database
```

## Testing Checklist

- [ ] All 8 activities migrated
- [ ] All images uploaded and accessible
- [ ] All videos uploaded and accessible
- [ ] Featured section shows max 3 items
- [ ] Featured section shows "No featured" when empty
- [ ] List page filters work (year, location, search)
- [ ] Detail page loads by slug
- [ ] Gallery displays all images/videos
- [ ] API endpoints work correctly
- [ ] Admin dashboard can create/edit/delete

## File Changes Summary

### New Files
- `types/activities.ts` - Type definitions
- `app/api/activities/route.ts` - List/Create endpoints
- `app/api/activities/[slug]/route.ts` - Get/Update/Delete endpoints
- `app/api/activities/upload/route.ts` - File upload endpoint
- `app/api/activities/[slug]/featured/route.ts` - Featured toggle

### Modified Files
- `app/activities/page.tsx` - Fetch from API
- `app/activities/[id]/page.tsx` → `[slug]/page.tsx` - Fetch from API, use slug
- `components/activity-gallery.tsx` - Use API data for gallery
- `components/activity-gallery-hero.tsx` - Fetch from API

### Deleted Files
- `app/activities/data.ts` - After migration complete

## Timeline Estimate

- Database setup: 5 minutes
- Storage setup: 5 minutes
- Data migration script: 15 minutes
- API endpoints: 20 minutes
- Frontend updates: 30 minutes
- Testing & fixes: 15 minutes

**Total: ~90 minutes**
