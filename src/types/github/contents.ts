

type Contents_file_url_res={
  name: string;
  path: string;
  sha: string; // commit sha
  size: number;
  url: string; // api json
  html_url: string; // html
  git_url: string;
  download_url: string;
  type: string; // file | dir
  content: string; // 默认是 带 \n 的 base64 加密过的 code
  encoding: string; // 默认是 base64
  _links: {
    self: string;
    git: string;
    html: string;
  };
}
