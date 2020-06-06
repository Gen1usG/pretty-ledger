import React from 'react';
import {SVG} from './styleComopents/SVG';

let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('icons', true, /\.svg$/));} catch (error) {console.log(error);}

type Props = {
  name:string
}
function Icon(props:Props) {
  return (
    <SVG>
      <use xlinkHref={'#'+props.name}/>
    </SVG>
  )
}

export { Icon }