import React, { SFC, useState, useContext } from "react";
import topicReplyService from "../services/topicReply.service";
import authContext from "../contexts/auth.context";
import { Editor } from "@tinymce/tinymce-react";
import Button from "./Button";

interface Props {
  topic_id: number;
  addReply: (value: Object) => void;
}

const TopicReplyForm: React.SFC<Props> = ({ topic_id, addReply }) => {
  const [content, setContent] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const { userData } = useContext(authContext);

  const handleChange = (e: any) => {
    setContent(e.target.getContent());
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmit(true);

    const credentials = {
      content: content,
      topic: `/api/topics/${topic_id}`,
      author: `/api/users/${userData.id}`
    };

    topicReplyService
      .create(credentials)
      .then(response => {
        const data = {
          ["@id"]: response.data["@id"],
          ["@type"]: response.data["@type"],
          id: response.data.id,
          content: response.data.content,
          author: response.data.author
        };
        addReply(data);
        setContent("");
        setIsSubmit(false);
      })
      .catch(err => {
        console.error(err);
        setIsSubmit(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Editor
          apiKey={process.env.TINYMCE_API_KEY}
          initialValue={content}
          value={content}
          init={{
            height: 250,
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
          onChange={handleChange}
        />
      </div>
      <Button isSubmit={isSubmit} className="btn--center" icon="reply" text="Reply" />
    </form>
  );
};

export default TopicReplyForm;
