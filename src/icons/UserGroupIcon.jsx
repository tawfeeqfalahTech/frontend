import React from 'react';

export default function CustomUsersIcon({
    size = 24,
    color = "currentColor",
    strokeWidth = 2.5,
    className = "",
    ...props
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M17.1748 20.3813C16.9873 20.3625 16.7623 20.3625 16.5561 20.3813C12.0936 20.2313 8.5498 16.575 8.5498 12.075C8.5498 7.48125 12.2623 3.75 16.8748 3.75C21.4686 3.75 25.1998 7.48125 25.1998 12.075C25.1811 16.575 21.6373 20.2313 17.1748 20.3813Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M30.7687 7.5C34.4062 7.5 37.3312 10.4438 37.3312 14.0625C37.3312 17.6062 34.5187 20.4937 31.0124 20.625C30.8624 20.6063 30.6937 20.6063 30.5249 20.625"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.8001 27.3C3.2626 30.3375 3.2626 35.2875 7.8001 38.3062C12.9563 41.7562 21.4126 41.7562 26.5688 38.3062C31.1063 35.2687 31.1063 30.3188 26.5688 27.3C21.4313 23.8688 12.9751 23.8688 7.8001 27.3Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M34.3877 37.5C35.7377 37.2187 37.0127 36.675 38.0627 35.8687C40.9877 33.675 40.9877 30.0562 38.0627 27.8625C37.0314 27.075 35.7752 26.55 34.4439 26.25"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}