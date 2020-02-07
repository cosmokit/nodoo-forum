import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from 'react-helmet'
import CategoryService from "../services/category.service";
import HomeLoader from "../components/loaders/home.loader";
import { NavLink } from "react-router-dom";

interface Props { }

interface Categories {
  id: number;
  name: string;
  slug: string;
  subcategories: Array<Subcategories>;
}

interface Subcategories {
  id: number;
  name: string;
  slug: string;
  category: Array<Categories>;
  topics: Array<Object>;
}

const HomePage: React.SFC<Props> = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CategoryService.findAll()
      .then(categories => {
        setCategories(categories);
        setLoading(false);
      })
      .catch(err => console.error(err.response));
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Nodoo Forum</title>
      </Helmet>
      <div className="homepage">
        {loading && <HomeLoader />}

        {!loading &&
          categories.map((category: Categories) => (
            <Fragment key={category.id}>
              <h2 className="heading-2">{category.name}</h2>
              <div className="home-cards">
                {category.subcategories.map((subcategory: Subcategories) => (
                  <div key={subcategory.id} className="card">
                    <NavLink
                      to={`/${subcategory.slug}--${subcategory.id}`}
                      className="card__heading"
                    >
                      {subcategory.name}
                    </NavLink>
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
        {categories.length == 0 && !loading && <p>No categories founds.</p>}
      </div>
    </>
  );
};

export default HomePage;
