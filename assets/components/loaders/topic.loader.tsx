import React, { SFC } from "react";
import ContentLoader from "react-content-loader";

export interface Props { }

const TopicLoader: SFC<Props> = () => {
  return (
    <ContentLoader
      height={80}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#c0c0c0"
    >
      <rect x="6" y="0" rx="4" ry="4" width="209" height="16" />
      <rect x="6" y="26" rx="4" ry="4" width="693" height="70" />
    </ContentLoader>
  );
};

export default TopicLoader;
