'use strict';

let find = Room.prototype.find;
Room.prototype.find = function(c, opt) {
  if(_.isArray(c)) {
    return _(c)
      .map(x => find.call(this,x,opt))
      .flatten()
      .value();
  } else
    return find.apply(this, arguments);
};