// Path ke database Anda

import db from "@@/database/db";
import { PagesType} from "@@/lib/pages/data/PagesModel";

export const createPage = (page: {
  title: string;
  slug: string;
  content: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  seo_heading: string | null;
  canonical_url: string | null;
  is_published: boolean;
  page_order: number | null;
  created_by: number | null;
}) => {
  const { title, slug, content, featured_image, meta_title, meta_description, meta_keywords, seo_heading, canonical_url, is_published, page_order, created_by } = page;

    // Insert menu baru
    const stmt = db.prepare(`
      INSERT INTO pages (title, slug, content, featured_image, meta_title, meta_description, meta_keywords, seo_heading, canonical_url, is_published, page_order, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      title,
      slug,
      content,
      featured_image,
      meta_title,
      meta_description,
      meta_keywords,
      seo_heading,
      canonical_url,
      is_published,
      page_order,
      created_by
    );

    // Ambil menu yang baru dibuat
    return db.prepare(`SELECT * FROM pages WHERE id = ?`).get(result.lastInsertRowid);
};



export const updatePage = (id: number, updates: {
  title?: string
  slug?: string
  content?: string | null
  featured_image?: string | null
  meta_title?: string | null
  meta_description?: string | null
  meta_keywords?: string | null
  seo_heading?: string | null
  canonical_url?: string | null
  is_published?: boolean
  page_order?: number | null
  created_by?: number | null
}) => {
  const {
    title,
    slug,
    content,
    featured_image,
    meta_title,
    meta_description,
    meta_keywords,
    seo_heading,
    canonical_url,
    is_published,
    page_order,
    created_by
  } = updates;

  // Validasi bahwa menu dengan ID tersebut ada
  const existingPage: PagesType | any = db.prepare(`SELECT * FROM pages WHERE id = ?`).get(id);
  if (!existingPage) {
    throw new Error(`Page with ID ${id} not found.`);
  }

    // Update data menu
    const stmt = db.prepare(`
      UPDATE pages
      SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        content = COALESCE(?, content),
        featured_image = COALESCE(?, featured_image),
        meta_title = COALESCE(?, meta_title),
        meta_description = COALESCE(?, meta_description),
        meta_keywords = COALESCE(?, meta_keywords),
        seo_heading = COALESCE(?, seo_heading),
        canonical_url = COALESCE(?, canonical_url),
        is_published = COALESCE(?, is_published),
        page_order = COALESCE(?, page_order),
        created_by = COALESCE(?, created_by),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      title,
      slug,
      content,
      featured_image,
      meta_title,
      meta_description,
      meta_keywords,
      seo_heading,
      canonical_url,
      is_published,
      page_order,
      created_by,
      id
    );

    // Ambil data yang telah diperbarui
    return db.prepare(`SELECT * FROM pages WHERE id = ?`).get(id);

};
