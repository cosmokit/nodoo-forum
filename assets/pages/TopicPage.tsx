import React, { SFC, useEffect, useState } from "react";
import topicService from "../services/topic.service";
import TopicLoader from "../components/loaders/topic.loader";
import authService from "../services/auth.service";
import { NavLink } from "react-router-dom";

export interface Props {}

const TopicPage: SFC<Props> = (props: any) => {
  const [topic, setTopic] = useState();
  const [loading, setLoading] = useState(true);
  const slug: string = props.match.params.slug;
  const id: number = parseInt(props.match.params.id);

  useEffect(() => {
    topicService
      .find(id)
      .then((data: any) => {
        setTopic(data);
        setLoading(false);
      })
      .catch(er => console.error);
  }, []);

  return (
    <div className="topicpage">
      {loading && <TopicLoader />}
      {!loading && topic && (
        <>
          <h1>{topic.title}</h1>
          <div className="topic-informations">
            <div className="topic-informations__author">
              <a href="#">{topic.author.username}</a>
            </div>
            <div className="topic-informations__main">
              <p className="topic-informations__date">Created at 00/00/00</p>
              <p>{topic.content}</p>
              <div className="topic-informations__cta">
                <button>
                  <svg>
                    <use xlinkHref="../img/sprite.svg#icon-reply" />
                  </svg>
                  Reply
                </button>
                <button>
                  <svg>
                    <use xlinkHref="../img/sprite.svg#icon-report" />
                  </svg>
                  Report
                </button>
              </div>
            </div>
          </div>
          <hr />
          {topic.replies.map((reply: any) => (
            <div key={reply.id} className="topic-informations">
              <div className="topic-informations__author">
                <a href="#">{reply.author.username}</a>
              </div>{" "}
              <div className="topic-informations__main">
                <p className="topic-informations__date">Created at 00/00/00</p>
                <p>{reply.content}</p>
                <div className="topic-informations__cta">
                  <button>
                    <svg>
                      <use xlinkHref="../img/sprite.svg#icon-reply" />
                    </svg>
                    Reply
                  </button>
                  <button>
                    <svg>
                      <use xlinkHref="../img/sprite.svg#icon-report" />
                    </svg>
                    Report
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(authService.isAuthenticated() && (
            <>
              <hr />
              Reply form here
            </>
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
