export type PostData = {
  id?: string,
  title: string,
  content: string,
  date?: Date,
  image?: string
  user: {
    username: string
    email?: string
  }
  user_id?: number
}

export type Post = PostData  & { author: string }