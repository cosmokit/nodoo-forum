import React, { SFC } from "react";
import ContentLoader from "react-content-loader";

export interface Props {}

const ProfileLoader: SFC<Props> = () => {
  return (
    <ContentLoader
      height={160}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#f3f3f3"
    >
      <rect x="6" y="10" rx="4" ry="4" width="209" height="21" />
      <rect x="8" y="39" rx="3" ry="3" width="693" height="32" />
      <rect x="8" y="80" rx="3" ry="3" width="693" height="32" />
      <rect x="8" y="121" rx="3" ry="3" width="693" height="32" />
    </ContentLoader>
  );
};

export default ProfileLoader;
