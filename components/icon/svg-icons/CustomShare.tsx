import React, { SVGProps } from 'react';

const CustomShare = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width="24px"
        height="24px"
        viewBox="0 0 25 24"
        fill="none"
        {...props}>
        <path d="M12 1H19V8M19 12.737V17.5C19 17.8978 18.842 18.2794 18.5607 18.5607C18.2794 18.842 17.8978 19 17.5 19H2.5C2.10218 19 1.72064 18.842 1.43934 18.5607C1.15804 18.2794 1 17.8978 1 17.5V2.5C1 2.10218 1.15804 1.72064 1.43934 1.43934C1.72064 1.15804 2.10218 1 2.5 1H7M5.5 14.5L18.55 1.45" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

);

export default CustomShare;