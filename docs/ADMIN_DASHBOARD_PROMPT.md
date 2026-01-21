# Prompt for Adapting Metronic Admin Dashboard Template

Use this prompt in Cursor to adapt your Metronic admin dashboard template for news management:

---

## Prompt Text

I have a Metronic admin dashboard template and I want to adapt it for managing news articles. **IMPORTANT: Keep the existing Metronic UI design - do NOT create new UI components. Just adapt the existing template pages and forms.**

### Context
- I have a Next.js application with a news system
- All API endpoints are ready and documented in `docs/NEWS_API_DOCUMENTATION.md`
- I want to use the existing Metronic template UI but change labels, field names, and connect it to my news API

### What I Need

1. **News List Page** (adapt existing table/list page):
   - Show all news articles in a table/grid
   - Columns: Image thumbnail, Title, Category, Date, Featured status, Actions (Edit/Delete)
   - Add "Create New" button
   - Connect to `GET /api/news` endpoint
   - Use existing Metronic table component

2. **Create/Edit News Form** (adapt existing form page):
   - Use existing Metronic form components and layout
   - Keep the same form structure and styling
   - Just change field labels and add/remove fields as needed

   **Required Input Fields:**
   - Slug (text input, required)
   - Title English (text input, required)
   - Title Arabic (text input, required)
   - Excerpt English (textarea, required) - subtitle for card
   - Excerpt Arabic (textarea, required) - subtitle for card
   - Content English (rich text editor or textarea with multiple paragraphs, required)
   - Content Arabic (rich text editor or textarea with multiple paragraphs, required)
   - Date (date picker, required, format: YYYY-MM-DD)
   - Author (text input, optional, default: "Isnad Foundation")
   - Category English (text input or select, required)
   - Category Arabic (text input or select, required)
   - Featured checkbox (optional, max 3 can be featured)

   **Image/Video Upload Fields:**
   - Card Image (file upload, shows preview, connects to `/api/news/upload`)
   - Hero Image (file upload, shows preview, connects to `/api/news/upload`)
   - Hero Video URL (text input for Mux URL or file upload)
   - Gallery Images (multiple file upload, shows previews, connects to `/api/news/upload`)
   - Gallery Videos (multiple file upload or URL inputs, supports Mux URLs)

   **Form Behavior:**
   - On file upload, call `POST /api/news/upload` and store the returned URL
   - On submit:
     - Create: `POST /api/news` with all form data
     - Update: `PUT /api/news/[slug]` with form data
   - Show validation errors from API
   - Show success message and redirect to list page

3. **Featured Management** (adapt existing toggle/switch component):
   - Add featured toggle switch in the list table
   - When toggled, call `PATCH /api/news/[slug]/featured` with `{ featured: true/false }`
   - Show error if trying to feature more than 3 items
   - Use existing Metronic switch/toggle component

4. **Delete Functionality** (adapt existing delete button/modal):
   - Add delete button in actions column
   - Show confirmation modal (use existing Metronic modal)
   - On confirm, call `DELETE /api/news/[slug]`
   - Refresh list after deletion

### API Endpoints Reference

All endpoints are documented in `docs/NEWS_API_DOCUMENTATION.md`. Key endpoints:

- `GET /api/news` - List all news
- `GET /api/news/[slug]` - Get single article
- `POST /api/news` - Create article
- `PUT /api/news/[slug]` - Update article
- `DELETE /api/news/[slug]` - Delete article
- `POST /api/news/upload` - Upload file (returns URL)
- `PATCH /api/news/[slug]/featured` - Toggle featured status

### Important Guidelines

1. **Keep Existing UI**: Use Metronic's existing components, layouts, forms, tables, modals, etc. Don't create new UI elements.

2. **Change Labels Only**: 
   - Change "Users" → "News Articles"
   - Change "Products" → "News Articles"  
   - Change "Orders" → "News Articles"
   - Adapt field labels to match news fields (Title, Content, Category, etc.)

3. **Bilingual Support**: 
   - Show both English and Arabic fields side by side or in tabs
   - Use existing Metronic form layout for bilingual inputs

4. **File Upload**: 
   - Use existing Metronic file upload component
   - After upload, store the returned URL from API
   - Show image previews using existing Metronic preview component

5. **Rich Text Editor**: 
   - Use existing Metronic rich text editor (if available) for content fields
   - Or use textarea with paragraph support for content arrays

6. **Validation**: 
   - Use existing Metronic form validation
   - Show API error messages in existing error display components

7. **Data Format**:
   - Content fields are arrays: `["Paragraph 1", "Paragraph 2"]`
   - Gallery images/videos are arrays of URLs
   - Date format: `YYYY-MM-DD`

### What to Do

1. Find the most similar page in Metronic template (probably a CRUD page for users/products/orders)
2. Copy that page structure
3. Change all labels and field names to match news article fields
4. Connect form inputs to the news API endpoints
5. Keep all existing Metronic styling, components, and layout
6. Add file upload functionality using existing upload component
7. Implement featured toggle using existing switch component

### Example Field Mapping

If Metronic has a "Users" page with:
- Name → Title English / Title Arabic
- Email → Excerpt English / Excerpt Arabic  
- Description → Content English / Content Arabic
- Role → Category English / Category Arabic
- Avatar → Card Image / Hero Image
- Created Date → Date

Just adapt these mappings and add the additional fields needed for news.

---

## Additional Notes

- The template should work with the existing API structure
- All file uploads go to Supabase Storage via `/api/news/upload`
- Featured articles have a limit of 3 (enforced by API)
- Support both regular video files and Mux streaming URLs
- Use existing Metronic components for everything - no custom UI needed
