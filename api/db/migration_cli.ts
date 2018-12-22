import { migrate, reset } from "./migrate";

const args = process.argv;
if (args.includes("--migrate")) {
  migrate();
} else if (args.includes("--reset")) {
  reset();
}
