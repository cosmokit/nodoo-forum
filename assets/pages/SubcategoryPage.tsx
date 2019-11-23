import React, { SFC, useEffect, useState, PropsWithChildren } from "react";
import SubcategoryService from "../services/subcategory.service";
import Pagination, { getPaginatedData } from "../components/Pagination";
import SubcategoryLoader from "../components/loaders/subcategory.loader";
import { NavLink } from "react-router-dom";

export interface Props {}

const SubcategoryPage: SFC<Props> = (props: PropsWithChildren<any>) => {
  const [subcategory, setSubcategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const id: number = parseInt(props.match.params.id);
  const slug: string = props.match.params.slug;

  useEffect(() => {
    SubcategoryService.find(id)
      .then((data: any) => {
        setSubcategory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const itemsPerPage: number = 10;
  let paginatedTopics: Array<Object> = [];

  if (subcategory !== undefined) {
    paginatedTopics = getPaginatedData(
      subcategory.topics,
      itemsPerPage,
      currentPage
    );
  }

  return (
    <div className="subcategoryPage">
      {loading && <SubcategoryLoader />}
      {!loading && subcategory && (
        <>
          <h1>{subcategory.name}</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Created at</th>
                <th>Last update</th>
                <th>Replies</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTopics.map((topic: any) => (
                <tr key={topic.id}>
                  <td>
                    <NavLink
                      to={`/topics/${topic.slug}--${topic.id}`}
                      className="underline-link"
                    >
                      {topic.title}
                    </NavLink>
                  </td>
                  <td className="u-text-center">
                    <a href="#">{topic.author.username}</a>
                  </td>
                  <td className="u-text-center">20/10/2011</td>
                  <td className="u-text-center">...</td>
                  <td className="u-text-center">0</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsPerPage={itemsPerPage}
            itemsLength={subcategory.topics.length}
            currentPage={currentPage}
            onPageChanged={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default SubcategoryPage;
