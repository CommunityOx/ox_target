import { fetchNui } from "./fetchNui.js";

const optionsWrapper = document.getElementById("options-wrapper");

function onClick() {
  // when nuifocus is disabled after a click, the hover event is never released
  this.style.pointerEvents = "none";

  // Send the unique id as the 4th element
  fetchNui("select", [this.targetType, this.targetId, this.zoneId, this.optionId]);
  // is there a better way to handle this? probably
  setTimeout(() => (this.style.pointerEvents = "auto"), 100);
}

export function createOptions(type, data, id, zoneId) {
  if (data.hide) return;

  const option = document.createElement("div");
  const iconElement = `<i class="fa-fw ${data.icon} option-icon" ${
    data.iconColor ? `style = color:${data.iconColor} !important` : null
  }"></i>`;

  option.innerHTML = `${iconElement}<p class="option-label">${data.label}</p>`;
  option.className = "option-container";
  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;
  option.optionId = data.id; // Pass the unique id from Lua

  option.addEventListener("click", onClick);
  optionsWrapper.appendChild(option);
}