import React, { SVGProps } from 'react';

const CustomDownload = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width="24px"
        height="24px"
        viewBox="0 0 25 24"
        fill="none"
        {...props}>
        <g clip-path="url(#clip0_496_41046)">
            <path d="M19.9336 9.91602H15.9336V3.91602H9.93359V9.91602H5.93359L12.9336 16.916L19.9336 9.91602ZM5.93359 18.916V20.916H19.9336V18.916H5.93359Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_496_41046">
                <rect width="24" height="24" fill="currentColor" transform="translate(0.933594 0.916016)" />
            </clipPath>
        </defs>
    </svg>

);

export default CustomDownload;