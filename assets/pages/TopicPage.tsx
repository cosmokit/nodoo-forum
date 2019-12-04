import React, { SFC, useEffect, useState, useContext } from "react";
import topicService from "../services/topic.service";
import TopicLoader from "../components/loaders/topic.loader";
import Pagination, { getPaginatedData } from "../components/Pagination";
import AuthContext from "../contexts/auth.context";
import TopicReplyForm from "../components/TopicReplyForm";
import TopicReply from "../components/TopicReply";

export interface Props {}

const TopicPage: SFC<Props> = (props: any) => {
  const [topic, setTopic] = useState();
  const [topicTitle, setTopicTtitle] = useState();
  const [replies, setReplies] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const slug: string = props.match.params.slug;
  const id: number = parseInt(props.match.params.id);

  const addReply = (reply: {}) => {
    setReplies([...replies, reply]);
  };

  useEffect(() => {
    topicService
      .find(id)
      .then((data: any) => {
        console.log(data);
        setTopic(data);
        setTopicTtitle(data.title);
        setReplies(data.replies);
        setLoading(false);
      })
      .catch(er => console.error);
  }, []);

  const itemsPerPage: number = 20;
  let paginatedReplies: Array<Object> = [];

  if (topic !== undefined && replies !== undefined) {
    paginatedReplies = getPaginatedData(replies, itemsPerPage, currentPage);
  }

  return (
    <div className="topicpage">
      {loading && <TopicLoader />}
      {!loading && topic && (
        <>
          <h1>{topicTitle}</h1>
          <TopicReply
            isTopic={true}
            updateTitle={setTopicTtitle}
            data={topic}
            history={props.history}
          />
          <hr />
          {paginatedReplies.map((reply: any) => (
            <TopicReply
              isTopic={false}
              updateTitle={() => {}}
              key={reply.id}
              data={reply}
              history={props.history}
            />
          ))}
          <Pagination
            itemsPerPage={itemsPerPage}
            itemsLength={topic.replies.length}
            currentPage={currentPage}
            onPageChanged={setCurrentPage}
          />
          {(isAuthenticated && (
            <TopicReplyForm topic_id={topic.id} addReply={addReply} />
          )) || (
            <p className="u-text-center u-margin-top-sm">
              You must be logged in to write a reply.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TopicPage;
