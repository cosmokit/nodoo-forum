import * as React from "react";
import ContentLoader from "react-content-loader";

export interface Props {}

const HomeLoader: React.SFC<Props> = () => {
  return (
    <ContentLoader
      height={160}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#f3f3f3"
    >
      <rect x="6" y="10" rx="4" ry="4" width="209" height="21" />
      <rect x="10" y="41" rx="3" ry="3" width="193" height="15" />
      <rect x="216" y="41" rx="3" ry="3" width="201" height="14" />
      <rect x="12" y="96" rx="0" ry="0" width="202" height="25" />
      <rect x="17" y="134" rx="0" ry="0" width="188" height="16" />
      <rect x="226" y="134" rx="0" ry="0" width="178" height="15" />
    </ContentLoader>
  );
};

export default HomeLoader;
