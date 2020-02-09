import React, { SFC } from "react";
import ContentLoader from "react-content-loader";

export interface Props { }

const ProfileLoader: SFC<Props> = () => {
  return (
    <ContentLoader
      height={68}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#c0c0c0"
    >
      <rect x="0" y="0" rx="4" ry="4" width="80" height="68" />
      <rect x="85" y="0" rx="0" ry="0" width="95" height="9" />
      <rect x="85" y="14" rx="0" ry="0" width="80" height="5" />
    </ContentLoader>
  );
};

export default ProfileLoader;
