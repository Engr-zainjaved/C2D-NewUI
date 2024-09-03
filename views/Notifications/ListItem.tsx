import React, { ReactNode } from 'react';

interface Props {
    title: string,
    time: string,
    children: ReactNode | string,
    variant: 'alert' | 'success' | 'info',
    isUnread?: boolean,
}

const ListItem: React.FC<Props> = ({ title, children, time, variant, isUnread }) => {
    return (
        <div className={`notification-item d-flex align-items-center ${variant ? variant : ''} ${isUnread ? 'unread' : ''}`}>
            <NotificationIcon type={variant} />
            <div className="notification-content">
                <div className="title">
                    {title}
                    <div className="time">
                        {time}
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ListItem

const NotificationIcon = ({ type }: any) => {
    switch (type) {
        case 'alert':
            return (<svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="52.7262" height="51.6233" rx="25.8117" fill="#FDDDD3" />
                <rect x="0.5" y="0.5" width="52.7262" height="51.6233" rx="25.8117" stroke="#FBCCBC" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5671 17.0492C27.8098 15.6503 25.9165 15.6503 25.1591 17.0492L16.2665 33.4757C15.5092 34.8746 16.4559 36.6233 17.9705 36.6233H35.7557C37.2704 36.6233 38.217 34.8746 37.4597 33.4757L28.5671 17.0492ZM25.6198 22.272H28.1079L27.8009 29.229H25.9263L25.6198 22.272ZM28.1069 32.2031C28.1069 32.9354 27.5503 33.529 26.8637 33.529C26.1771 33.529 25.6205 32.9354 25.6205 32.2031C25.6205 31.4709 26.1771 30.8773 26.8637 30.8773C27.5503 30.8773 28.1069 31.4709 28.1069 32.2031Z" fill="#931A25" />
            </svg>);
        case 'success':
            return (<svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.853516" width="52.7262" height="52.73" rx="26.3631" fill="#DAF2EE" />
                <rect x="0.5" y="0.853516" width="52.7262" height="52.73" rx="26.3631" stroke="#C8EBE6" />
                <path d="M16.3213 28.3391L22.6015 34.6202L37.4053 19.8164" stroke="#2A7166" stroke-width="3" />
            </svg>);
        default:
            return (<svg width="54" height="55" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1.12305" width="52.7262" height="52.73" rx="26.3631" fill="#DBE1FE" />
                <rect x="0.5" y="1.12305" width="52.7262" height="52.73" rx="26.3631" stroke="#CAD2FE" />
                <path d="M23.2138 33.9445L16.7572 27.488L23.2138 21.0314L21.2487 19.0664L12.8271 27.488L21.2487 35.9096L23.2138 33.9445ZM30.5125 33.9445L36.969 27.488L30.5125 21.0314L32.4775 19.0664L40.8991 27.488L32.4775 35.9096L30.5125 33.9445Z" fill="#37479B" />
            </svg>);
    }
}