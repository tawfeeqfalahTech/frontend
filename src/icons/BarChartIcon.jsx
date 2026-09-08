export default function BarChartIcon({
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
                d="M5.625 41.25H39.375"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.5 15.7129H7.5C6.46875 15.7129 5.625 16.5566 5.625 17.5879V33.7504C5.625 34.7816 6.46875 35.6254 7.5 35.6254H10.5C11.5312 35.6254 12.375 34.7816 12.375 33.7504V17.5879C12.375 16.5566 11.5312 15.7129 10.5 15.7129Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M24 9.73047H21C19.9687 9.73047 19.125 10.5742 19.125 11.6055V33.7492C19.125 34.7805 19.9687 35.6242 21 35.6242H24C25.0312 35.6242 25.875 34.7805 25.875 33.7492V11.6055C25.875 10.5742 25.0312 9.73047 24 9.73047Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M37.5 3.75H34.5C33.4687 3.75 32.625 4.59375 32.625 5.625V33.75C32.625 34.7813 33.4687 35.625 34.5 35.625H37.5C38.5312 35.625 39.375 34.7813 39.375 33.75V5.625C39.375 4.59375 38.5312 3.75 37.5 3.75Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}