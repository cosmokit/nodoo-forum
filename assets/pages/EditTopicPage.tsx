import React, { SFC, useState, useEffect, useContext } from "react";
import topicService from "../services/topic.service";

export interface Props {
  topic: { id: number; title: string; content: string };
  updateTopic: (value: any) => void;
  onClose: (value: boolean) => void;
}

const EditTopicPage: SFC<Props> = ({ topic, updateTopic, onClose }) => {
  const [credentiels, setCredentials] = useState(topic);
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState(
    "translate(-50%, -50%) scale(0.25)"
  );
  const [isSubmit, setSubmit] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setCredentials({ ...credentiels, [name]: value });
  };

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setSubmit(true);
    topicService
      .update(credentiels)
      .then(response => {
        onClose(false);
        setSubmit(false);
        updateTopic(response.data);
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
          <h2 className="modal__title heading-2">
            Editing: {credentiels.title}
          </h2>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={credentiels.title}
                onChange={handleChange}
                id="title"
                className="form__input"
                minLength={2}
                maxLength={80}
              />
              <label htmlFor="title" className="form__label">
                Title
              </label>
            </div>
            <div className="form-group">
              <textarea
                name="content"
                className="form__textarea"
                value={credentiels.content}
                placeholder="Content"
                onChange={handleChange}
                id="content"
                minLength={2}
                cols={10}
                rows={10}
              ></textarea>
              <label htmlFor="content" className="form__label">
                Content
              </label>
            </div>
            <button
              type="submit"
              className={`btn btn--center ${isSubmit ? "btn--disabled" : ""}`}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTopicPage;
