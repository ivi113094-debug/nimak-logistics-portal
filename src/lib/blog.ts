export const getBlogTopicPath = (index: number) => `/blog/topic-${index + 1}`;

export const getBlogTopicIndexFromSlug = (slug?: string) => {
  const match = slug?.match(/^topic-(\d+)$/);
  if (!match) return -1;

  return Number(match[1]) - 1;
};
