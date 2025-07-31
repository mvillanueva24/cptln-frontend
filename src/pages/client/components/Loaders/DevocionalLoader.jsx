import React from "react"
import ContentLoader from "react-content-loader"

const DevocionalLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={290}
    height={180}
    viewBox="0 0 290 180"
    backgroundColor="#dedede"
    foregroundColor="#c2c2c2"
    {...props}
    className="self-center"
  >
    <rect x="21" y="248" rx="3" ry="3" width="63" height="9" /> 
    <rect x="21" y="209" rx="3" ry="3" width="218" height="22" /> 
    <rect x="20" y="274" rx="0" ry="0" width="246" height="12" /> 
    <rect x="21" y="301" rx="0" ry="0" width="246" height="12" /> 
    <rect x="21" y="325" rx="0" ry="0" width="246" height="12" /> 
    <rect x="21" y="352" rx="0" ry="0" width="246" height="12" /> 
    <rect x="20" y="376" rx="0" ry="0" width="246" height="12" /> 
    <rect x="13" y="43" rx="0" ry="0" width="257" height="27" /> 
    <rect x="-7" y="1" rx="0" ry="0" width="296" height="26" /> 
    <rect x="16" y="82" rx="0" ry="0" width="250" height="10" /> 
    <rect x="17" y="102" rx="0" ry="0" width="250" height="10" /> 
    <rect x="17" y="127" rx="0" ry="0" width="250" height="8" /> 
    <rect x="214" y="151" rx="0" ry="0" width="53" height="13" />
  </ContentLoader>
)

export default DevocionalLoader

