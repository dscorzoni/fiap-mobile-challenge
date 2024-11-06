export type Role = 'student' | 'teacher' | 'admin';

export type Result<T> = 
  | { success: true; value: T }
  | { success: false; error: string };
