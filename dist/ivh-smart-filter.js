
/**
 * Main module declaration for ivh.smartFilter
 *
 * @package ivh.smartFilter
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.smartFilter', []);


/**
 * Angular filter wrapper for the ivhSmartFilter service
 *
 * @package ivh.smartFilter
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.smartFilter')
  .filter('ivhSmartFilter', ['filterFilter', 'ivhSmartFilter', function(filterFilter, ivhSmartFilter) {
    'use strict';
    return function(a, s) {
      return filterFilter(a, ivhSmartFilter(s));
    };
  }]);



/**
 * Convert a generic filter string to a smart filter object
 *
 * @package ivh.smartFilter
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.smartFilter')
  .factory('ivhSmartFilter', function() {
    'use strict';

    var isEscapeChar = function(c) {
      return c === '\\';
    };

    var isQuoteFlag = function(c, f) {
      return f ? c === f : c === '"' || c === '\'';
    };

    var isWhiteSpace = function(c) {
      return ' \t\n\r\v'.indexOf(c) > -1;
    };

    var isQualifierFlag = function(c) {
      return c === ':';
    };

    return function(str) {
      if(!str) { return {}; }
      var c = 0 // Current char
        , filter = {}
        , $words = [] // List of free words, i.e. stuff for $
        , $word = '' // Current word candidate
        , qualifier = ''
        , quoteFlag = ''
        , escaped = false;

      // Nom nom nom
      while(str.length) {
        c = str.charAt(0);
        str = str.substr(1);
        if(escaped) {
          $word += c;
          escaped = false;

        } else if(isEscapeChar(c)) {
          escaped = true;

        } else if(qualifier && isQuoteFlag(c, quoteFlag)) {
          if(quoteFlag) {
            filter[qualifier] = $word;
            qualifier = '';
            $word = '';
            quoteFlag = '';
          } else {
            quoteFlag = c;
          }

        } else if(!quoteFlag && isQualifierFlag(c)) {
          if(qualifier) {
            filter[qualifier] = $word;
            qualifier = '';
          } else {
            qualifier = $word;
          }
          $word = '';

        } else if(!quoteFlag && isWhiteSpace(c)) {
          if(!qualifier) {
            if($word.length) {
              $words.push($word);
            }
          } else {
            filter[qualifier] = $word;
            qualifier = '';
          }
          $word = '';

        } else {
          $word += c;
        }
      }

      if($word) {
        if(qualifier) {
          filter[qualifier] = $word;
          qualifier = '';
        } else {
          $words.push($word);
        }
        $word = '';
      }

      if($words.length) {
        filter.$ = $words.join(' ');
      }

      return filter;
    };
  });
