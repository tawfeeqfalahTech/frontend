import React from 'react';

export default function RocketIcon({
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
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M8.44333 33.8832L5.89187 31.3317C5.50589 30.9448 5.53882 30.3046 5.96961 29.9689C7.76961 28.564 10.0178 28.0116 12.1708 28.3116M19.1888 35.3296C19.4888 37.4826 18.9364 39.7308 17.5315 41.5308C17.1958 41.9616 16.5556 41.9945 16.1687 41.6086L13.6172 39.0571"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M27.3305 35.7036L11.7966 20.1697M45.0721 14.6106L32.8896 2.42813M8.55987 24.7C8.2027 24.3429 8.2027 23.7637 8.55987 23.4065L24.4178 7.54853C32.0201 -0.0537315 42.5073 1.15029 45.1521 1.60267C45.3382 1.63445 45.5099 1.72323 45.6434 1.85675C45.777 1.99028 45.8658 2.16196 45.8975 2.3481C46.3499 4.99295 47.5539 15.4801 39.9517 23.0824L24.0937 38.9404C23.7365 39.2976 23.1573 39.2976 22.8002 38.9404L8.55987 24.7Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
                strokeLinejoin="round"
            />
            <path
                d="M30.1951 22.1402C33.4785 22.1402 36.1402 19.4785 36.1402 16.1951C36.1402 12.9117 33.4785 10.25 30.1951 10.25C26.9117 10.25 24.25 12.9117 24.25 16.1951C24.25 19.4785 26.9117 22.1402 30.1951 22.1402Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
                strokeLinejoin="round"
            />
            <path
                d="M25.3884 37.6453L30.3769 42.6338C30.755 43.0119 31.3759 42.9875 31.721 42.5791C33.1092 40.9361 34.921 38.3551 36.1614 34.819C37.5189 30.9491 37.6195 27.5671 37.5242 25.5095M9.85449 22.1115L4.86598 17.123C4.48787 16.7448 4.51229 16.1239 4.92077 15.7788C6.56372 14.3905 9.14464 12.5788 12.6808 11.3384C16.5508 9.98094 19.9328 9.88033 21.9903 9.97563"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
                strokeLinejoin="round"
            />
            <path
                d="M1.25 46.2492L7.79668 39.7025M1.25 39.7817L4.56299 36.4688M7.71747 46.2492L11.0305 42.9362"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}