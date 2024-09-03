export { default as DateDivider } from './DateDivider';
export { default as HistoryItem } from './HistoryItem';
export { default as HistoryItemStage } from './HistoryItemStage';

import React, { ReactNode } from 'react';

const HistoryWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className='history-wrapper d-flex flex-column'>
            {children}
        </div>
    )
}

export default HistoryWrapper
