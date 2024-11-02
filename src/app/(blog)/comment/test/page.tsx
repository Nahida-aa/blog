import Comments from './github-discussions-embed'
export const metadata = {title: 'Comment/test'}
export default function CommentsPage() {
  return (
    <div className="container mx-auto p-4">
      <Comments 
      />
    </div>
  )
}