import React from 'react'
const records = [{
  user: {
    username: 'John Doe',
    avatar: '/avatar/star-256.webp',
    html_url: '/user/John-Doe'
  },
  action: {
    type: 'reply',
    desc: '回复了我的评论',
    content: '是的，OF真的很难受，但是我还是喜欢征服者，所以我还是会用的。',
    time: '2023-10-01 12:36'
  },
  target: {
    type: 'comment',
    text: "挺喜欢征服者的，这对中世纪整合包很重要。但是OF真的太劝退了，不用OF纹理又。。。唉",
    html_url: '/gvuyv/resource/征服者'
  },
},{
    user: {
      username: 'klij鱼',
      avatar: '/avatar/xc-256.webp',
      html_url: '/user/John-Doe'
    },
    action: {
      type: 'comment',
      desc: '对我的资源发表了评论',
      content: '挺喜欢征服者的，这对中世纪整合包很重要。但是OF真的太劝退了，不用OF纹理又。。。唉',
      time: '2023-10-01 12:34'
    },
    target: {
      type: 'resource',
      image: '/images/646e81c681b36b986ac641e8da898a162ad49bace68bde1d20bd8ed76bd06be6.png',
      html_url: '/gvuyv/resource/征服者'
    },
  },
  {
  user: {
    username: '红萝卜兔',
    avatar: '/avatar/aa-256.webp',
    html_url: '/user/John-Doe'
  },
  action: {
    type: 'like',
    desc: '点赞了我的资源',
    time: '2023-10-01 12:32'
  },
  target: {
    type: 'resource',
    image: '/images/646e81c681b36b986ac641e8da898a162ad49bace68bde1d20bd8ed76bd06be6.png',
    html_url: '/gvuyv/resource/征服者'
  },
},{
  user: {
    username: 'John Doe',
    avatar: '/avatar/star-256.webp',
    html_url: '/user/John-Doe'
  },
  action: {
    type: 'share',
    desc: '分享了我的资源',
    time: '2023-10-01 12:28'
  },
  target: {
    type: 'resource',
    image: '/images/646e81c681b36b986ac641e8da898a162ad49bace68bde1d20bd8ed76bd06be6.png',
    html_url: '/gvuyv/resource/征服者'
  },
},{
  user: {
    username: 'John Doe',
    avatar: '/avatar/star-256.webp',
    html_url: '/user/John-Doe'
  },
  action: {
    type: 'reward',
    desc: '打赏了我的资源',
    time: '2023-10-01 12:24'
  },
  target: {
    type: 'resource',
    image: '/images/646e81c681b36b986ac641e8da898a162ad49bace68bde1d20bd8ed76bd06be6.png',
    html_url: '/gvuyv/resource/征服者'
  },
},{
  user: {
    username: 'John Doe',
    avatar: '/avatar/star-256.webp',
    html_url: '/user/John-Doe'
  },
  action: {
    type: 'star',
    desc: '收藏了我的资源',
    time: '2023-10-01 12:24'
  },
  target: {
    type: 'resource',
    image: '/images/646e81c681b36b986ac641e8da898a162ad49bace68bde1d20bd8ed76bd06be6.png',
    html_url: '/gvuyv/resource/征服者'
  },
}]


const UserActivityRecord = ({ user, action, target }) => {
  return (

    <div className="flex w-[460px]  py-4 relative ">
    <img
      src={user.avatar}
      alt="Avatar"
      className="size-12 mx-3 rounded-full avatar"
    />

    <div className="flex-1  overflow-hidden content">
      <div className="flex text-sm mb-2.5 line-1">
        <span className="font-bold mr-2 name"><a href={user.html_url} className="hover:text-sky-400 ">{user.username}</a></span>
        <span className="text-gray-300 desc">{action.desc}</span>
      </div>
      <div className="text-sm mb-2.5 line-2">
        <p className="m-0 text-ellipsis whitespace-nowrap overflow-hidden">
        {action.content}
        </p>
      </div>

      <div className="flex text-xs line-3">
        <span className="text-gray-200/50 time">
        {action.time}
        </span>
      </div>
    </div>

    <div className="mx-3 target">
        {target.type === 'resource' && target.image && (
          <a href={target.html_url}>
            <img src={target.image} alt="Resource" className="size-[60px] rounded" />
          </a>
        )}
        {target.type === 'comment' && (
          <div className="size-[60px] leading-[15px] text-ellipsis  "><span className='size-[60px] line-clamp-4 text-sm leading-[15px] text-ellipsis overflow-hidden text-gray-200/60'>{target.text}</span></div>
        )}
    </div>
  </div>
  )
}

export default function RecordPage() {
  return (
    <main className="h-screen p-4">
      {records.map((record, index) => (
        <React.Fragment key={index}>
          <UserActivityRecord
            user={record.user}
            action={record.action}
            target={record.target}
          />
          {index < records.length - 1 && (
            <div className="ml-[4.5rem] border-b border-gray-400/30"></div>
          )}
        </React.Fragment>
      ))}
    </main>
  );
}