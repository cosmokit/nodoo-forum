import React, { SFC, useEffect, useState, useContext } from "react";
import topicService from "../services/topic.service";
import TopicLoader from "../components/loaders/topic.loader";
import Pagination from "../components/Pagination";
import AuthContext from "../contexts/auth.context";
import TopicReplyForm from "../components/TopicReplyForm";
import TopicReply from "../components/TopicReply";

export interface Props {
  match: any;
  history: any;
}

const TopicPage: SFC<Props> = ({ match, history }) => {
  const [topic, setTopic] = useState();
  const [topicTitle, setTopicTtitle] = useState();
  const [replies, setReplies] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search.substr(6)) || 1
  );
  const [totalItems, setTotalItems] = useState();
  const { isAuthenticated } = useContext(AuthContext);

  const slug: string = match.params.slug;
  const id: number = parseInt(match.params.id);

  const addReply = (reply: {}) => {
    setReplies([...replies, reply]);
  };

  const deleteReply = (id: number) => {
    const updatedReplies: Array<string> = [...replies];
    const index = updatedReplies.findIndex((reply: any) => reply.id === id);
    updatedReplies.splice(index, 1);
    setReplies(updatedReplies);
  };

  const onPageChanged = (page: number) => {
    setCurrentPage(page);
    if (page == 1) {
      history.replace(`/topics/${topic.slug}--${topic.id}`);
    } else {
      history.replace(`/topics/${topic.slug}--${topic.id}?page=${page}`);
    }
  };

  useEffect(() => {
    topicService
      .find(id)
      .then((data: any) => {
        if (slug !== data.slug) {
          history.replace("/");
        }
        setTopic(data);
        setTopicTtitle(data.title);
      })
      .catch(err => {
        history.replace("/");
      });
  }, []);

  useEffect(() => {
    topicService
      .findRepliesPaginated(id, currentPage)
      .then((response: any) => {
        setReplies(response["hydra:member"]);
        setTotalItems(response["hydra:totalItems"]);
        setLoading(false);
      })
      .catch((err: any) => console.error(err));
  }, [currentPage]);

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
            history={history}
            deleteReply={() => {}}
          />
          <hr />
        </>
      )}
      {replies && (
        <Pagination
          itemsPerPage={replies.length}
          itemsLength={totalItems}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      )}
      {!loading &&
        replies &&
        replies.map((reply: any) => (
          <TopicReply
            isTopic={false}
            updateTitle={() => {}}
            key={reply.id}
            data={reply}
            history={history}
            deleteReply={deleteReply}
          />
        ))}
      {replies && (
        <Pagination
          itemsPerPage={replies.length}
          itemsLength={totalItems}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      )}
      {(isAuthenticated && topic && (
        <TopicReplyForm topic_id={topic.id} addReply={addReply} />
      )) || (
        <p className="u-text-center u-margin-top-sm">
          You must be logged in to write a reply.
        </p>
      )}
    </div>
  );
};

export default TopicPage;
