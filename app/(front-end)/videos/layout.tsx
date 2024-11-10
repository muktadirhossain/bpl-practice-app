import { ReactNode } from "react";

const VideoLayout = ({ children }: { children: ReactNode }) => {
  return <section className="mx-auto p-5">{children}</section>;
};

export default VideoLayout;
