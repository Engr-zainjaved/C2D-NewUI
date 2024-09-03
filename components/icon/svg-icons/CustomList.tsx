import React, { SVGProps } from 'react';

const CustomList = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width="24px"
        height="24px"
        viewBox="0 0 25 24"
        fill="none"
        {...props}>
        <rect x="2.93359" y="2" width="20" height="4" rx="2" fill="currentColor" />
        <rect x="2.93359" y="10" width="20" height="4" rx="2" fill="currentColor" />
        <rect x="2.93359" y="18" width="20" height="4" rx="2" fill="currentColor" />
    </svg>

);

export default CustomList;
