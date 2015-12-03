
describe('Filter: ivhSmartFilter', function() {
  'use strict';

  beforeEach(module('ivh.smartFilter'));

  it('should filterFilter a collection with the ivhSmartFilter return value', function() {
    var spy = jasmine.createSpy('ivhSmartFilter').and.returnValue('snap')
      , spy2 = jasmine.createSpy('filterFilter').and.returnValue('hooray');

    module(function($provide) {
      $provide.value('ivhSmartFilter', spy);
      $provide.value('filterFilter', spy2);
    });
    var ivhSmartFilterFilter;
    inject(function(_ivhSmartFilterFilter_) {
      ivhSmartFilterFilter = _ivhSmartFilterFilter_;
    });
    var a = [{label: 'foo'}]
      , s = 'I am a foo!'
      , o = {}
      , v = ivhSmartFilterFilter(a, s, o);
    expect(spy).toHaveBeenCalledWith(s, o);
    expect(spy2).toHaveBeenCalledWith(a, 'snap');
    expect(v).toEqual('hooray');
  });
});

