import React from 'react';

import Feed from './Feed';

const data = [
  {
    id: 1,
    name: '피드',
    content: '피드 내용',
    src: ''
  }
];

const Feeds = () => {
  return (
    <>
      {data.map((feedData) => (
        <Feed feedId={feedData.id}>
          <EachFeed />
        </Feed>
      ))}
      <Pagination />
    </>
  );
};

const EachFeed = () => {
  return (
    <>
      <div>
        <Feed.Popover />
      </div>
      <Feed.Image src={feedData.src} />
      <Feed.Content>{feedData.content}</Feed.Content>
    </>
  );
};

const FeedModal = ({ feedData }) => {
  const [comment, setComment] = useState([]);

  return (
    <Feed feedId={feedData.id}>
      <EachFeed />
      <Feed.Comments />
    </Feed>
  );
};
