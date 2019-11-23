import React, { SFC, useState, useEffect, useContext } from "react";
import topicService from "../services/topic.service";

export interface Props {
  id: number;
  onClose: (value: boolean) => void;
}

const DeleteTopicPage: SFC<Props> = ({ id, onClose }) => {
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState(
    "translate(-50%, -50%) scale(0.25)"
  );
  const [isSubmit, setSubmit] = useState(false);

  const handleClose = () => {
    onClose(false);
  };

  const handleClick = (event: any) => {
    event.preventDefault();

    setSubmit(true);
    topicService
      .deleteTopic(id)
      .then(() => {
        onClose(false);
      })
      .catch(err => {
        console.error(err.response);
        setSubmit(false);
      });
  };

  useEffect(() => {
    setOpacity(1);
    setTransform("translate(-50%, -50%) scale(1)");
  });

  return (
    <div className="modal" style={{ opacity: opacity, visibility: "visible" }}>
      <div
        className="modal__content editTopic-box"
        style={{ opacity: opacity, transform: transform }}
      >
        <button onClick={handleClose} className="modal__close">
          &times;
        </button>
        <div className="modal__body editTopic-box__body">
          <h2 className="modal__title">Delete this topic ?</h2>
          <button
            onClick={handleClick}
            className={`btn btn--center ${isSubmit ? "btn--disabled" : ""}`}
          >
            {(!isSubmit && (
              <>
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-trash" />
                </svg>
                Delete
              </>
            )) || <>Loading...</>}
          </button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTopicPage;
