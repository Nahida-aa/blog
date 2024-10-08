import { FC } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, History as HistoryIco, Star } from 'lucide-react';
import { MdxMetadata } from '@/types/mdx';

interface InfoProps {
  blog_path: string;
  metadata: MdxMetadata
}
const Info: FC<InfoProps> = ({ blog_path, metadata }) => {
  return(
    <Card className="mb-4">
      <CardContent className=" p-6 w-full">
        <div className="flex justify-between ">
          <div className="space-y-2 flex-grow">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">
                <Link href={`/${blog_path}`} className="hover:underline glow-cyan">
                  {metadata.title}
                </Link>
              </h3>
              <Badge variant="outline">
                {/* {metadata.private===true?'Private':'Public'} */}
                Public
              </Badge>
            </div>
            {/* {metadata?.fork && (
              <p className="text-sm text-muted-foreground">
                Forked from{' '}
                <Link href={metadata.parent__html_url} className="hover:underline">
                  {metadata.parent__full_name}
                </Link>
              </p>
            )} */}
            <p className="text-sm text-muted-foreground">{metadata.description}</p>
            {/* <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tags/${tag.name}`}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div> */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {/* {metadata.language && (
                <span className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-1"
                    style={{
                      backgroundColor:
                        languageColors[repoInfo.programmingLanguage] || '#ccc',
                    }}
                  ></span>
                  {repoInfo.programmingLanguage}
                </span>
              )} */}
              <Link
                href={`/${blog_path}/stargazers`}
                className="flex items-center hover:text-primary"
              >
                <Star className="w-4 h-4 mr-1" />
                {/* TODO */}
                {/* {stargazers_count} */}
              </Link>
              {/* {license && (
                <span className="flex items-center">
                  <Law className="w-4 h-4 mr-1" />
                  {license.name} License
                </span>
              )} */}
              <span title={new Date(metadata.updated_at).toLocaleString()}>
                Updated on {new Date(metadata.updated_at).toLocaleDateString()}
              </span>
              <HistoryIco size={16} />
            </div>
          </div>
          <div className="flex flex-col items-end justify-between ml-4">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" /> 10
            </Button>
            {/* Placeholder for trend graph */}
            <div className="w-32 h-16 bg-muted rounded-md"></div>
          </div>
        </div>
      </CardContent>
      {/* <div className=' m-1'>                
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {metadata.title}
        </h1>
        <div className="flex justify-between items-center  text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(metadata.pushed_at)}
          </p>
          <Link href={`/aa/${slug}/history`} className='px-1 h-7'>
            <HistoryIco size={16} />
          </Link>
        </div>
      </div>
      <div className='m-1'>{metadata.description}</div> */}
    </Card>
  )
}
export default Info