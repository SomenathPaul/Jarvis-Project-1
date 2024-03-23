// Check if Battery Status API is supported
if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
      // Update battery status
      function updateBatteryStatus() {
        document.getElementById('battery').textContent = Math.round(battery.level * 100) + '%';
        document.getElementById('charging-status').innerHTML = battery.charging ? '<i class="fa-solid fa-charging-station icon"></i>' : '<i class="fa-solid fa-battery-half icon"></i>';
      }

      // Initial call to update battery status
      updateBatteryStatus();

      // Update battery status whenever it changes
      battery.addEventListener('levelchange', updateBatteryStatus);
      battery.addEventListener('chargingchange', updateBatteryStatus);
    });
  } else {
    document.getElementById('battery-info').innerHTML = '<p>Battery information not supported.</p>';
  }





// Chech Network Status
function updateNetworkStatus() {
    var statusElement = document.getElementById('internet');
    var fa_wifi = document.getElementById('netStatus');
    if (navigator.onLine) {
      statusElement.textContent = 'Online';
      fa_wifi.innerHTML = '<i class="fa-solid fa-wifi icon network"></i>';
    } else {
      statusElement.textContent = 'Offline'; 
      fa_wifi.innerHTML = '<i class="fa-solid fa-wifi icon"></i>';
    }
  }

  // Initial call to update network status
  updateNetworkStatus();

  // Update network status whenever it changes
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);




// Get Active Time 
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour clock, so 0 should be 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  }

  function updateSystemTime() {
    var currentTime = new Date();
    var formattedTime = formatAMPM(currentTime);
    document.getElementById('time').textContent = formattedTime;
  }

  // Initial call to update system time
  updateSystemTime();

  // Update system time every second
  setInterval(updateSystemTime, 1000);