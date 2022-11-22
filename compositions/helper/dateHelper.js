export default function dateFormatter(dateText) {
    const date = new Date(dateText);
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
}