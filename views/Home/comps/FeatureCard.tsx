import React, { FC } from 'react';
import Image from 'next/image';

interface TFeatureCard {
    src: string,
    title: string,
    description: string
}

const FeatureCard: FC<TFeatureCard> = ({
    src,
    title,
    description
}) => {
    return (
        <div className="feature-card rounded-2 w-100 h-100 d-flex flex-column align-items-center text-center">
            <Image
                src={src}
                alt={title}
                width={120}
                height={120}
                className="card-icon ratio-1x1"
            />
            <h4 className='mx-0 mt-auto p-0'>{title}</h4>
            <p className='m-0 p-0'>{description}</p>
        </div>
    )
}

export default FeatureCard
