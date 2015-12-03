
describe('Service: ivhSmartFilter', function() {
  'use strict';

  beforeEach(module('ivh.smartFilter'));

  var ivhSmartFilter;

  beforeEach(inject(function(_ivhSmartFilter_) {
    ivhSmartFilter = _ivhSmartFilter_;
  }));

  it('should return an empty object when given an empty string', function() {
    var actual = ivhSmartFilter('');
    expect(actual).toEqual({});
  });

  it('should return an empty object when given null', function() {
    var actual = ivhSmartFilter(null);
    expect(actual).toEqual({});
  });

  it('should return an empty object when given undefined', function() {
    var actual = ivhSmartFilter(undefined);
    expect(actual).toEqual({});
  });

  it('should put unqualified terms under $', function() {
    var actual = ivhSmartFilter('foo bar');
    expect(actual).toEqual({$: 'foo bar'});
  });

  it('should put qualified terms under properties of the same name', function() {
    var actual = ivhSmartFilter('foo:bar');
    expect(actual).toEqual({foo: 'bar'});
  });

  it('should allow quoting qualified terms', function() {
    var actual = ivhSmartFilter('foo:"bar us"');
    expect(actual).toEqual({foo: 'bar us'});

    actual = ivhSmartFilter('foo:\'bar us\'');
    expect(actual).toEqual({foo: 'bar us'});
  });

  it('should let you escape quotes in quoted qualified terms', function() {
    var actual = ivhSmartFilter('foo:"bar\\"wowza"');
    expect(actual).toEqual({foo: 'bar"wowza'});
  });

  it('should collapse unqualified terms split by a qualified term', function() {
    var actual = ivhSmartFilter('wow foo:bar za');
    expect(actual).toEqual({
      $: 'wow za',
      foo: 'bar'
    });
  });

  it('should take a list of allowed qualified terms', function() {
    var actual = ivhSmartFilter('foo:bar to:justin', {keywords: ['to']});
    expect(actual).toEqual({
      $: 'foo:bar',
      to: 'justin'
    });
  });
});
