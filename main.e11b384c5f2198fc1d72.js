(() => {
  "use strict";
  var e = "todos";
  function t() {
    var t = sessionStorage.getItem(e);
    return t ? JSON.parse(t) : [];
  }
  var o = function (o) {
    var n = o.name,
      s = o.isCompleted,
      i = document.createElement("li");
    i.classList.add("todo-item"),
      s && i.classList.toggle("todo-item_completed");
    var d = document.createElement("span");
    (d.innerText = n), d.classList.add("todo-text"), i.appendChild(d);
    var r = document.createElement("button");
    (r.innerHTML = '<i class="fas fa-check"></i>'),
      r.classList.add("todo-check-button"),
      r.addEventListener(
        "click",
        (function (o) {
          return function (n) {
            n.preventDefault(),
              o.classList.toggle("todo-item_completed"),
              (function (o) {
                var n = t(),
                  s = Array.from(o.childNodes).find(function (e) {
                    return e.classList.contains("todo-text");
                  });
                if (s) {
                  var i = n.map(function (e) {
                    return (
                      (e.isCompleted =
                        e.name == s.innerText ? !e.isCompleted : e.isCompleted),
                      e
                    );
                  });
                  sessionStorage.setItem(e, JSON.stringify(i));
                }
              })(o);
          };
        })(i)
      ),
      i.appendChild(r);
    var a = document.createElement("button");
    return (
      (a.innerHTML = '<i class="fas fa-trash"></i>'),
      a.classList.add("todo-remove-button"),
      a.addEventListener(
        "click",
        (function (o) {
          return function (n) {
            n.preventDefault(),
              o.classList.add("todo-item_fall"),
              o.addEventListener("transitionend", function () {
                !(function (o) {
                  var n = t();
                  n.length ||
                    (document.querySelector(".todo-select").disabled = !0);
                  var s = Array.from(o.childNodes).find(function (e) {
                    return e.classList.contains("todo-text");
                  });
                  if (s) {
                    var i = n.filter(function (e) {
                      return e.name !== s.innerText;
                    });
                    sessionStorage.setItem(e, JSON.stringify(i));
                  }
                })(o),
                  o.remove();
              });
          };
        })(i)
      ),
      i.appendChild(a),
      i
    );
  };
  function n(e) {
    return {
      todoInput: e.querySelector(".todo-input"),
      todoHelper: e.querySelector(".todo-helper"),
      todoButton: e.querySelector(".todo-button"),
    };
  }
  function s(e) {
    var t = n(e),
      o = t.todoInput,
      s = t.todoHelper,
      i = t.todoButton;
    o.value.length >= 3
      ? (i.classList.remove("todo-button_disabled"),
        s.classList.remove("todo-helper_visible"))
      : (i.classList.add("todo-button_disabled"),
        s.classList.add("todo-helper_visible"));
  }
  var i = document.querySelector(".todo-input-wrapper"),
    d = n(i),
    r = d.todoInput,
    a = d.todoButton,
    l = document.querySelector(".todo-list"),
    c = document.querySelector(".todo-select"),
    u = i.querySelector(".todo-helper");
  document.addEventListener("DOMContentLoaded", function () {
    JSON.parse(sessionStorage.getItem("todos")).forEach(function (e) {
      var t = o(e);
      l.appendChild(t);
    }),
      t().length || (c.disabled = !0),
      s(i);
  }),
    r.addEventListener("input", function () {
      return s(i);
    }),
    a.addEventListener("click", function (s) {
      s.preventDefault();
      var d,
        a,
        u = { name: r.value, isCompleted: !1 };
      (c.disabled = !1),
        (d = u),
        (a = t()).push(d),
        sessionStorage.setItem(e, JSON.stringify(a));
      var p = o(u);
      l.appendChild(p),
        (function (e) {
          var t = n(e),
            o = t.todoInput,
            s = t.todoHelper,
            i = t.todoButton;
          (o.value = ""),
            i.classList.add("todo-button_disabled"),
            s.classList.add("todo-helper_visible");
        })(i);
    }),
    c.addEventListener("change", function (e) {
      var t = l.childNodes;
      console.log(e.target.value),
        (function (e, t) {
          e.length &&
            e.forEach(function (e) {
              switch (t) {
                case "completed":
                  e.classList.contains("todo-item_completed")
                    ? (e.style.display = "flex")
                    : (e.style.display = "none");
                  break;
                case "uncompleted":
                  e.classList.contains("todo-item_completed")
                    ? (e.style.display = "none")
                    : (e.style.display = "flex");
                  break;
                default:
                  return void (e.style.display = "flex");
              }
            });
        })(t, e.target.value);
    }),
    (r.onblur = function () {
      u.innerHTML = "";
    }),
    (r.onfocus = function () {
      u.innerHTML = "Minimum length is 3 characters";
    }),
    r.addEventListener("keypress", function (e) {
      return (function (e, t) {
        "Enter" === e.key && t.value.length < 3 && e.preventDefault();
      })(e, r);
    }),
    r.checkValidity() ||
      (document.querySelector(".todo-helper").innerHTML = r.validationMessage);
})();
