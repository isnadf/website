# News API Documentation

Complete API documentation for managing news articles in the admin dashboard.

## Table of Contents
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [File Upload](#file-upload)
- [Featured Management](#featured-management)
- [Examples](#examples)

---

## Database Schema

### News Table Structure

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | UUID | Auto | Unique identifier (auto-generated) |
| `slug` | TEXT | Yes | URL-friendly identifier (unique) |
| `title_en` | TEXT | Yes | English title |
| `title_ar` | TEXT | Yes | Arabic title |
| `excerpt_en` | TEXT | Yes | English subtitle/excerpt (for card) |
| `excerpt_ar` | TEXT | Yes | Arabic subtitle/excerpt (for card) |
| `content_en` | TEXT[] | Yes | English content paragraphs (array) |
| `content_ar` | TEXT[] | Yes | Arabic content paragraphs (array) |
| `date` | DATE | Yes | Publication date (YYYY-MM-DD) |
| `author` | TEXT | No | Author name (default: "Isnad Foundation") |
| `category_en` | TEXT | Yes | English category/tag |
| `category_ar` | TEXT | Yes | Arabic category/tag |
| `image` | TEXT | No | Card image URL (Supabase Storage URL) |
| `hero_image` | TEXT | No | Hero image URL for detail page |
| `hero_video` | TEXT | No | Hero video URL (supports Mux URLs) |
| `gallery_images` | TEXT[] | No | Array of gallery image URLs |
| `gallery_videos` | TEXT[] | No | Array of gallery video URLs (supports Mux URLs) |
| `featured` | BOOLEAN | No | Featured status (max 3 can be true) |
| `created_at` | TIMESTAMP | Auto | Creation timestamp |
| `updated_at` | TIMESTAMP | Auto | Last update timestamp |

### Field Usage

- **Card Display** (News List Page):
  - `image` - Small image shown on card
  - `title_en` / `title_ar` - Card title
  - `excerpt_en` / `excerpt_ar` - Card subtitle
  - `date` - Publication date
  - `category_en` / `category_ar` - Category badge

- **Detail Page** (Slug Page):
  - `hero_image` - Large hero image at top
  - `hero_video` - Hero video (optional, supports Mux)
  - `title_en` / `title_ar` - Page title
  - `content_en` / `content_ar` - Main content paragraphs
  - `gallery_images` - Image gallery
  - `gallery_videos` - Video gallery (supports Mux URLs)

---

## API Endpoints

Base URL: `/api/news`

### 1. List All News

**GET** `/api/news`

Get a list of all news articles.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `featured` | string | - | Filter by featured status (`"true"` or `"false"`) |
| `limit` | number | 100 | Maximum number of items to return |
| `offset` | number | 0 | Number of items to skip |

#### Response

```json
[
  {
    "id": "uuid",
    "slug": "article-slug",
    "title": {
      "en": "English Title",
      "ar": "العنوان بالعربية"
    },
    "excerpt": {
      "en": "English excerpt for card",
      "ar": "ملخص بالعربية للبطاقة"
    },
    "date": "2025-01-20",
    "image": "https://elmborcyvhcrzqcirasl.supabase.co/storage/v1/object/public/news-assets/image.jpg",
    "href": "/news/article-slug",
    "category": {
      "en": "Category",
      "ar": "الفئة"
    },
    "featured": false
  }
]
```

#### Example

```javascript
// Get all news
const response = await fetch('/api/news');
const news = await response.json();

// Get only featured news
const featuredResponse = await fetch('/api/news?featured=true');
const featuredNews = await featuredResponse.json();
```

---

### 2. Get Single News Article

**GET** `/api/news/[slug]`

Get a single news article by slug.

#### Response

```json
{
  "title": {
    "en": "English Title",
    "ar": "العنوان بالعربية"
  },
  "date": "2025-01-20",
  "author": "Isnad Foundation",
  "category": {
    "en": "Category",
    "ar": "الفئة"
  },
  "image": "https://...card-image.jpg",
  "heroImage": "https://...hero-image.jpg",
  "heroVideo": "https://stream.mux.com/...",
  "galleryImages": [
    "https://...image1.jpg",
    "https://...image2.jpg"
  ],
  "galleryVideos": [
    "https://...video1.mp4",
    "https://stream.mux.com/..."
  ],
  "content": {
    "en": [
      "First paragraph in English",
      "Second paragraph in English"
    ],
    "ar": [
      "الفقرة الأولى بالعربية",
      "الفقرة الثانية بالعربية"
    ]
  }
}
```

#### Example

```javascript
const response = await fetch('/api/news/article-slug');
const article = await response.json();
```

---

### 3. Create News Article

**POST** `/api/news`

Create a new news article.

#### Request Body

```json
{
  "slug": "unique-article-slug",
  "title_en": "English Title",
  "title_ar": "العنوان بالعربية",
  "excerpt_en": "English excerpt for card",
  "excerpt_ar": "ملخص بالعربية للبطاقة",
  "content_en": [
    "First paragraph in English",
    "Second paragraph in English"
  ],
  "content_ar": [
    "الفقرة الأولى بالعربية",
    "الفقرة الثانية بالعربية"
  ],
  "date": "2025-01-20",
  "author": "Isnad Foundation",
  "category_en": "Category",
  "category_ar": "الفئة",
  "image": "https://...card-image.jpg",
  "hero_image": "https://...hero-image.jpg",
  "hero_video": "https://stream.mux.com/...",
  "gallery_images": [
    "https://...image1.jpg",
    "https://...image2.jpg"
  ],
  "gallery_videos": [
    "https://...video1.mp4",
    "https://stream.mux.com/..."
  ],
  "featured": false
}
```

#### Required Fields

- `slug` (must be unique)
- `title_en`
- `title_ar`
- `date` (format: YYYY-MM-DD)

#### Optional Fields

- `excerpt_en` (default: empty string)
- `excerpt_ar` (default: empty string)
- `content_en` (default: empty array)
- `content_ar` (default: empty array)
- `author` (default: "Isnad Foundation")
- `category_en`
- `category_ar`
- `image`
- `hero_image`
- `hero_video`
- `gallery_images` (default: empty array)
- `gallery_videos` (default: empty array)
- `featured` (default: false)

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "unique-article-slug",
    ...
  }
}
```

#### Error Response

```json
{
  "error": "Error message"
}
```

#### Example

```javascript
const response = await fetch('/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    slug: 'new-article-slug',
    title_en: 'New Article',
    title_ar: 'مقال جديد',
    excerpt_en: 'Article excerpt',
    excerpt_ar: 'ملخص المقال',
    content_en: ['Paragraph 1', 'Paragraph 2'],
    content_ar: ['فقرة 1', 'فقرة 2'],
    date: '2025-01-20',
    category_en: 'News',
    category_ar: 'أخبار',
    image: 'https://...image.jpg',
    featured: false
  })
});

const result = await response.json();
```

---

### 4. Update News Article

**PUT** `/api/news/[slug]`

Update an existing news article. All fields are optional - only provided fields will be updated.

#### Request Body

Same structure as POST, but all fields are optional.

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "article-slug",
    ...
  }
}
```

#### Example

```javascript
const response = await fetch('/api/news/article-slug', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title_en: 'Updated Title',
    featured: true
  })
});

const result = await response.json();
```

---

### 5. Delete News Article

**DELETE** `/api/news/[slug]`

Delete a news article.

#### Response

```json
{
  "success": true
}
```

#### Example

```javascript
const response = await fetch('/api/news/article-slug', {
  method: 'DELETE'
});

const result = await response.json();
```

---

## File Upload

### Upload File to Storage

**POST** `/api/news/upload`

Upload a file (image or video) to Supabase Storage.

#### Request

Use `FormData` with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | The file to upload |
| `path` | string | No | Custom path in storage (default: filename) |

#### Response

```json
{
  "success": true,
  "url": "https://elmborcyvhcrzqcirasl.supabase.co/storage/v1/object/public/news-assets/path/to/file.jpg",
  "path": "path/to/file.jpg"
}
```

#### Example

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('path', '2025-01-20/image.jpg'); // Optional custom path

const response = await fetch('/api/news/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
// Use result.url in your news article
```

#### Storage Structure

Files are stored in the `news-assets` bucket. Recommended structure:
- `YYYY-MM-DD/image.jpg` - Date-based folders
- `gallery/image1.jpg` - Gallery images
- `videos/video1.mp4` - Videos

---

## Featured Management

### Toggle Featured Status

**PATCH** `/api/news/[slug]/featured`

Toggle or set the featured status of a news article.

**Important**: Maximum 3 news items can be featured at once.

#### Request Body

```json
{
  "featured": true
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "article-slug",
    "featured": true,
    ...
  }
}
```

#### Error Response (if limit exceeded)

```json
{
  "error": "Maximum 3 news items can be featured. Unfeature another item first."
}
```

#### Example

```javascript
// Feature an article
const response = await fetch('/api/news/article-slug/featured', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    featured: true
  })
});

const result = await response.json();

// Unfeature an article
const unfeatureResponse = await fetch('/api/news/article-slug/featured', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    featured: false
  })
});
```

---

## Examples

### Complete Workflow: Create News with Images

```javascript
// 1. Upload card image
const cardImageFormData = new FormData();
cardImageFormData.append('file', cardImageFile);
cardImageFormData.append('path', '2025-01-20/card.jpg');
const cardImageResponse = await fetch('/api/news/upload', {
  method: 'POST',
  body: cardImageFormData
});
const { url: cardImageUrl } = await cardImageResponse.json();

// 2. Upload hero image
const heroImageFormData = new FormData();
heroImageFormData.append('file', heroImageFile);
heroImageFormData.append('path', '2025-01-20/hero.jpg');
const heroImageResponse = await fetch('/api/news/upload', {
  method: 'POST',
  body: heroImageFormData
});
const { url: heroImageUrl } = await heroImageResponse.json();

// 3. Upload gallery images
const galleryImageUrls = [];
for (const file of galleryImageFiles) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', `2025-01-20/gallery/${file.name}`);
  const response = await fetch('/api/news/upload', {
    method: 'POST',
    body: formData
  });
  const { url } = await response.json();
  galleryImageUrls.push(url);
}

// 4. Create news article
const newsResponse = await fetch('/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    slug: 'new-article-2025-01-20',
    title_en: 'New Article Title',
    title_ar: 'عنوان المقال الجديد',
    excerpt_en: 'Short description for card',
    excerpt_ar: 'وصف قصير للبطاقة',
    content_en: [
      'First paragraph of content',
      'Second paragraph of content'
    ],
    content_ar: [
      'الفقرة الأولى من المحتوى',
      'الفقرة الثانية من المحتوى'
    ],
    date: '2025-01-20',
    category_en: 'News',
    category_ar: 'أخبار',
    image: cardImageUrl,
    hero_image: heroImageUrl,
    gallery_images: galleryImageUrls,
    featured: false
  })
});

const news = await newsResponse.json();
```

### Update Article with Videos

```javascript
// Update article with Mux video URLs
const response = await fetch('/api/news/article-slug', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    hero_video: 'https://stream.mux.com/VIDEO_ID.m3u8',
    gallery_videos: [
      'https://stream.mux.com/VIDEO1_ID.m3u8',
      'https://stream.mux.com/VIDEO2_ID.m3u8'
    ]
  })
});
```

---

## Validation Rules

1. **Slug**: Must be unique, URL-friendly (lowercase, hyphens, no spaces)
2. **Date**: Format must be `YYYY-MM-DD`
3. **Featured**: Maximum 3 articles can be featured at once
4. **Required Fields**: `slug`, `title_en`, `title_ar`, `date` are required for creation
5. **Image URLs**: Should be full Supabase Storage URLs or Mux URLs for videos
6. **Arrays**: `content_en`, `content_ar`, `gallery_images`, `gallery_videos` are arrays

---

## Error Handling

All endpoints return standard HTTP status codes:

- `200` - Success (GET, PUT, PATCH)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found (article doesn't exist)
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

---

## Notes

1. **Bilingual Support**: All text fields have `_en` and `_ar` versions
2. **Video Support**: Supports both regular video files and Mux streaming URLs
3. **Featured Limit**: Database trigger enforces maximum 3 featured items
4. **Storage**: All files are stored in Supabase Storage bucket `news-assets`
5. **Public Access**: Storage bucket is public, URLs are accessible directly
6. **Auto Fields**: `id`, `created_at`, `updated_at` are auto-generated

---

## Quick Reference

| Action | Method | Endpoint | Body |
|--------|--------|----------|------|
| List news | GET | `/api/news` | - |
| Get article | GET | `/api/news/[slug]` | - |
| Create article | POST | `/api/news` | JSON |
| Update article | PUT | `/api/news/[slug]` | JSON |
| Delete article | DELETE | `/api/news/[slug]` | - |
| Upload file | POST | `/api/news/upload` | FormData |
| Toggle featured | PATCH | `/api/news/[slug]/featured` | JSON |
