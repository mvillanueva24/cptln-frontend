import React from "react"
import ContentLoader from "react-content-loader"

const HomeProgramsLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={620}
    height={300}
    viewBox="0 0 620 300"
    backgroundColor="#e3e3e3"
    foregroundColor="#cac9c9"
    {...props}
  >
    <rect x="-24" y="-101" rx="0" ry="0" width="637" height="326" /> 
    <rect x="52" y="242" rx="0" ry="0" width="121" height="12" /> 
    <rect x="28" y="263" rx="0" ry="0" width="178" height="27" />
  </ContentLoader>
)

export default HomeProgramsLoader
