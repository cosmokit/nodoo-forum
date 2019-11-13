import * as React from "react";
import ContentLoader from "react-content-loader";

export interface Props {}

const SubcategoryLoader: React.SFC<Props> = () => {
  return (
    <ContentLoader
      height={160}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#c0c0c0"
    >
      <rect x="6" y="10" rx="4" ry="4" width="209" height="21" />
      <rect x="7" y="45" rx="3" ry="3" width="193" height="9" />
      <rect x="212" y="45" rx="3" ry="3" width="60" height="9" />
      <rect x="280" y="45" rx="0" ry="0" width="90" height="9" />
      <rect x="7" y="65" rx="3" ry="3" width="193" height="9" />
      <rect x="212" y="65" rx="3" ry="3" width="60" height="9" />
      <rect x="280" y="65" rx="0" ry="0" width="90" height="9" />
      <rect x="7" y="85" rx="3" ry="3" width="193" height="9" />
      <rect x="212" y="85" rx="3" ry="3" width="60" height="9" />
      <rect x="280" y="85" rx="0" ry="0" width="90" height="9" />
      <rect x="7" y="105" rx="3" ry="3" width="193" height="9" />
      <rect x="212" y="105" rx="3" ry="3" width="60" height="9" />
      <rect x="280" y="105" rx="0" ry="0" width="90" height="9" />
      <rect x="7" y="125" rx="3" ry="3" width="193" height="9" />
      <rect x="212" y="125" rx="3" ry="3" width="60" height="9" />
      <rect x="280" y="125" rx="0" ry="0" width="90" height="9" />
    </ContentLoader>
  );
};

export default SubcategoryLoader;
