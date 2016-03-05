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
    this.scope;
    //keep track for use with visibilitychange event.
    this.active = false;
    this.stackedTimeouts = [];
    this.waiting = function waiting (  str, scope, property, reps ) {
      if( !! this.active ) return false;
      this.active = true;
      var reps = reps || 'infinite', timeout;
      this.scope = scope;
      this.property = property;
      timeout = $timeout(function(){
        if( this.elipsis.length <= 3 && !! reps ) {
          this.elipsis += '.'
        }
        else {
          this.elipsis = ' ';
          if( typeof reps === 'number') reps--;
        }
        scope[property] = str + this.elipsis;
        if( reps === 'infinite' || reps > 0  ) {
          this.active = false;
          this.waiting( str, scope, property, reps);
        }
        else {
          this.kill();
        }
      }.bind(this), 1000);
      this.stackedTimeouts.push(timeout);
    }.bind(this);

    this.kill = function( str ) {
      this.stackedTimeouts.forEach(function(d){
        $timeout.cancel(d);
      });

      this.stackedTimeouts = [];
      
      if( !! str )  {
        this.scope[this.property] = str;
      }
      this.active = false;
    };
  }])
