import { categories } from '@/data/products';

const BASE_URL = 'https://bloomstacksgifts.com';

export default function sitemap() {
  // Static pages
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/faqs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/my-account`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Dynamic category pages
  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic subcategory pages
  const subcategoryPages = categories
    .filter((cat) => cat.subcategories)
    .flatMap((cat) =>
      cat.subcategories.map((sub) => ({
        url: `${BASE_URL}/category/${cat.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    );

  return [...staticPages, ...categoryPages, ...subcategoryPages];
}
