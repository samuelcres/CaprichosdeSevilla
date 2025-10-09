// Visit categories IDs - actual content is in i18n.ts translations
export const visitCategoryIds = [
  'monuments',
  'museums',
  'nature',
  'neighborhoods',
  'culture',
  'churches',
  'tours',
  'modern',
  'gastronomy',
] as const;

export type VisitCategoryId = typeof visitCategoryIds[number];
