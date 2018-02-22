export function toISOFormatting(strDate) {
  const dateFormatted = new Date(strDate);
  return dateFormatted.toISOString();
}

export function slugify(strUrl) {
  return strUrl
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}