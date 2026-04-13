# UI Standards (example excerpt)

This is a partial example showing only the customised section. The
full `UI-STANDARDS.md` template contains universal rules for usability,
accessibility, and the design review gate — those sections remain
unchanged from the template.

---

## Token systems

One token system:

| System | Governs | Source |
| --- | --- | --- |
| **Tailwind theme** | Colours, spacing scale, typography, border radii, shadows | `tailwind.config.js` |

All design values live in the Tailwind config. Components reference
them via utility classes. Do not hard-code colour values, spacing
values, or font sizes in component files.

Custom colours are defined in `tailwind.config.js` under
`theme.extend.colors`. Use semantic names (e.g. `primary`, `surface`,
`text-muted`) rather than raw hex values in components.
