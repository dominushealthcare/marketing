(function () {
  var endpoint = window.__DOMINUS_FORM_ENDPOINT || "";

  function fieldValues(form) {
    var values = {};
    Array.prototype.slice.call(form.querySelectorAll("[data-field]")).forEach(function (field) {
      values[field.getAttribute("data-field")] = (field.value || "").trim();
    });
    return values;
  }

  function showThanks(form, message) {
    form.innerHTML = [
      '<div style="padding:48px 8px;text-align:center;">',
      '<div style="font:700 28px Manrope;color:#00ffaa;margin-bottom:12px;">Thank you</div>',
      '<div style="font:500 16px/1.5 Manrope;color:#f4f4f6;max-width:380px;margin:0 auto;">',
      message,
      "</div></div>"
    ].join("");
  }

  document.addEventListener("submit", function (event) {
    var form = event.target && event.target.closest("[data-dominus-form]");
    if (!form) return;

    event.preventDefault();

    var button = form.querySelector("[data-submit]");
    var label = button && (button.getAttribute("data-label") || button.textContent) || "Submit";
    var values = fieldValues(form);

    if (!values.name || !values.email) {
      if (button) {
        button.textContent = "Please add your name and email";
        setTimeout(function () {
          button.textContent = label;
        }, 2400);
      }
      return;
    }

    var payload = new FormData();
    payload.append("_form", form.getAttribute("data-dominus-form") || "Dominus");
    Object.keys(values).forEach(function (key) {
      payload.append(key, values[key]);
    });

    var thanksMessage = form.getAttribute("data-dominus-form") === "Partner"
      ? "Your enquiry has been received. Our business development team will respond within two working days."
      : "Your message has been received. Our team will be in touch within two working days.";

    var done = function () {
      showThanks(form, thanksMessage);
    };

    if (button) button.textContent = "Sending...";

    if (endpoint.indexOf("http") === 0) {
      fetch(endpoint, { method: "POST", mode: "no-cors", body: payload }).then(done).catch(done);
    } else {
      setTimeout(done, 400);
    }
  });

  window.__DOMINUS_FORM_READY = true;
  document.documentElement.setAttribute("data-dominus-form-ready", "true");
  document.documentElement.setAttribute("data-dominus-form-endpoint", endpoint ? "configured" : "missing");
})();
