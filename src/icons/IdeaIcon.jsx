export default function IdeaIcon({
    size = 24,
    color = "currentColor",
    strokeWidth = 3.5,
    className = "",
    ...props
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M22.4793 48.859V45.7173C16.2501 41.9527 11.1313 34.6131 11.1313 26.8131C11.1313 13.4069 23.4543 2.89855 37.3312 5.93189C43.4959 7.28605 48.8584 11.3486 51.648 16.9548C57.3084 28.3298 51.3501 40.409 42.6022 45.6902V48.8319C42.6022 49.6173 42.9001 51.4319 40.0022 51.4319H25.0793C22.1001 51.459 22.4793 50.2944 22.4793 48.859Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M23.021 59.584C29.2231 57.8236 35.7772 57.8236 41.9793 59.584"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}