import React, { SFC, useContext, useState } from "react";
import authContext from "../contexts/auth.context";
import topicReplyService from "../services/topicReply.service";
import topicService from "../services/topic.service";
import DeleteTopicModal from "./DeleteTopicModal";

export interface TopicReplyProps {
  data: any;
  isTopic: boolean;
  updateTitle: (value: string) => void;
  deleteReply: (value: number) => void;
  history: any;
}

const TopicReply: SFC<any> = ({
  data,
  isTopic,
  updateTitle,
  deleteReply,
  history
}) => {
  const { isAuthenticated, userData } = useContext(authContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [credentials, setCredentials] = useState(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditBtn = () => {
    handleDropdown();
    setShowEditForm(true);
  };

  const handleDeleteBtn = () => {
    handleDropdown();
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmit(true);

    if (isTopic) {
      topicService
        .update({
          id: credentials.id,
          title: credentials.title,
          content: credentials.content
        })
        .then(response => {
          setIsSubmit(false);
          setShowEditForm(false);
          updateTitle(response.data.title);
          history.replace(`/topics/${response.data.slug}--${response.data.id}`);
        })
        .catch(err => {
          console.error(err);
          setIsSubmit(false);
        });
    } else {
      topicReplyService
        .update({ id: credentials.id, content: credentials.content })
        .then(() => {
          setIsSubmit(false);
          setShowEditForm(false);
        })
        .catch(err => {
          console.error(err);
          setIsSubmit(false);
        });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const updatedCredentials = { ...credentials, [name]: value };
    setCredentials(updatedCredentials);
  };

  const handleClose = () => {
    setShowEditForm(false);
  };

  return (
    (showDeleteModal && (
      <DeleteTopicModal
        isTopic={isTopic}
        id={credentials.id}
        onClose={setShowDeleteModal}
        history={history}
        deleteReply={deleteReply}
      />
    )) ||
    (showEditForm && (
      <>
        <form onSubmit={handleSubmit}>
          {isTopic && (
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={credentials.title}
                className="form__input"
                onChange={handleChange}
                minLength={2}
              />
            </div>
          )}
          <div className="form-group">
            <textarea
              name="content"
              className="form__textarea"
              value={credentials.content}
              placeholder="Content"
              onChange={handleChange}
              minLength={2}
              cols={10}
              rows={10}
            ></textarea>
          </div>
          <div className="reply__actions">
            <button
              type="submit"
              className={`btn btn--square btn--small ${
                isSubmit ? "btn--disabled" : ""
              }`}
            >
              {(!isSubmit && (
                <>
                  <svg>
                    <use xlinkHref="../img/sprite.svg#icon-pencil" />
                  </svg>
                  Edit
                </>
              )) || <>Loading...</>}
            </button>
            <button
              className="btn btn--square btn--small btn--light"
              onClick={handleClose}
            >
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-close" />
              </svg>
              Cancel
            </button>
          </div>
        </form>
      </>
    )) || (
      <div className="topic-informations">
        <div className="topic-informations__author">
          <a href="#">{credentials.author.username}</a>
        </div>
        <div className="topic-informations__main">
          <div className="topic-informations__header">
            <p className="topic-informations__header-date">
              Created at 00/00/00
            </p>
            {isAuthenticated &&
              userData.username === credentials.author.username && (
                <div className="topic-informations__header-cta">
                  <button onClick={handleDropdown} className="dropdown__btn">
                    {(!showDropdown && (
                      <svg>
                        <use xlinkHref="../img/sprite.svg#icon-chevron-down" />
                      </svg>
                    )) || (
                      <svg>
                        <use xlinkHref="../img/sprite.svg#icon-chevron-up" />
                      </svg>
                    )}
                  </button>
                  {showDropdown && (
                    <div className="dropdown__menu">
                      <button
                        className="dropdown__item"
                        onClick={handleEditBtn}
                      >
                        <svg>
                          <use xlinkHref="../img/sprite.svg#icon-pencil" />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="dropdown__item"
                        onClick={handleDeleteBtn}
                      >
                        <svg>
                          <use xlinkHref="../img/sprite.svg#icon-trash" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
          </div>
          <p>{credentials.content}</p>
          <div className="topic-informations__cta">
            <button>
              <svg>
                <use xlinkHref="../img/sprite.svg#icon-report" />
              </svg>
              Report
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TopicReply;
