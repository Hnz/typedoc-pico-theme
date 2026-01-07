import type { Application } from "typedoc";
import { Theme } from "./theme.js";

/**
 * Called by TypeDoc when loading this theme as a plugin
 */
export function load(app: Application) {
    app.renderer.defineTheme("typedoc-pico-theme", Theme);

    app.on("bootstrapEnd", () => {
        if (
            app.options.isSet("theme") &&
            app.options.getValue("theme") !== "typedoc-pico-theme"
        ) {
            return app.logger.warn(
                `The theme 'typedoc-pico-theme' is not used because another theme (${app.options.getValue("theme")}) was specified!`,
            );
        }

        app.options.setValue("theme", "typedoc-pico-theme");

        if (!app.options.isSet("lightHighlightTheme")) {
            app.options.setValue("lightHighlightTheme", "one-light");
        }

        if (!app.options.isSet("darkHighlightTheme")) {
            app.options.setValue("darkHighlightTheme", "tokyo-night");
        }
    });
}
