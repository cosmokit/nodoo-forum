import React, { SFC, useState, useEffect, useContext } from "react";
import authContext from "../contexts/auth.context";
import topicService from "../services/topic.service";
import subcategoryService from "../services/subcategory.service";

export interface Props {
  history: any;
}

const CreateTopicPage: SFC<Props> = ({ history }) => {
  const { userData } = useContext(authContext);
  const [credentials, setCredentials] = useState({
    title: "",
    content: "",
    author: `/api/users/${userData.id}`,
    subcategory: ""
  });
  const [subcategories, setSubcategories] = useState();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    credentials.subcategory = `/api/subcategories/${credentials.subcategory}`;
    topicService
      .create(credentials)
      .then((response: any) => {
        history.replace(`/topics/${response.data.slug}--${response.data.id}`);
      })
      .catch((err: any) => console.error(err));
  };

  useEffect(() => {
    subcategoryService
      .findAll()
      .then((response: any) => {
        setSubcategories(response["hydra:member"]);
      })
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <div className="createTopicPage">
      <h1>Create a new topic</h1>
      <form onSubmit={handleSubmit}>
        {subcategories && (
          <div className="form-group">
            <select
              className="form__select"
              name="subcategory"
              id="subcategory"
              onChange={handleChange}
              value={credentials.subcategory}
            >
              {subcategories.map((subcategory: any) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            <label htmlFor="subcategory" className="form__label">
              Subcategory
            </label>
          </div>
        )}
        <div className="form-group">
          <input
            type="text"
            className="form__input"
            placeholder="Title"
            name="title"
            id="title"
            value={credentials.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="title" className="form__label">
            Title
          </label>
        </div>
        <div className="form-group">
          <textarea
            name="content"
            className="form__textarea"
            value={credentials.content}
            placeholder="Content"
            onChange={handleChange}
            id="content"
            minLength={2}
            cols={10}
            rows={10}
            required
          ></textarea>
          <label htmlFor="content" className="form__label">
            Content
          </label>
        </div>
        <button type="submit" className="btn">
          <svg>
            <use xlinkHref="../img/sprite.svg#icon-plus" />
          </svg>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTopicPage;
