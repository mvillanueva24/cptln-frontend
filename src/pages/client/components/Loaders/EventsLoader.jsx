import React from "react"
import ContentLoader from "react-content-loader"

const EventsLoader = (props) => (
  <div className="w-full max-w-[370px] sm:max-w-[390px]">
      <ContentLoader 
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 390 122"
      backgroundColor="#dedede"
      foregroundColor="#c2c2c2"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <rect x="21" y="248" rx="3" ry="3" width="63" height="9" /> 
      <rect x="21" y="209" rx="3" ry="3" width="218" height="22" /> 
      <rect x="20" y="274" rx="0" ry="0" width="246" height="12" /> 
      <rect x="21" y="301" rx="0" ry="0" width="246" height="12" /> 
      <rect x="21" y="325" rx="0" ry="0" width="246" height="12" /> 
      <rect x="21" y="352" rx="0" ry="0" width="246" height="12" /> 
      <rect x="20" y="376" rx="0" ry="0" width="246" height="12" /> 
      <rect x="0" y="-12" rx="0" ry="0" width="95" height="138" /> 
      <rect x="112" y="9" rx="0" ry="0" width="190" height="19" /> 
      <rect x="112" y="58" rx="0" ry="0" width="250" height="10" /> 
      <rect x="113" y="78" rx="0" ry="0" width="250" height="10" /> 
      <rect x="113" y="103" rx="0" ry="0" width="250" height="8" />
    </ContentLoader>
  </div>
)

export default EventsLoader