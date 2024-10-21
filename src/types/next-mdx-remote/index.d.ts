// src/types/next-mdx-remote/index.d.ts
import { CompileOptions } from '@mdx-js/mdx';

export interface SerializeOptions {
  scope?: Record<string, unknown>;
  mdxOptions?: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'> & {
    useDynamicImport?: boolean;
  };
  parseFrontmatter?: boolean;
}

export type MDXRemoteSerializeResult<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>> = {
  compiledSource: string;
  scope: TScope;
  frontmatter: TFrontmatter;
};