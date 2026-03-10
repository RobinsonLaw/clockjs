var months = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Inject the datetime block into the page
document.body.insertAdjacentHTML("beforeend", `
  <div class="datetime">
    <div class="date">
      <span id="dayname">Day</span>,
      <span id="month">Month</span>
      <span id="daynum">00</span>,
      <span id="year">Year</span>
    </div>
    <div class="time">
      <span id="hour">00</span>:
      <span id="minutes">00</span>:
      <span id="seconds">00</span>
      <span id="period">AM</span>
    </div>
  </div>
`);
function updateClock(rtc){ 
  var dname = rtc.getDay(),mo = rtc.getMonth(),dnum = rtc.getDate(),
  yr = rtc.getFullYear(),hou = rtc.getHours(), min = rtc.getMinutes(), sec = rtc.getSeconds(), pe = "AM";
  if(hou >= 12){ pe = "PM";  }
  if(hou == 0){hou = 12;}
  if(hou > 12){hou = hou - 12;}
  Number.prototype.pad = function(digits){for(var n = this.toString(); n.length < digits; n = 0 + n);return n; }
  var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
  var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
  for(var i = 0; i < ids.length; i++) document.getElementById(ids[i]).firstChild.nodeValue = values[i]; 
}
function initClock(){
  var _rtc=document.getElementById("utc-time").textContent.trim();
  var now = new Date(_rtc);
  updateClock(now);
  setInterval(function(){
    now = new Date(now.getTime() + 1000);
    updateClock(now);
  }, 1000);
}
