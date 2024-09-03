import React, { SVGProps } from 'react';

const CustomPin = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width="24px"
        height="24px"
        viewBox="0 0 25 24"
        fill="none"
        {...props}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7764 18.4696C13.5889 18.4696 18.2764 13.3013 18.2764 9.2103C18.2764 5.1193 14.9185 1.80289 10.7764 1.80289C6.63423 1.80289 3.27637 5.1193 3.27637 9.2103C3.27637 13.3013 7.96387 18.4696 10.7764 18.4696ZM10.7764 11.8029C12.1571 11.8029 13.2764 10.6836 13.2764 9.30289C13.2764 7.92218 12.1571 6.80289 10.7764 6.80289C9.39566 6.80289 8.27637 7.92218 8.27637 9.30289C8.27637 10.6836 9.39566 11.8029 10.7764 11.8029Z" fill="currentColor" />
    </svg>

);

export default CustomPin;
