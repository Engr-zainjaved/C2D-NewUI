import React, { SVGProps } from 'react';

const CustomAdd = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width="24px"
        height="24px"
        viewBox="0 0 25 24"
        fill="none"
        {...props}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.93359 2H18.9336C21.1427 2 22.9336 3.79086 22.9336 6V18C22.9336 20.2091 21.1427 22 18.9336 22H6.93359C4.72446 22 2.93359 20.2091 2.93359 18V6C2.93359 3.79086 4.72445 2 6.93359 2ZM12.9336 7.25C13.3478 7.25 13.6836 7.58579 13.6836 8V11.25H16.9336C17.3478 11.25 17.6836 11.5858 17.6836 12C17.6836 12.4142 17.3478 12.75 16.9336 12.75H13.6836V16C13.6836 16.4142 13.3478 16.75 12.9336 16.75C12.5194 16.75 12.1836 16.4142 12.1836 16V12.75H8.93359C8.51938 12.75 8.18359 12.4142 8.18359 12C8.18359 11.5858 8.51938 11.25 8.93359 11.25H12.1836V8C12.1836 7.58579 12.5194 7.25 12.9336 7.25Z" fill="currentColor" />
    </svg>

);

export default CustomAdd;
