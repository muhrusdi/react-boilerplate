import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../../../client/src/containers/App'

export default () => {
  const content = renderToString(
    <App/>
  )

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
    </head>
    <body>
      <div id="app">${content}</div>
      <script type="text/babel" src="bundle.js"></script>
    </body>
    </html>
  `
  return html
}