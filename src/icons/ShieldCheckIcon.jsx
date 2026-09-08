export default function ShieldCheckIcon({
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
                d="M19.6686 4.18203L10.3123 7.70703C8.15605 8.51328 6.39355 11.0633 6.39355 13.3508V27.282C6.39355 29.4945 7.85605 32.4008 9.6373 33.732L17.6998 39.7508C20.3436 41.7383 24.6936 41.7383 27.3373 39.7508L35.3998 33.732C37.1811 32.4008 38.6436 29.4945 38.6436 27.282V13.3508C38.6436 11.0445 36.8811 8.49453 34.7248 7.68828L25.3686 4.18203C23.7748 3.60078 21.2248 3.60078 19.6686 4.18203Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.9688 22.2566L19.9875 25.2754L28.05 17.2129"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}