export interface Level2Category {
  id: number;
  name: string;
  items: string[];
}

export interface MainCategoryType {
  categoryId: string;
  categoryName: string;
  level: number;
  level2Category: Level2Category[];
}
