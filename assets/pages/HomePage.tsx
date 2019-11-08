import React, { SFC, useEffect, useState } from "react";
import CategoriesService from "../services/categories.service";

export interface Props {}

export interface Categories {
  id: number;
  name: string;
  slug: string;
  subcategories: Array<Subcategories>;
}

export interface Subcategories {
  id: number;
  name: string;
  slug: string;
  category: Array<Categories>;
  topics: Array<any>;
}

const HomePage: SFC<Props> = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoriesService.findAll()
      .then(categories => setCategories(categories))
      .catch(err => console.error(err.response));
  }, []);

  return (
    <div className="homepage">
      {categories.map((category: Categories) => (
        <>
          <h2 className="heading-2" key={category.id}>
            {category.name}
          </h2>
          <div className="home-cards">
            {category.subcategories.map((subcategory: Subcategories) => (
              <div key={subcategory.id} className="card">
                <a href="#" className="card__heading">
                  {subcategory.name}
                </a>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default HomePage;
