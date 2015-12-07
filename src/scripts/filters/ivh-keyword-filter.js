
/**
 * Angular filter wrapper for the ivhKeywordFilter service
 *
 * @package ivh.keywordFilter
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.keywordFilter')
  .filter('ivhKeywordFilter', ['filterFilter', 'ivhKeywordFilter', function(filterFilter, ivhKeywordFilter) {
    'use strict';
    return function(a, s, o) {
      return filterFilter(a, ivhKeywordFilter(s, o));
    };
  }]);

