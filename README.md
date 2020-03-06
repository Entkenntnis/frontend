# How to frontend

Welcome to the new serlo.org frontend. Read this document to get started it.

## Installation

Clone the repo, install dependencies and start the dev server:

```
git clone https://github.com/serlo/frontend.git
cd frontend
yarn
yarn dev
```

Now visit `localhost:3000` in the browser.

## Pages

Every route is mapped to an individual file in the `pages` folder. `_app.js` and `_document.js` are special pages for next.js to setup the environment. You can map dynamic routes to pages using `[]`-brackets.

Creating a new page is as easy as this:

```tsx
// helloworld.tsx

export default function HelloWorld(props) {
  return <p>Welcome to the frontend!</p>
}
```

## Typescript

Use Typescript and JSX for your components. Type-checking is not strict, so start prototyping without types and add them later when interfaces stabilize. The code is type-checked, even in development. Look at `tsconfig.json` to inspect typescript options.

## Data fetching

Your page needs data? Use getInitialProps to populate your component. Write the fetcher isomorphic: it should run on the server and the client, because we are doing ssr:

```tsx
import fetch from 'isomorphic-unfetch'

export default function Content(props) {
  return <p>JSON.stringify(props.data)</p>
}

Content.getInitialProps = async () => {
  const url = `https://somedomain.org/1234`
  const res = await fetch(url)
  return { data: res.json() }
}
```

The return value of `getInitialProps` is passed to the page and then you can access the data.

## Styling (the good way)

We approach styling through styled components. Styles are attached to components directly, not using selectors anymore. This will force to think a little bit differently about how to structure your code:

```tsx
import styled from 'styled-components'

export default function HelloWorld(props) {
  return (
    <Container>
      <Block>Hello World!</Block>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Block = styled.div`
  width: 10rem;
  text-align: center;
  background-color: lightblue;
  font-size: 30px;
`
```

This will lead to following result:

![grafik](https://user-images.githubusercontent.com/13507950/75994301-0ad8bd00-5efb-11ea-9c20-175f54b68969.png)

More examples will follow in this guide.

## Styling (the bad, but sometimes necessary way)

You want to add some css? The most traditional approach is to import a css file:

```tsx
import '../css/example.css'

export default function HelloWorld(props) {
  return <p>Welcome to the frontend!</p>
}
```

You can also add css using the `createGlobalStyle` helper:

```tsx
import { createGlobalStyle } from 'styled-components'

export default function HelloWorld(props) {
  return <p>Welcome to the frontend!</p>
}

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: green;
  }
`
```

## Code style

We use Prettier to auto-format our code: `{"semi": false, "singleQuote": true}`.

## Assets

Everything within the `public`-folder is automatically accessible. But your images and files, fonts, ... into this directory.

## Fonts

The beautiful `Karmilla` font face is available by default. To include other fonts, you can add them as assets and reference them using css (`@font-face{...}`).

## Responsive designs

The recommend way is using media queries.

```tsx
EXAMPLE HERE
```

Onyl if you need more fine-grained control, use react-socks. You can enable components depending on the screen width or access the width directly:

```tsx
import { Breakpoint, useCurrentWidth } from 'react-socks'

export default function HelloWorld(props) {
  const width = useCurrentWidth()
  return (
    <>
      <Breakpoint small down>
        <p style={{ textAlign: 'center' }}>Mobile only!</p>
      </Breakpoint>
      <Breakpoint medium up>
        <p style={{ textAlign: 'center' }}>Bigger Screens</p>
      </Breakpoint>
      <p>Current width: {width}</p>
    </>
  )
}
```

## Dependencies

Add packages with the command `yarn add packagename` or `yarn add -D packagename`. After installing the package, change the version in the `package.json` to the lowest necessary version, e.g. `^2.0.0` or `^16.8.0`. This will improve compatibility.

The difference between normal dependencies and devDependencies is probably not crucial. Rule of thumb: If something is run on the client, than add it as normal dependencies.

## Flexbox

[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is great and can easily be written in css. Currently no library here.

## Icons

We are including Fontawesome 5 free and brand icons. Using them is straight forward:

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

export default function HelloWorld(props) {
  return (
    <StyledParagraph>
      <FontAwesomeIcon icon="coffee" />
    </StyledParagraph>
  )
}

const StyledParagraph = styled.p`
  color: brown;
  text-align: center;
`
```

Important: To reduce bundle size, we add every icon once to our library before it can be references by string. Look at `src/iconlibrary.tsx` and add the icon there:

```tsx
import { faBars, faUser, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

export function myLibrary() {
  return [faBars, faUser, faCoffee, faTwitter, faFacebook]
}
```

## Deployment

Everytime you push to the master branch or merge a pull request, the frontend is built and deployed. To build the frontend on your local machine, run

```
yarn build
yarn start
```

and access the application through `localhost:3000`. The build also gives you a nice overview of the project's size.

## Theming

You can define global css vars in our theme. This theme is available to all styled-components. Tools from polished can be used, too. Look at `src/theme.tsx` for more information.

## CSS Reset

According to this [article](https://jaydenseric.com/blog/forget-normalize-or-resets-lay-your-own-css-foundation), laying your own css foundation is doable and nowadays the preferred way. The file `globalstyles.tsx` contains our css global styles for some kind of good default without bloat.

## onclickoutside

! add example here.

## Components

? How to structure components?
