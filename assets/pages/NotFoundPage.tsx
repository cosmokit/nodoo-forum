import * as React from "react";

export interface NotFoundPageProps {}

const NotFoundPage: React.SFC<NotFoundPageProps> = () => {
  return (
    <div className="notfound">
      <h1>Error 404</h1>
      <p>Page not found.</p>
    </div>
  );
};

export default NotFoundPage;
