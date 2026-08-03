function update_date_clock(){
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const day_options = { weekday: 'long' };
    const date_options = { day: 'numeric', month: 'long', year: 'numeric' };

    document.getElementById('day').textContent = now.toLocaleDateString('en-US', day_options);
    document.getElementById('calendar').textContent = now.toLocaleDateString('en-US', date_options);
    
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

update_date_clock();

setInterval(update_date_clock, 1000);
