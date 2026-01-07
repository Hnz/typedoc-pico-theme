import { DefaultThemeRenderContext } from "typedoc";
import { footer } from "./partials/footer.js";

export class ThemeContext extends DefaultThemeRenderContext {
    override footer = () => footer(this);
}
