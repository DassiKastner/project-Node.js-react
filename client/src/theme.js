import { createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

const theme = createTheme({
  direction: "rtl",
});

const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [rtlPlugin],
});

const ltrCache = createCache({
  key: "mui-ltr",
});

export { theme as default, rtlCache, ltrCache };
