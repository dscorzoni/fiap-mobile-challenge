export type PostData = {
  id?: string,
  title: string,
  content: string,
  date?: Date,
  image?: string

}

export type Post = PostData  & { author: string }