import * as React from "react";
import ContentLoader from "react-content-loader";

export interface Props { }

const HomeLoader: React.SFC<Props> = () => {
  return (
    <ContentLoader
      height={155}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#c0c0c0"
    >
      <rect x="0" y="0" rx="4" ry="4" width="209" height="15" />
      <rect x="0" y="25" rx="3" ry="3" width="193" height="20" />
      <rect x="210" y="25" rx="3" ry="3" width="201" height="20" />
      <rect x="0" y="80" rx="0" ry="0" width="202" height="15" />
      <rect x="0" y="105" rx="0" ry="0" width="188" height="20" />
      <rect x="210" y="105" rx="0" ry="0" width="178" height="20" />
    </ContentLoader>
  );
};

export default HomeLoader;
