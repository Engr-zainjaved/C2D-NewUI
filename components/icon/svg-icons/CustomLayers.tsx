import React, { SVGProps } from 'react';

const CustomLayers = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width="24px"
        height="24px"
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <path d="M21.4336 18.4026L13.2459 22.0416C12.7287 22.2714 12.1384 22.2714 11.6213 22.0416L3.43359 18.4026M21.4336 13.4026L13.2459 17.0416C12.7287 17.2714 12.1384 17.2714 11.6213 17.0416L3.43359 13.4026M4.22245 8.29703L11.5392 11.9554C12.1022 12.2369 12.765 12.2369 13.328 11.9554L20.6447 8.29703C21.3818 7.92851 21.3818 6.8767 20.6447 6.50818L13.328 2.84982C12.765 2.56829 12.1022 2.56829 11.5392 2.84982L4.22245 6.50818C3.4854 6.8767 3.4854 7.92851 4.22245 8.29703Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

);

export default CustomLayers;