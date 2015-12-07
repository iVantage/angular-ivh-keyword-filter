
describe('Service: ivhKeywordFilter', function() {
  'use strict';

  beforeEach(module('ivh.keywordFilter'));

  var ivhKeywordFilter;

  beforeEach(inject(function(_ivhKeywordFilter_) {
    ivhKeywordFilter = _ivhKeywordFilter_;
  }));

  it('should return an empty object when given an empty string', function() {
    var actual = ivhKeywordFilter('');
    expect(actual).toEqual({});
  });

  it('should return an empty object when given null', function() {
    var actual = ivhKeywordFilter(null);
    expect(actual).toEqual({});
  });

  it('should return an empty object when given undefined', function() {
    var actual = ivhKeywordFilter(undefined);
    expect(actual).toEqual({});
  });

  it('should put unqualified terms under $', function() {
    var actual = ivhKeywordFilter('foo bar');
    expect(actual).toEqual({$: 'foo bar'});
  });

  it('should put qualified terms under properties of the same name', function() {
    var actual = ivhKeywordFilter('foo:bar');
    expect(actual).toEqual({foo: 'bar'});
  });

  it('should allow quoting qualified terms', function() {
    var actual = ivhKeywordFilter('foo:"bar us"');
    expect(actual).toEqual({foo: 'bar us'});

    actual = ivhKeywordFilter('foo:\'bar us\'');
    expect(actual).toEqual({foo: 'bar us'});
  });

  it('should let you escape quotes in quoted qualified terms', function() {
    var actual = ivhKeywordFilter('foo:"bar\\"wowza"');
    expect(actual).toEqual({foo: 'bar"wowza'});
  });

  it('should collapse unqualified terms split by a qualified term', function() {
    var actual = ivhKeywordFilter('wow foo:bar za');
    expect(actual).toEqual({
      $: 'wow za',
      foo: 'bar'
    });
  });

  it('should take a list of allowed qualified terms', function() {
    var actual = ivhKeywordFilter('foo:bar to:justin', {keywords: ['to']});
    expect(actual).toEqual({
      $: 'foo:bar',
      to: 'justin'
    });
  });

  it('should take a map of qualified term aliases', function() {
    var actual = ivhKeywordFilter('foo:bar to:justin', {aliases: {
      'foo': 'wowza'
    }});
    expect(actual).toEqual({
      wowza: 'bar',
      to: 'justin'
    });
  });

  it('should use resolved aliases to determine if a term is allowed', function() {
    var actual = ivhKeywordFilter('foo:bar to:justin', {
      keywords: ['wowza'],
      aliases: {
        'foo': 'wowza'
      }
    });
    expect(actual).toEqual({
      $: 'to:justin',
      wowza: 'bar',
    });
  });

  it('should qualifer flags after the fist in a single word', function() {
    var actual = ivhKeywordFilter('foo:bar:blargus');
    expect(actual).toEqual({
      foo: 'bar:blargus'
    });
  });
});
