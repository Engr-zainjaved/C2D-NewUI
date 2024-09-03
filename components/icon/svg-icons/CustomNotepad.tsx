import React, { SVGProps } from 'react';

const CustomNotepad = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        width="24px"
        height="24px"
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <path d="M8.93359 10.1621H16.9336M8.93359 14.1621H16.9336M8.93359 18.1621H12.9336M8.93359 4.16211C8.93359 5.26668 9.82902 6.16211 10.9336 6.16211H14.9336C16.0382 6.16211 16.9336 5.26668 16.9336 4.16211M8.93359 4.16211C8.93359 3.05754 9.82902 2.16211 10.9336 2.16211H14.9336C16.0382 2.16211 16.9336 3.05754 16.9336 4.16211M8.93359 4.16211H7.93359C5.72445 4.16211 3.93359 5.95297 3.93359 8.16211V18.1621C3.93359 20.3712 5.72445 22.1621 7.93359 22.1621H17.9336C20.1427 22.1621 21.9336 20.3712 21.9336 18.1621V8.16211C21.9336 5.95297 20.1427 4.16211 17.9336 4.16211H16.9336" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>

);

export default CustomNotepad;

