import React from 'react';

let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

type Props = {
  name?: string
  className?: string
  onClick?:()=>void
}

function Icon(props: Props) {
  return (
    <svg className={props.className} onClick={props.onClick}>
      <use xlinkHref={'#' + props.name}/>
    </svg>
  );
}

Icon.defaultProps = {
  className: 'icon'
};
export {Icon};