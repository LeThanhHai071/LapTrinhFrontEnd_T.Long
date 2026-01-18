export const getUserIdFromStorage = () => {
    const userRaw = localStorage.getItem("user");
    if (!userRaw) return null;

    try {
        const user = JSON.parse(userRaw);
        return user.id || user._id;
    } catch (error) {
        console.error("Lỗi đọc localStorage:", error);
        return null;
    }
};