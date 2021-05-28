export function Seo({ title }) {
  document.title = title ? `${title} – COVID v obcích` : `COVID v obcích`;
  return null;
}
