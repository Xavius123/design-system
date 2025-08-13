import { jsx as e } from "react/jsx-runtime";
const l = {};
function b() {
  return /* @__PURE__ */ e("div", { className: l.container, children: /* @__PURE__ */ e("h1", { children: "Welcome to ReactLib!" }) });
}
const u = ({
  variant: o = "primary",
  style: n,
  ...t
}) => {
  const a = {
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out"
  }, c = {
    background: "var(--color-light-accent-primary)",
    color: "var(--color-light-text-inverse)",
    border: "none"
  }, i = {
    background: "transparent",
    color: "var(--color-light-accent-primary)",
    border: "1px solid var(--color-light-accent-primary)"
  }, s = {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  };
  return /* @__PURE__ */ e(
    "button",
    {
      ...t,
      style: {
        ...a,
        ...o === "primary" ? c : i,
        ...n
      },
      onMouseEnter: (r) => {
        t.disabled || Object.assign(r.currentTarget.style, s);
      },
      onMouseLeave: (r) => {
        t.disabled || (r.currentTarget.style.transform = "", r.currentTarget.style.boxShadow = "");
      }
    }
  );
};
export {
  u as Button,
  b as ReactLib
};
