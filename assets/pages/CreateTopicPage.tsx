import React, { useState, useEffect, useContext } from "react";
import { Helmet } from 'react-helmet';
import authContext from "../contexts/auth.context";
import topicService from "../services/topic.service";
import subcategoryService from "../services/subcategory.service";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../components/Button";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps { }

const CreateTopicPage: React.SFC<Props> = ({ history }) => {
  const { userData } = useContext(authContext);
  const [credentials, setCredentials] = useState({
    title: "",
    content: "",
    author: `/api/users/${userData.id}`,
    subcategory: ""
  });
  const [isSubmit, setSubmit] = useState(false);
  const [subcategories, setSubcategories] = useState();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleEditorChange = (e: any) => {
    setCredentials({ ...credentials, content: e.target.getContent() });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmit(true);
    credentials.subcategory = `/api/subcategories/${credentials.subcategory}`;

    topicService
      .create(credentials)
      .then((response: any) => {
        history.replace(`/topics/${response.data.slug}--${response.data.id}`);
      })
      .catch((err: any) => {
        console.error(err);
        setSubmit(false);
      });
  };

  useEffect(() => {
    subcategoryService
      .findAll()
      .then((response: any) => {
        setSubcategories(response["hydra:member"]);
        if (credentials.subcategory === "") {
          setCredentials({
            ...credentials,
            subcategory: response["hydra:member"][0]["id"]
          });
        }
      })
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Create a new topic - Nodoo Forum</title>
      </Helmet>
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
            <Editor
              apiKey={process.env.TINYMCE_API_KEY}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help"
              }}
              onChange={handleEditorChange}
            />
          </div>
          <Button isSubmit={isSubmit} className="btn--center" icon="plus" text="Create" />
        </form>
      </div>
    </>
  );
};

export default CreateTopicPage;
