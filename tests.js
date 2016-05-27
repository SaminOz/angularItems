describe('TRUNCATE FILTER', function(){
  var
    $filter
  ;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it('should truncate to a provided length and add an elipsis', function(){
    var truncate = $filter('truncate');
    expect(truncate('truncate this string please', 20)).toEqual('truncate this string...');
  });

  it('should return an empty string if (no|empty) string provided', function(){
    var truncate = $filter('truncate');
    expect(truncate(null, 5)).toBeFalsy();
    expect(truncate('', 5)).toBeFalsy();
    expect(truncate(5)).toEqual('');
  })
});


describe('DECIMALIZEPRICE FILTER', function(){
  var
    $filter
  ;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it('given XXX it should return XXX.00', function(){
    var decimalizePrice = $filter('decimalizePrice');
    expect(decimalizePrice('200')).toEqual('200.00');
  });

  it('given XXX. it should return XXX.00', function(){
    var decimalizePrice = $filter('decimalizePrice');
    expect(decimalizePrice('200.')).toEqual('200.00');
  });

  it('given XXX.0 it should return XXX.00', function(){
    var decimalizePrice = $filter('decimalizePrice');
    expect(decimalizePrice('200')).toEqual('200.00');
  });

  it('if already XXX.00 it should return XXX.00', function(){
    var decimalizePrice = $filter('decimalizePrice');
    expect(decimalizePrice('200.00')).toEqual('200.00');
  });
});  

describe('PERCENTAGE FILTER', function(){
  var
    $filter
  ;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it('should return a whole number without a % or other sign (even if provided)', function(){
    var percentage = $filter('percentage');
    expect(percentage(200, '^')).toEqual('200');
  });

  it('should trim a decimal to one place and add the sign provided (default %)', function(){
    var percentage = $filter('percentage');
    expect(percentage(2.4567)).toEqual('2.4%');
    expect(percentage(2.4567, '%')).toEqual('2.4%');
    expect(percentage(2.4567, '^')).toEqual('2.4^');
  });
});

describe('TIME FILTER', function(){
  var
    $filter
  ;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it('given a timestamp should return the time in HH:MM:SS format in UTC time', function(){
    var time = $filter('time');
    expect(time(1464279478299)).toEqual('16:17:58');
  })  
});

describe('FIRSTUPPER FILTER', function(){
  var
    $filter
  ;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it('should return a word or a sentence with all first letters capitalised (except stop words)', function(){
    var firstupper = $filter('firstUpper');
    expect(firstupper('capitalise')).toEqual('Capitalise');
    //could add stop words that don't get capitalised? 
    expect(firstupper('set me to capitals', true)).toEqual('Set Me to Capitals');
    expect(firstupper()).toEqual(false);
    expect(firstupper('dont capitalise a stop word')).toEqual('Dont Capitalise a Stop Word');

  })
});
