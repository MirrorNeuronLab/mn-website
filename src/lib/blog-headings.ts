export type BlogHeading = {
  id: string;
  level: 2 | 3;
  text: string;
};

export function slugifyBlogHeading(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function plainHeadingText(value: string) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .trim();
}

export function getBlogHeadings(source: string): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const pattern = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm;

  for (const match of source.matchAll(pattern)) {
    const text = plainHeadingText(match[2]);
    const id = slugifyBlogHeading(text);

    if (!text || !id) {
      continue;
    }

    headings.push({
      id,
      level: match[1].length as 2 | 3,
      text,
    });
  }

  return headings;
}
