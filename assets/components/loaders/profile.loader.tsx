import React, { SFC } from "react";
import ContentLoader from "react-content-loader";

export interface Props {}

const ProfileLoader: SFC<Props> = () => {
  return (
    <ContentLoader
      height={180}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#c0c0c0"
    >
      <rect x="22" y="11" rx="4" ry="4" width="92" height="82" />
      <rect x="120" y="11" rx="0" ry="0" width="104" height="11" />
      <rect x="120" y="27" rx="0" ry="0" width="81" height="5" />
    </ContentLoader>
  );
};

export default ProfileLoader;
