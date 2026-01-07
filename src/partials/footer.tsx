import { JSX } from "typedoc";
import type { ThemeContext } from "../themecontext.js";

export function footer(context: ThemeContext) {
    return (
        <footer>
            {context.hook("footer.begin", context)}
            {generatorDisplay(context)}
            {customFooterDisplay(context)}
            {context.hook("footer.end", context)}
        </footer>
    );
}

function generatorDisplay(context: ThemeContext) {
    if (context.options.getValue("hideGenerator")) {
        return <></>;
    }

    return (
        <p class="tsd-generator">
            {"Generated using "}
            <a href="https://typedoc.org/" target="_blank">
                TypeDoc
            </a>
            {" with "}
            <a href="https://github.com/hnz/typedoc-pico-theme" target="_blank">
                typedoc-pico-theme
            </a>
        </p>
    );
}

function customFooterDisplay(context: ThemeContext) {
    const customFooterHtml = context.options.getValue("customFooterHtml");

    if (!customFooterHtml) {
        return <></>;
    }

    if (context.options.getValue("customFooterHtmlDisableWrapper")) {
        return <JSX.Raw html={customFooterHtml} />;
    }

    return (
        <p>
            <JSX.Raw html={customFooterHtml} />
        </p>
    );
}
