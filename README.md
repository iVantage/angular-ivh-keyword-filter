
# ivh.keywordFilter

[![Build Status](https://secure.travis-ci.org/iVantage/angular-ivh-keyword-filter.png?branch=master)](https://travis-ci.org/iVantage/angular-ivh-keyword-filter)

> Convert generic filter strings to smarter filter objects.

```javascript
ivhKeywordFilter('to:foo@bar.com subject:"hello world" wowza pants');
// {
//   $: 'wowza pants',
//   to: 'foo@bar.com',
//   subject: 'hello world'
// }
```

## Installation

Install with bower:

```
bower install --save angular-ivh-keyword-filter
```


## Usage

Add this module as a dependency to your app:

```
angular.module('myApp', ['ivh.keywordFilter']);
```

Then simply inject `ivhKeywordFilter`:

```javascript
// Note, the injected name below is not a typo :). There is both a service and
// filter named `ivhKeywordFilter`. Inject `ivhKeywordFilterFilter` to get the
// actual filter.
angular.module('myApp').controller('MyCtrl', function(ivhKeywordFilter) {
  this.filterObj = ivhKeywordFilter('to:foo@bar.com subject:"hello world" wowza pants');
  // filterObj can be passed to filterFilter in your view for smart filtering
});
```

Or use the actual filter version in your views:

```html
<ul>
  <li ng-repeat="messsage in myEmails | ivhKeywordFilter:'to:me receipts'">
    <!-- do stuff with message -->
  </li>
</ul>
```

### Options

#### Allowed Keywords

The `ivhKeywordFilter` service (and corresponding filter) accept an options object
as its second paramenter.

You may supply a list of filter keywords you want to recognize:

```javascript
var opts = {
  keywords: ['to']
};

ivhKeywordFilter('to:foo@bar.com subject:"hello world" wowza pants', opts);
// {
//   $: 'subject:"hello world" wowza pants',
//   to: 'foo@bar.com'
// }
```

#### Keyword Aliases

You may also provide keyword aliases with your options:

```javascript
var opts = {
  aliases: {
    subject: 'emailSubject'
  }
};

ivhKeywordFilter('to:foo@bar.com subject:"hello world" wowza pants', opts);
// {
//   $: 'wowza pants',
//   emailSubject: 'hello world',
//   to: 'foo@bar.com'
// }
```

Note that aliases will be resolved before checking allowed keywords.


## Testing

Use `npm test` to run the full suite of linting, style checks, and unit tests.

Or, run each individually:

- Use `grunt jshint` for linting
- Use `grunt jscs` for coding style checks
- Use `grunt jasmine` to unit tests

For ease of development the `grunt watch` task will run each of the above as
needed when you make changes to source files.


## Changelog

- 2015-12-03 v0.4.0 Add ability to provide a keyword alias map
- 2015-12-03 v0.3.0 Add ability to specify accepted keywords
- 2015-11-19 v0.1.0 Initial release


## License

MIT
