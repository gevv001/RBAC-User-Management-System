function UserAvatar({ avatarId, size = 80, alt = "User avatar", className = "" }) {
    const avatarUrl = avatarId
        ? `http://localhost:3000/photos/${avatarId}`
        : "/default-avatar.jpg";

    return (
        <img
            src={avatarUrl}
            alt={alt}
            width={size}
            height={size}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            className={className}
        />
    );
}

export default UserAvatar;
