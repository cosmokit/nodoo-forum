import React, { SFC, useState, useEffect } from "react";
import topicService from "../services/topic.service";
import topicReplyService from "../services/topicReply.service";
import Modal from "./Modal";
import { RouteComponentProps } from "react-router-dom";
interface Props {
  isTopic: boolean;
  id: number;
  isDisplayed: (value: boolean) => void;
  displayStatus: boolean;
  deleteReply: (value: number) => void;
  history: any;
}

const DeleteTopicModal: SFC<Props> = ({
  isTopic,
  id,
  isDisplayed,
  displayStatus,
  deleteReply,
  history
}) => {
  const handleDeleteBtn = () => {
    if (isTopic) {
      topicService
        .deleteTopic(id)
        .then(() => {
          isDisplayed(false);
          history.replace("/");
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      topicReplyService
        .deleteReply(id)
        .then(() => {
          isDisplayed(false);
          deleteReply(id);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <Modal isDisplayed={isDisplayed} displayStatus={displayStatus} title="Delete this content ?" boxWidth={10}>
      <div className="modal__cta u-margin-top-sm">
        <button
          className={`btn btn--square btn--small`}
          onClick={handleDeleteBtn}
        >
          <svg>
            <use xlinkHref="../img/sprite.svg#icon-trash" />
          </svg>
          Yes, delete
        </button>
        <button
          className="btn btn--square btn--small btn--light"
          onClick={() => isDisplayed(false)}
        >
          <svg>
            <use xlinkHref="../img/sprite.svg#icon-close" />
          </svg>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTopicModal;
