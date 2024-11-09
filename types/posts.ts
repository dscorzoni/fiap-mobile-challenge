export type PostData = {
  id?: string,
  title: string,
  content: string,
  date?: Date,
  image?: string
  user: {
    username: string
  }
}

export type Post = PostData  & { author: string }