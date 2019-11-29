import React, { SFC, useState, useEffect } from "react";
import topicService from "../services/topic.service";
import topicReplyService from "../services/topicReply.service";

export interface Props {
  isTopic: boolean;
  id: number;
  onClose: (value: boolean) => void;
}

const DeleteTopicModal: SFC<Props> = ({ isTopic, id, onClose }) => {
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState(
    "translate(-50%, -50%) scale(0.25)"
  );
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClose = () => {
    onClose(false);
  };

  const handleDeleteBtn = () => {
    setIsSubmit(true);

    if (isTopic) {
      topicService
        .deleteTopic(id)
        .then(() => {
          setIsSubmit(false);
          handleClose();
        })
        .catch(err => {
          console.error(err);
          setIsSubmit(false);
        });
    } else {
      topicReplyService
        .deleteReply(id)
        .then(() => {
          setIsSubmit(false);
          handleClose();
        })
        .catch(err => {
          console.error(err);
          setIsSubmit(false);
        });
    }
  };

  useEffect(() => {
    setOpacity(1);
    setTransform("translate(-50%, -50%) scale(1)");
  });

  return (
    <div className="modal" style={{ opacity: opacity, visibility: "visible" }}>
      <div
        className="modal__content deleteModal__content"
        style={{ opacity: opacity, transform: transform }}
      >
        <button onClick={handleClose} className="modal__close">
          &times;
        </button>
        <div className="modal__body">
          <h2 className="modal__title heading-2 deleteModal__title">
            Delete this content ?
          </h2>
          <div className="modal__cta">
            <button
              className={`btn btn--square btn--small ${
                isSubmit ? "btn--disabled" : ""
              }`}
              onClick={handleDeleteBtn}
            >
              {(!isSubmit && (
                <>
                  <svg>
                    <use xlinkHref="../img/sprite.svg#icon-trash" />
                  </svg>
                  Yes, delete
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
        </div>
      </div>
    </div>
  );
};

export default DeleteTopicModal;
