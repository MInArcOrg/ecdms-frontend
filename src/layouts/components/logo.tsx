// React Imports
import React from 'react';
import type { SVGAttributes } from 'react';
import { useTheme } from '@mui/material/styles';

const Logo = (props: SVGAttributes<SVGElement>) => {
  const theme = useTheme();

  return (
    <svg viewBox="0 0 850.4 850.4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <style type="text/css">
        {`
          .st0{opacity:0.98;fill:${theme.palette.primary.main};}
          .st1{fill:${theme.palette.primary.main};}
        `}
      </style>
      <polygon className="st0" points="571.7,119.1 136.4,119.1 28,273.8 672.3,273.8" />
      <rect x="138" y="310.6" className="st0" width="168.3" height="441.2" />
      <path className="st1" d="M533.5,310.6H322.6l267.8,288.3l-215.5,0v152.9h321.7c95.7,0,145.1-114.4,79.4-184.1L533.5,310.6z" />
    </svg>
  );
};

export default Logo;
