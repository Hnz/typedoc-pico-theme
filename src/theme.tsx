import { cpSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
    DefaultTheme,
    i18n,
    JSX,
    type PageEvent,
    type Reflection,
    ReflectionKind,
    type Renderer,
    RendererEvent,
} from "typedoc";
import { ThemeContext } from "./themecontext.js";

export class Theme extends DefaultTheme {
    constructor(renderer: Renderer) {
        super(renderer);

        // copy the complete assets
        renderer.on(RendererEvent.END, (event) => {
            const from = resolve(
                dirname(fileURLToPath(import.meta.url)),
                "../src/assets/",
            );
            const to = resolve(event.outputDirectory, "assets/");

            cpSync(from, to, { recursive: true });
        });

        // link the css file
        renderer.hooks.on("head.end", (event) => (
            <>
                <link
                    rel="stylesheet"
                    href={event.relativeURL("assets/typedoc-pico-theme.css")}
                />
            </>
        ));

        Object.assign(this.icons, getIcons());
    }

    getRenderContext(pageEvent: PageEvent<Reflection>) {
        return new ThemeContext(
            this.router,
            this,
            pageEvent,
            this.application.options,
        );
    }
}

function getIcons() {
    return {
        [ReflectionKind.Accessor]: () =>
            textIcon(
                "A",
                "var(--color-ts-accessor)",
                i18n.kind_accessor(),
                true,
            ),
        [ReflectionKind.CallSignature]() {
            return this[ReflectionKind.Function]();
        },
        [ReflectionKind.Class]: () =>
            textIcon("C", "var(--color-ts-class)", i18n.kind_class()),
        [ReflectionKind.Constructor]: () =>
            textIcon(
                "C",
                "var(--color-ts-constructor)",
                i18n.kind_constructor(),
                true,
            ),
        [ReflectionKind.ConstructorSignature]() {
            return this[ReflectionKind.Constructor]();
        },
        [ReflectionKind.Enum]: () =>
            textIcon("E", "var(--color-ts-enum)", i18n.kind_enum()),
        [ReflectionKind.EnumMember]: () =>
            textIcon(
                "P",
                "var(--color-ts-property)",
                i18n.kind_enum_member(),
                true,
            ),
        [ReflectionKind.Function]: () =>
            textIcon("F", "var(--color-ts-function)", i18n.kind_function()),
        [ReflectionKind.GetSignature]() {
            return this[ReflectionKind.Accessor]();
        },
        [ReflectionKind.IndexSignature]: () =>
            textIcon(
                "P",
                "var(--color-ts-property)",
                i18n.kind_index_signature(),
                true,
            ),
        [ReflectionKind.Interface]: () =>
            textIcon("I", "var(--color-ts-interface)", i18n.kind_interface()),
        [ReflectionKind.Method]: () =>
            textIcon("M", "var(--color-ts-method)", i18n.kind_method(), true),
        [ReflectionKind.Module]: () =>
            textIcon("M", "var(--color-ts-module)", i18n.kind_module()),
        [ReflectionKind.Namespace]: () =>
            textIcon("N", "var(--color-ts-namespace)", i18n.kind_namespace()),
        [ReflectionKind.Parameter]() {
            return this[ReflectionKind.Property]();
        },
        [ReflectionKind.Project]() {
            return this[ReflectionKind.Module]();
        },
        [ReflectionKind.Property]: () =>
            textIcon(
                "P",
                "var(--color-ts-property)",
                i18n.kind_property(),
                true,
            ),
        [ReflectionKind.Reference]: () =>
            textIcon(
                "R",
                "var(--color-ts-reference)",
                i18n.kind_reference(),
                true,
            ),
        [ReflectionKind.SetSignature]() {
            return this[ReflectionKind.Accessor]();
        },
        [ReflectionKind.TypeAlias]: () =>
            textIcon("T", "var(--color-ts-type-alias)", i18n.kind_type_alias()),
        [ReflectionKind.TypeLiteral]() {
            return this[ReflectionKind.TypeAlias]();
        },
        [ReflectionKind.TypeParameter]() {
            return this[ReflectionKind.TypeAlias]();
        },
        [ReflectionKind.Variable]: () =>
            textIcon("V", "var(--color-ts-variable)", i18n.kind_variable()),
        [ReflectionKind.Document]: () =>
            textIcon("D", "var(--color-document)", i18n.kind_variable()),
    };
}

const kindIcon = (
    letterPath: JSX.Element,
    color: string,
    label: string,
    _circular = false,
) => (
    <svg class="tsd-kind-icon" viewBox="0 0 24 24" aria-label={label}>
        <title>{label}</title>
        <rect
            fill={color}
            // fill="var(--color-icon-background)"
            // stroke={color}
            // stroke-width="1.5"
            x="1"
            y="1"
            width="22"
            height="22"
            rx="12" //{circular ? "12" : "6"}
        />
        {letterPath}
    </svg>
);

const textIcon = (
    letter: string,
    color: string,
    label: string,
    circular = false,
) =>
    kindIcon(
        <text
            // fill="var(--color-icon-text)"
            fill="var(--color-background-navbar)"
            x="50%"
            y="50%"
            dominant-baseline="central"
            text-anchor="middle"
            font-weight="800"
        >
            {letter}
        </text>,
        color,
        label,
        circular,
    );
