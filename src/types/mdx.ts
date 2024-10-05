export type MdxMetadata = {
  title: string
  publishedAt: string
  tags?: string[]
  authors?: string[]
  draft?: boolean
  summary: string
  svg?: string
  image?: string
}

export interface PostTreeNode {
  slug: string
  metadata: MdxMetadata
  children: PostTreeNode[]
}