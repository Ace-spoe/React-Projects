import React from 'react'
import Accordian from './components/Accordian'
import RandomColor from './components/Random-Color'
import StarRating from './components/star-rating'
import ImageSlider from './components/Image-Slider'
import LoadMoreData from './components/Load-More-Data'
import QRCodeGenerator from './components/QR-code'
import Theme from './components/Theme'
import ScrollIndicator from './components/Scroll-indicator'
import Tabs from './components/Custom-Tabs'
import GitHub from './components/Github-profile-finder'
import AutoComplete from './components/Auto-complete'
import TTT from './components/Tic-Tac-Toe'
import FeatureFlagsGlobalState from './components/Feature-flag/context'
import TaskManager from './components/Task-Sprint-Manager'
import RickandMorty from "./components/useFetch/RickandMorty"


const App = () => {
  return (
   <main>
    <Accordian/>
    <RandomColor/>
    <StarRating/>
    <ImageSlider 
      url="https://picsum.photos/v2/list"
      limit={5}/>
    {/* <LoadMoreData
      url="https://dummyjson.com/products"
      limit={20}
      /> */}
    <QRCodeGenerator/>
    <Theme/>
    <ScrollIndicator 
    url="https://dummyjson.com/products?limit=100"/>
    <Tabs/>
    <AutoComplete/>
    <GitHub />
    <TTT/>
     {/* <FeatureFlagsGlobalState>
      <FeatureFlags/>
     </FeatureFlagsGlobalState> */}
     <TaskManager/>
     <RickandMorty/>
   </main>
  )
}

export default App