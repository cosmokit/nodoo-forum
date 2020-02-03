import * as React from "react";
import { Helmet } from 'react-helmet';

export interface NotFoundPageProps { }

const NotFoundPage: React.SFC<NotFoundPageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Error 404 - Nodoo Forum</title>
      </Helmet>
      <div className="notfound">
        <h1>Error 404</h1>
        <p>Page not found.</p>
      </div>
    </>
  );
};

export default NotFoundPage;
