# jQuery Slide Deck

A simple slider that slides horizontal and vertical using CSS
transitions, if the browser does not support CSS transitions it
delegates to JS animations so works in almost all browsers.

This lib uses [jquery.transit](http://ricostacruz.com/jquery.transit)
for the CSS transitions.

## Options

<table>
  <tr>
    <th>option</th>
    <th>default</th>
  </tr>
  <tr>
    <td>easing</td>
    <td>{ trasition: 'ease', animate: 'swing' }</td>
  </tr>
  <tr>
    <td>speed</td>
    <td>500</td>
  </tr>
  <tr>
    <td>zTopAbs</td>
    <td>220</td>
  </tr>
  <tr>
    <td>zTop</td>
    <td>210</td>
  </tr>
  <tr>
    <td>zQue</td>
    <td>200</td>
  </tr>
  <tr>
    <td>zBot</td>
    <td>190</td>
  </tr>
</table>

## Functions

<table>
  <tr>
    <th>function</th>
    <th>argument</th>
  </tr>
  <tr>
    <td>change</td>
    <td>id</td>
  </tr>
  <tr>
    <td>next</td>
    <td></td>
  </tr>
  <tr>
    <td>previous</td>
    <td></td>
  </tr>
</table>

## Events

<table>
  <tr>
    <th>event</th>
    <th>arguments</th>
  </tr>
  <tr>
    <td>exited</td>
    <td>event, elem, active</td>
  </tr>
  <tr>
    <td>entered</td>
    <td>event, active, elem</td>
  </tr>
  <tr>
    <td>outgoing</td>
    <td>event, elem, active</td>
  </tr>
  <tr>
    <td>incomming</td>
    <td>event, active, elem</td>
  </tr>
</table>

### TODO

The transitions need to be in que as at the moment if you navigate too
quickly you can be left with no content.

### Credits

Thanks to [tequila](http://www.tequila.com.au/) for sponsoring the build
