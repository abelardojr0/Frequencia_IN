export default function responsivo(breakpoints: string) {
  return `@media (max-width: ${breakpoints})`;
}
export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1080px",
};
