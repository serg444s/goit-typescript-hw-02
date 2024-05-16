export interface Image {
  id: string;
  color: string;
  alt_description: string;
  description: string;
  likes: number;
  total_pages: number;
  urls: {
    small: string;
    regular: string;
  };
}
