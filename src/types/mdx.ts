export type MdxMetadata = {
  title: string
  created_at?: string
  pushed_at: string
  updated_at: string
  authors: string[] | { name: string;  github: string, twitter: string }[]
  private?: boolean
  svg: string
  image: string
  tags: string[]
  description: string
  draft: boolean
}



export type Post = {
  slug: string;
  content: string;
  metadata: MdxMetadata;
  full_name?: string;
}

export type PostList = Post[]






export type JsonDocMetadataTreeNode = {
  path: string
  metadata: MdxMetadata
  children: JsonDocMetadataTreeNode[]
}
export type JsonDocMetadataTree = JsonDocMetadataTreeNode[]
export type JsonDocTocTreeNode = {
  path: string
  toc: MdTreeToc
  children: JsonDocTocTreeNode[]
}
export type JsonDocTocTree = JsonDocTocTreeNode[]








// export type MdListTocNodeLevel = 1 | 2 | 3 | 4 | 5 | 6
export type MdListTocNode = {
  // level: MdListTocNodeLevel
  level: number
  text: string
  anchor: string // slug_with_cn
  htmlText?: string
}
export type MdListToc = MdListTocNode[]
export type MdTocTreeNode = MdListTocNode & { children: MdTocTreeNode[] }
export type MdTreeToc = MdTocTreeNode[]







export type MdSymbol = {
  name: string
  kind: string // section_1|section_2|...
  ident_start: number
  ident_end: number
  extent_start: number
  extent_end: number
  fully_qualified_name: string
  ident_utf16: {
    start: {
      line_number: number
      utf16_col: number
    }
    end: {
      line_number: number
      utf16_col: number
    }
  }
  extent_utf16: {
    start: {
      line_number: number
      utf16_col: number
    }
    end: {
      line_number: number
      utf16_col: number
    }
  }
}

// export type MdSymbolsNode = {
//   name: string
//   kind: string // section_1|section_2|...
//   ident_start: number
//   fully_qualified_name: string
//   // items: MdSymbolsNode[]
// }

export type ApiMdSymbols = {
  time_out: boolean
  not_analyzed: boolean
  symbols: MdSymbol[]
}