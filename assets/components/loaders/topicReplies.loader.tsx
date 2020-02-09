import React, { SFC } from "react";
import ContentLoader from "react-content-loader";

export interface Props { }

const TopicRepliesLoader: SFC<Props> = () => {
    return (
        <ContentLoader
            height={250}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#c0c0c0"
        >
            <rect x="8" y="10" rx="3" ry="3" width="693" height="70" />
            <rect x="8" y="90" rx="3" ry="3" width="693" height="70" />
            <rect x="8" y="170" rx="3" ry="3" width="693" height="70" />
        </ContentLoader>
    );
};

export default TopicRepliesLoader;
