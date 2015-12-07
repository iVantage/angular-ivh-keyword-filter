
describe('Filter: ivhKeywordFilter', function() {
  'use strict';

  beforeEach(module('ivh.keywordFilter'));

  it('should filterFilter a collection with the ivhKeywordFilter return value', function() {
    var spy = jasmine.createSpy('ivhKeywordFilter').and.returnValue('snap')
      , spy2 = jasmine.createSpy('filterFilter').and.returnValue('hooray');

    module(function($provide) {
      $provide.value('ivhKeywordFilter', spy);
      $provide.value('filterFilter', spy2);
    });
    var ivhKeywordFilterFilter;
    inject(function(_ivhKeywordFilterFilter_) {
      ivhKeywordFilterFilter = _ivhKeywordFilterFilter_;
    });
    var a = [{label: 'foo'}]
      , s = 'I am a foo!'
      , o = {}
      , v = ivhKeywordFilterFilter(a, s, o);
    expect(spy).toHaveBeenCalledWith(s, o);
    expect(spy2).toHaveBeenCalledWith(a, 'snap');
    expect(v).toEqual('hooray');
  });
});

