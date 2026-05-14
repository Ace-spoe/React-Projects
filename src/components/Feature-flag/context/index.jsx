import { createContext, useEffect, useState } from "react"


export const FeatureFlagsContext = createContext(null);
const FeatureFlagsGlobalState = ({children}) => {
  return (
    <FeatureFlagsContext.Provider value={{}}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export default FeatureFlagsGlobalState;