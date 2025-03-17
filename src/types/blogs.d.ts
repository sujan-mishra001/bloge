export interface Blog {
  title: string;
  content: string;
  formatted_tags?: string[];
  title_image_url?: string | null;
  formatted_additional_img_url?: string[] | null;
}

export interface BlogPost extends Blog {
  blog_id: string;
  slug_id: string;
  should_hide?: boolean;
  created_at: Date;
  updated_at: Date;
}
