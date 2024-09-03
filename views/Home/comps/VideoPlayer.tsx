import React, { FC } from 'react';
import Icon from '../../../components/icon/Icon';

interface IVideoPlayer {
    minHeight?: number;
    height?: number;
}

const VideoPlayer: FC<IVideoPlayer> = ({ minHeight, height }) => {
    return (
        <div className={'videoWrapper'} style={{ minHeight: minHeight || 200, height: height || 20 }}>
            <button className={`palyBtn btn btn-link"]`} role='button'>
                <Icon icon='CustomPlay' color='primary' forceFamily={'custom'} />
            </button>
        </div>
    )
}

export default VideoPlayer