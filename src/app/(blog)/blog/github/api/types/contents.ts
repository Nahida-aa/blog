
// e.g: {{apiBaseUrl}}/repos/{{owner}}/{{repo}}/contents/{{path}}?ref={{branch}}
// branch: default is main
const contents_res_if_dir: Contents_res_if_dir = [
  {
      "name": "[...slug]",
      "path": "src/app/(blog)/aa/[...slug]",
      "sha": "3f274e1ade99057ba0d0b0a48b31e0efff940d0a",
      "size": 0,
      "url": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/[...slug]?ref=main",
      "html_url": "https://github.com/Nahida-aa/blog/tree/main/src/app/(blog)/aa/[...slug]",
      "git_url": "https://api.github.com/repos/Nahida-aa/blog/git/trees/3f274e1ade99057ba0d0b0a48b31e0efff940d0a",
      "download_url": null,
      "type": "dir",
      "_links": {
          "self": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/[...slug]?ref=main",
          "git": "https://api.github.com/repos/Nahida-aa/blog/git/trees/3f274e1ade99057ba0d0b0a48b31e0efff940d0a",
          "html": "https://github.com/Nahida-aa/blog/tree/main/src/app/(blog)/aa/[...slug]"
      }
  },
  {
      "name": "_components",
      "path": "src/app/(blog)/aa/_components",
      "sha": "c0025b38c588334410ffa092939d407a019a24f8",
      "size": 0,
      "url": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/_components?ref=main",
      "html_url": "https://github.com/Nahida-aa/blog/tree/main/src/app/(blog)/aa/_components",
      "git_url": "https://api.github.com/repos/Nahida-aa/blog/git/trees/c0025b38c588334410ffa092939d407a019a24f8",
      "download_url": null,
      "type": "dir",
      "_links": {
          "self": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/_components?ref=main",
          "git": "https://api.github.com/repos/Nahida-aa/blog/git/trees/c0025b38c588334410ffa092939d407a019a24f8",
          "html": "https://github.com/Nahida-aa/blog/tree/main/src/app/(blog)/aa/_components"
      }
  },
  {
      "name": "layout.tsx",
      "path": "src/app/(blog)/aa/layout.tsx",
      "sha": "9739fda993ab78ce3f54bcb5d10e5a5a59b7c961",
      "size": 581,
      "url": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/layout.tsx?ref=main",
      "html_url": "https://github.com/Nahida-aa/blog/blob/main/src/app/(blog)/aa/layout.tsx",
      "git_url": "https://api.github.com/repos/Nahida-aa/blog/git/blobs/9739fda993ab78ce3f54bcb5d10e5a5a59b7c961",
      "download_url": "https://raw.githubusercontent.com/Nahida-aa/blog/main/src/app/(blog)/aa/layout.tsx",
      "type": "file",
      "_links": {
          "self": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/layout.tsx?ref=main",
          "git": "https://api.github.com/repos/Nahida-aa/blog/git/blobs/9739fda993ab78ce3f54bcb5d10e5a5a59b7c961",
          "html": "https://github.com/Nahida-aa/blog/blob/main/src/app/(blog)/aa/layout.tsx"
      }
  },
  {
      "name": "page.tsx",
      "path": "src/app/(blog)/aa/page.tsx",
      "sha": "5fa6f53ed85fc01e1b58ed5685d11ffe0b4d3bd5",
      "size": 2293,
      "url": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/page.tsx?ref=main",
      "html_url": "https://github.com/Nahida-aa/blog/blob/main/src/app/(blog)/aa/page.tsx",
      "git_url": "https://api.github.com/repos/Nahida-aa/blog/git/blobs/5fa6f53ed85fc01e1b58ed5685d11ffe0b4d3bd5",
      "download_url": "https://raw.githubusercontent.com/Nahida-aa/blog/main/src/app/(blog)/aa/page.tsx",
      "type": "file",
      "_links": {
          "self": "https://api.github.com/repos/Nahida-aa/blog/contents/src/app/(blog)/aa/page.tsx?ref=main",
          "git": "https://api.github.com/repos/Nahida-aa/blog/git/blobs/5fa6f53ed85fc01e1b58ed5685d11ffe0b4d3bd5",
          "html": "https://github.com/Nahida-aa/blog/blob/main/src/app/(blog)/aa/page.tsx"
      }
  }
]
type Contents_res_item = {
  name: string
  path: string
  sha: string; // commit sha
  size: number; // 如果是 dir, 则是 0
  url: string; // api json, 对应 file or dif的 content api
  html_url: string; // html, 对应 file or dir 的 github 页面
  git_url: string;
  download_url: string | null // 如果是 dir, 则是 null
  type: string; // file | dir
  _links: {
    self: string; // = url
    git: string; // = git_url
    html: string; // = html_url
  };
}
type Contents_res_if_file = Contents_res_item & {
  content: string; // 默认是 带 \n 的 base64 加密过的 code
  encoding: string; // 默认是 base64
}
type Contents_res_if_dir = Contents_res_item[]
const contents_file_url_res: Contents_res_if_file = {
  "name": "mdx-components.tsx",
  "path": "src/mdx-components.tsx",
  "sha": "adb57f3a2dabe51c490216ef97ea8b8f109a2b7d",
  "size": 167,
  "url": "https://api.github.com/repos/Nahida-aa/blog/contents/src/mdx-components.tsx?ref=main",
  "html_url": "https://github.com/Nahida-aa/blog/blob/main/src/mdx-components.tsx",
  "git_url": "https://api.github.com/repos/Nahida-aa/blog/git/blobs/adb57f3a2dabe51c490216ef97ea8b8f109a2b7d",
  "download_url": "https://raw.githubusercontent.com/Nahida-aa/blog/main/src/mdx-components.tsx",
  "type": "file",
  "content": "aW1wb3J0IHR5cGUgeyBNRFhDb21wb25lbnRzIH0gZnJvbSAnbWR4L3R5cGVz\nJw0KIA0KZXhwb3J0IGZ1bmN0aW9uIHVzZU1EWENvbXBvbmVudHMoY29tcG9u\nZW50czogTURYQ29tcG9uZW50cyk6IE1EWENvbXBvbmVudHMgew0KICByZXR1\ncm4gew0KICAgIC4uLmNvbXBvbmVudHMsDQogIH0NCn0=\n",
  "encoding": "base64",
  "_links": {
    "self": "https://api.github.com/repos/Nahida-aa/blog/contents/src/mdx-components.tsx?ref=main",
    "git": "https://api.github.com/repos/Nahida-aa/blog/git/blobs/adb57f3a2dabe51c490216ef97ea8b8f109a2b7d",
    "html": "https://github.com/Nahida-aa/blog/blob/main/src/mdx-components.tsx"
  }
}
