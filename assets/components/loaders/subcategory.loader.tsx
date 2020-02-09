import * as React from "react";
import ContentLoader from "react-content-loader";

export interface Props { }

const SubcategoryLoader: React.SFC<Props> = () => {
  return (
    <ContentLoader
      height={97}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#c0c0c0"
    >
      <rect x="0" y="0" rx="4" ry="4" width="209" height="15" />
      <rect x="0" y="25" rx="3" ry="3" width="190" height="7" />
      <rect x="200" y="25" rx="3" ry="3" width="60" height="7" />
      <rect x="270" y="25" rx="0" ry="0" width="60" height="7" />
      <rect x="340" y="25" rx="0" ry="0" width="60" height="7" />
      <rect x="0" y="40" rx="3" ry="3" width="190" height="7" />
      <rect x="200" y="40" rx="3" ry="3" width="60" height="7" />
      <rect x="270" y="40" rx="0" ry="0" width="60" height="7" />
      <rect x="340" y="40" rx="0" ry="0" width="60" height="7" />
      <rect x="0" y="55" rx="3" ry="3" width="190" height="7" />
      <rect x="200" y="55" rx="3" ry="3" width="60" height="7" />
      <rect x="270" y="55" rx="0" ry="0" width="60" height="7" />
      <rect x="340" y="55" rx="0" ry="0" width="60" height="7" />
      <rect x="0" y="70" rx="3" ry="3" width="190" height="7" />
      <rect x="200" y="70" rx="3" ry="3" width="60" height="7" />
      <rect x="270" y="70" rx="0" ry="0" width="60" height="7" />
      <rect x="340" y="70" rx="0" ry="0" width="60" height="7" />
      <rect x="0" y="85" rx="3" ry="3" width="190" height="7" />
      <rect x="200" y="85" rx="3" ry="3" width="60" height="7" />
      <rect x="270" y="85" rx="0" ry="0" width="60" height="7" />
      <rect x="340" y="85" rx="0" ry="0" width="60" height="7" />
    </ContentLoader>
  );
};

export default SubcategoryLoader;
