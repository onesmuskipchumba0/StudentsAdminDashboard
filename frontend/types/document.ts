export interface Document {
  _id: string;
  name: string;
  type: string;
  size: string;
  owner: string;
  shared: boolean;
  starred: boolean;
  tags: string[];
  url: string;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentStats {
  totalDocuments: number;
  totalSize: string;
  documentsByType: {
    [key: string]: number;
  };
  popularTags: {
    tag: string;
    count: number;
  }[];
} 