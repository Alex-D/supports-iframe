# Supports Iframe

A simple API to check if a URL can be loaded inside an iframe.


## How it works?

Takes a URL like: http://localhost:3000/{URL}
Example: <http://localhost:3000/https://example.com>

And checks if the URL follow those rules:

- response status must be a 2xx
- response headers does not contain `x-frame-options` set to `SAMEORIGIN` nor `DENY`

You can try it there:

- not a 2xx: <https://supports-iframe.herokuapp.com/https://column-view.alex-d.fr/404>
- can be loaded: <https://supports-iframe.herokuapp.com/https://monitoror.com>
- cannot be loaded: <https://supports-iframe.herokuapp.com/https://google.com>


## See it in action

This project is used by [Column View](https://column-view.alex-d.fr), a tool that helps you view the mobile version of your website directly in multiple columns or helps you check multiple pages at once.


## Author

<table>
<tbody>
  <tr width="100%">
    <td align="center" width="100%">
      <a href="https://github.com/Alex-D">
        <img src="https://avatars2.githubusercontent.com/u/426843?s=150&v=4" alt=""><br>
        @Alex-D
      </a> <br>
      <strong>Alexandre Demode</strong><br>
      <em>Development</em><br>
      &bull; &bull; &bull;<br>
      https://twitter.com/AlexandreDemode
    </td>
  </tr>
</tbody>
</table>


## License

This project is licensed under the MIT License - see [the LICENSE file](LICENSE) for details.