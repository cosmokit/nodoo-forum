import React, { SFC, useEffect, useState, useContext } from "react";
import SubcategoryService from "../services/subcategory.service";
import Pagination from "../components/Pagination";
import SubcategoryLoader from "../components/loaders/subcategory.loader";
import { NavLink } from "react-router-dom";
import authContext from "../contexts/auth.context";
import moment from "moment";

export interface Props {
  match: any;
  history: any;
  location: any;
}

const SubcategoryPage: SFC<Props> = ({ match, history, location }) => {
  const [subcategory, setSubcategory] = useState();
  const [topics, setTopics] = useState();
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search.substr(6)) || 1
  );
  const { isAuthenticated } = useContext(authContext);

  const id: number = parseInt(match.params.id);
  const slug: string = match.params.slug;

  useEffect(() => {
    SubcategoryService.find(id)
      .then((data: any) => {
        if (slug !== data.slug) {
          history.replace("/");
        }
        setSubcategory(data);
      })
      .catch(err => {
        history.replace("/");
      });
  }, []);

  useEffect(() => {
    SubcategoryService.findTopicsPaginated(id, currentPage)
      .then((response: any) => {
        if (response["hydra:member"].length === 0) {
          return history.replace('/not-found')
        }
        setTopics(response["hydra:member"]);
        setTotalItems(response["hydra:totalItems"]);
        setLoading(false);
      })
      .catch((err: any) => console.error(err));
  }, [currentPage]);



  const onPageChanged = (page: number) => {
    setCurrentPage(page);
    if (page == 1) {
      history.replace(`/${subcategory.slug}--${subcategory.id}`);
    } else {
      history.replace(`/${subcategory.slug}--${subcategory.id}?page=${page}`);
    }
  };

  return (
    <div className="subcategoryPage">
      {loading && <SubcategoryLoader />}
      {!loading && subcategory && (
        <div className="subcategoryPage__header">
          <h1>{subcategory.name}</h1>
          {isAuthenticated && (
            <NavLink to="/topics/new">
              <button className="btn btn--small btn--square">
                <svg>
                  <use xlinkHref="../img/sprite.svg#icon-plus" />
                </svg>
                New topic
              </button>
            </NavLink>
          )}
        </div>
      )}
      {!loading && topics && (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Creation date</th>
              <th>Last update</th>
              <th>Replies</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic: any) => (
              <tr key={topic.id}>
                <td>
                  <NavLink
                    to={`/topics/${topic.slug}--${topic.id}`}
                    className="underline-link"
                  >
                    {topic.title}
                  </NavLink>
                </td>
                <td className="u-text-center user-avatar">
                  <img src={`../img/users/${topic.author.avatar}`} />
                  <a href="#">{topic.author.username}</a>
                </td>
                <td className="u-text-center">
                  {moment(topic.createdAt).calendar()}
                </td>
                <td className="u-text-center">
                  {(topic.updatedAt !== topic.createdAt &&
                    moment(topic.updatedAt).fromNow()) ||
                    "..."}
                </td>
                <td className="u-text-center">{topic.replies.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {topics && (
        <Pagination
          itemsPerPage={12}
          itemsLength={totalItems}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      )}
    </div>
  );
};

export default SubcategoryPage;
