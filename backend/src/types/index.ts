export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  created_at: Date;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category_id: number;
  level: "iniciante" | "intermediario";
  thumbnail_url: string;
  created_at: Date;
}

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  video_url: string;
  duration: string;
  order_index: number;
  created_at: Date;
}

export interface CourseWithCategory extends Course {
  category_name: string;
  lesson_count: number;
}

export interface CourseDetail extends Course {
  category_name: string;
  lessons: Lesson[];
}
