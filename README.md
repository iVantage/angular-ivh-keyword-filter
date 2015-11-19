
# ivh.smartFilter

[![Build Status](https://secure.travis-ci.org/iVantage/angular-ivh-smart-filter.png?branch=master)](https://travis-ci.org/iVantage/angular-ivh-smart-filter)

> Convert generic filter strings to smarter filter objects.

```javascript
ivhSmartFilter('to:foo@bar.com subject:"hello world" wowza pants');
// {
//   $: 'wowza pants',
//   to: 'foo@bar.com',
//   subject: 'hello world'
// }
```

## Installation

Install with bower:

```
bower install --save angular-ivh-smart-filter
```


## Usage

Add this module as a dependency to your app:

```
angular.module('myApp', ['ivh.smartFilter']);
```

Then simply inject `ivhSmartFilter`:

```javascript
angular.module('myApp').controller('MyCtrl', function(ivhSmartFilter) {
  this.filterObj = ivhSmartFilter('to:foo@bar.com subject:"hello world" wowza pants');
  // filterObj can be passed to filterFilter in your view for smart filtering
});
```


## Testing

Use `npm test` to run the full suite of linting, style checks, and unit tests.

Or, run each individually:

- Use `grunt jshint` for linting
- Use `grunt jscs` for coding style checks
- Use `grunt jasmine` to unit tests

For ease of development the `grunt watch` task will run each of the above as
needed when you make changes to source files.


## Changelog

- 2015-11-19 v0.1.0 Initial release


## License

MIT
