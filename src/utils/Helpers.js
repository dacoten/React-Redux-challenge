export function formatDateTimeMM_DD_YY(dateTimeString) {
    const date = new Date(dateTimeString);
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + date.getDate() + ', ' + year;
}

export function timeSince(dateString) {
    const date = new Date(dateString);

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval > 0) {
        return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
        return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
        return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
        return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 0) {
        return interval + " minutes ago";
    }

    return Math.floor(seconds) + " seconds";
}

export function formatHourAndMinute(dateString) {
    const date = new Date(dateString);
    return date.getHours() + ':' + date.getMinutes();
}