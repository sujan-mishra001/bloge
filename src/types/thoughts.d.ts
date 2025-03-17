export interface Thought {
  title: string;
  content: string;
  formatted_tags?: string[];
}

export interface ThoughtPost extends Thought {
  thought_id: string;
  slug_id: string;
  should_hide?: boolean;
  date_posted: Date;
}
