
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

