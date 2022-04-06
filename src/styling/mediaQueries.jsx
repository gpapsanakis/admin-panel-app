import facepaint from "facepaint";

const breakpoints = [768];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

export default mq;
