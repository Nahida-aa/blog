import { PostTreeNode } from "@/types/mdx";

const relatedPosts: PostTreeNode[] = [
  {
    slug: "blog",
    metadata: {
      title: "blog with next+mdx+shadui",
      publishedAt: "2023-01-01",
      summary: "Summary of parent post 1",
      svg: "",
      image: "path/to/image1.jpg",
      tags: ["tag1", "tag2"],
      authors: ["Author 1"],
      draft: false
    },
    children: [
      {
        slug: "code-highlight",
        metadata: {
          title: "code-highlight",
          publishedAt: "2023-01-02",
          summary: "Summary of child post 1-1",
          svg: "",
          image: "path/to/image2.jpg",
          tags: ["tag3"],
          authors: ["Author 2"],
          draft: false
        },
        children: []
      },
      {
        slug: "child-post-1-2",
        metadata: {
          title: "Child Post 1-2",
          publishedAt: "2023-01-03",
          summary: "Summary of child post 1-2",
          svg: "",
          image: "path/to/image3.jpg",
          tags: ["tag4"],
          authors: ["Author 3"],
          draft: false
        },
        children: [
          {
            slug: "grandchild-post-1-2-1",
            metadata: {
              title: "Grandchild Post 1-2-1",
              publishedAt: "2023-01-04",
              summary: "Summary of grandchild post 1-2-1",
              svg: "",
              image: "path/to/image4.jpg",
              tags: ["tag5"],
              authors: ["Author 4"],
              draft: false
            },
            children: []
          }
        ]
      }
    ]
  },
  {
    slug: "aa-tree",
    metadata: {
      title: "aa-tree",
      publishedAt: "2023-01-05",
      summary: "Summary of parent post 2",
      svg: "",
      image: "path/to/image5.jpg",
      tags: ["tag6"],
      authors: ["Author 5"],
      draft: false
    },
    children: []
  }
];

export function getRelatedPosts(slug: string) {
  // 这里可以根据实际情况获取相关的文章数据
  console.log(slug)
  return relatedPosts
}

export function getToc(slug: string) {
  // 这里可以根据实际情况获取文章的目录数据
  console.log(slug)
  return [
    { id: 'section-1', title: 'Section 1' },
    { id: 'section-2', title: 'Section 2' },
  ];
}