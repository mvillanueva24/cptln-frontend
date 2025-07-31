import React from "react"
import ContentLoader from "react-content-loader"

const EbookLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={256}
    height={320}
    viewBox="0 0 256 320"
    backgroundColor="#d6d6d6"
    foregroundColor="#c2c2c2"
    {...props}
  >
    <rect x="0" y="72" rx="0" ry="0" width="256" height="250" /> 
    <rect x="16" y="8" rx="0" ry="0" width="220" height="13" /> 
    <rect x="18" y="32" rx="0" ry="0" width="212" height="29" />
  </ContentLoader>
)

export default EbookLoader

