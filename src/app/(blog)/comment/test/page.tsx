import GitHubDiscussionsEmbed from './github-discussions-embed'

export default function CommentsPage() {
  return (
    <div className="container mx-auto p-4">
      <GitHubDiscussionsEmbed 
        repositoryOwner="your-github-username"
        repositoryName="your-repo-name"
        discussionNumber={1}  // The number of the discussion you want to display
        theme="light"  // or "dark"
      />
    </div>
  )
}