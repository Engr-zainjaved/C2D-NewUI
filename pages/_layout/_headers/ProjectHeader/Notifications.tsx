import { useState } from 'react';
import Button from '../../../../components/bootstrap/Button';
import OffCanvas, {
    OffCanvasBody,
    OffCanvasHeader,
    OffCanvasTitle,
} from '../../../../components/bootstrap/OffCanvas';
import ListItem from '../../../../views/Notifications/ListItem';

const Notifications = () => {
    const [notification, setNotification] = useState(false);

    return (
        <>
            <Button
                color='primary'
                isLink
                rounded={'circle'}
                className="p-0"
                style={{ minWidth: 'unset' }}
                onClick={() => setNotification(true)}
            >
                <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1564 28.0002H28.7108C30.5392 28.0002 31.5828 26.1611 30.4858 24.8724C30.0002 24.3018 29.7009 23.6251 29.6203 22.9155L29.4563 21.47C29.2848 21.4898 29.1103 21.5 28.9335 21.5C26.4483 21.5 24.4335 19.4853 24.4335 17C24.4335 16.0291 24.741 15.1301 25.2639 14.3949C25.2438 14.3878 25.2237 14.3808 25.2035 14.3739V14.2702C25.2035 13.0165 24.1873 12.0002 22.9336 12.0002C21.6799 12.0002 20.6636 13.0165 20.6636 14.2702V14.3739C18.5213 15.1074 16.9352 16.8509 16.6941 18.9754L16.2469 22.9155C16.1663 23.6251 15.867 24.3018 15.3814 24.8724C14.2844 26.1611 15.328 28.0002 17.1564 28.0002ZM31.9336 17C31.9336 18.6569 30.5904 20 28.9336 20C27.2767 20 25.9336 18.6569 25.9336 17C25.9336 15.3431 27.2767 14 28.9336 14C30.5904 14 31.9336 15.3431 31.9336 17ZM22.9336 32.0002C24.2901 32.0002 25.4483 31.1995 25.9057 30.0718C25.9248 30.0247 25.9336 29.9742 25.9336 29.9235C25.9336 29.6896 25.744 29.5 25.5101 29.5H20.3571C20.1232 29.5 19.9336 29.6896 19.9336 29.9235C19.9336 29.9742 19.9424 30.0247 19.9615 30.0718C20.4189 31.1995 21.5771 32.0002 22.9336 32.0002Z" fill="#28303F" />
                    <path d="M31.9336 17.0391C31.9336 18.6959 30.5904 20.0391 28.9336 20.0391C27.2767 20.0391 25.9336 18.6959 25.9336 17.0391C25.9336 15.3822 27.2767 14.0391 28.9336 14.0391C30.5904 14.0391 31.9336 15.3822 31.9336 17.0391Z" fill="#F35421" />
                </svg>
            </Button>

            <OffCanvas
                id='notifications'
                titleId='notificationsLabel'
                isOpen={notification}
                setOpen={setNotification}
                isBackdrop={true}
                isBodyScroll={true}
                placement={'end'}
            >
                <OffCanvasHeader className='notifications-header'>
                    <OffCanvasTitle id='notificationsLabel'>
                        Notifications
                        <Button
                            isLink
                            className='ms-auto c2d-btn-link'
                            onClick={() => setNotification(false)}
                        >
                            Mark all as read
                        </Button>
                    </OffCanvasTitle>
                </OffCanvasHeader>
                <OffCanvasBody className="notifications-body">
                    <div className="d-flex flex-column gap-3">
                        <ListItem
                            variant='alert'
                            title='Backup Ready'
                            time='3 Min Ago'
                        >
                            Your manual backup is ready, It well be kept for 7 days.
                        </ListItem>
                        <ListItem
                            variant='info'
                            isUnread={true}
                            title='Backup Ready'
                            time='3 Min Ago'
                        >
                            Your manual backup is ready, It well be kept for 7 days.
                        </ListItem>
                        <ListItem
                            variant='success'
                            isUnread={true}
                            title='Backup Ready'
                            time='3 Min Ago'
                        >
                            Your manual backup is ready, It well be kept for 7 days.
                        </ListItem>
                    </div>
                </OffCanvasBody>
            </OffCanvas>
        </>
    )
}

export default Notifications
