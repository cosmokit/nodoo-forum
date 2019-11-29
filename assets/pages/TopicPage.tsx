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
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userData } = useContext(AuthContext);
  const slug: string = props.match.params.slug;
  const id: number = parseInt(props.match.params.id);

  useEffect(() => {
    let isSubscribed = true;
    topicService
      .find(id)
      .then((data: any) => {
        if (isSubscribed) {
          setTopic(data);
          setLoading(false);
        }
      })
      .catch(er => console.error);

    return () => {
      isSubscribed = false;
    };
  }, []);

  const itemsPerPage: number = 5;
  let paginatedReplies: Array<Object> = [];

  if (topic !== undefined) {
    paginatedReplies = getPaginatedData(
      topic.replies,
      itemsPerPage,
      currentPage
    );
  }

  return (
    <div className="topicpage">
      {loading && <TopicLoader />}
      {!loading && topic && (
        <>
          <h1>{topic.title}</h1>
          <TopicReply isTopic={true} data={topic} />
          <hr />
          {paginatedReplies.map((reply: any) => (
            <TopicReply isTopic={false} key={reply.id} data={reply} />
          ))}
          <Pagination
            itemsPerPage={itemsPerPage}
            itemsLength={topic.replies.length}
            currentPage={currentPage}
            onPageChanged={setCurrentPage}
          />
          {(isAuthenticated && (
            <TopicReplyForm isEditing={false} topic_id={topic.id} />
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
