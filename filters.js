  .filter('truncate', function(){
    return function(str,len){
      var l = len;
      var elipsis = '...';
      if( ! str ) return  '';
      return str.substr(0,l) + elipsis;
    };
  })

  .filter('decimalizePrice', function(){
    return function(price) {
      var
        f = price.search(/\./)
      ;
      if( f >= 0 && f == ( price.length - 2) ) {
        return price + '0';
      }
      else if( f < 1 ) {
        return price + '.00';
      }
      return price;
    }
  })

  .service('ANIMATE', ['$timeout', function($timeout){
    this.elipsis = ' ';
    this.waiting = function waiting (  str, scope, property, reps ) {
      var reps = reps || 'infinite';
      this.timeout = $timeout(function(){
        if( this.elipsis.length <= 3 && !! reps ) {
          this.elipsis += '.'
        }
        else {
          this.elipsis = ' ';
          if( typeof reps === 'number') reps--;
        }
        scope[property] = str + this.elipsis;
        if( reps === 'infinite' || reps > 0  ) {
         this.waiting( str, scope, property, reps);
        }
        else {
          $timeout.cancel( this.timeout );
        }
      }.bind(this), 500);
    }.bind(this);
  }])
