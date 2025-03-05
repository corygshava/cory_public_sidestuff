function updateDateTime() {
    const date = new Date();

    const day = date.getDate();
    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = monthNames[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hourFormatted = (String(hours % 12)).padStart(2,'0'); // Convert to 12-hour format
    const minutesFormatted = String(minutes).padStart(2, '0');
    const secondsFormatted = String(seconds).padStart(2, '0');

    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                   (day % 10 === 2 && day !== 12) ? 'nd' :
                   (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

    document.getElementById('currentDate').textContent = `${day}${suffix}`;
    document.getElementById('currentMonth').textContent = month;
    document.getElementById('currentTime').innerHTML = `<mtxt><b>${hourFormatted}</b>:${minutesFormatted}:${secondsFormatted}</mtxt> ${ampm}`;
}

// Initial call to set the date and time
updateDateTime();

// Update the time every 500 milliseconds
setInterval(updateDateTime, 1000);
