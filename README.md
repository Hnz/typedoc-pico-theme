# Theme your TypeDoc like pico

[![NPM](https://nodei.co/npm/typedoc-pico-theme.png)](https://npmjs.org/package/typedoc-pico-theme)

[TypeDoc](https://typedoc.org/) theme based on [Pico CSS](https://picocss.com).

See [example](https://hnz.github.io/typedoc-pico-theme/).

## Usage

**Install the package with your favourite package manager:**

```text
npm install typedoc-pico-theme --save-dev
```

```text
pnpm add typedoc-pico-theme --save-dev
```

```text
yarn add typedoc-pico-theme --dev
```

**Use the theme when generating your documentation:**

```text
npx typedoc src --plugin typedoc-pico-theme
```

**Or add it to your typedoc.json:**

```
{
  // ...
  "plugin": ["typedoc-plugin-mdn-links", "typedoc-pico-theme"]
}
```
