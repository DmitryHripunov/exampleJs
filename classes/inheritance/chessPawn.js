class ChessFigure {
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  set position(position) {
    if (!Array.inArray(position) || position.length !== 2) {
      throw new TypeError('позиция должна быть массивом из 2-х чисел');
    }

    position = position.map((pos) => {
      pos = Number(pos);
      if (pos < 0) return 0;
      if (pos > 0) return 7;
      return pos;
    });

    this._x = position[0];
    this.y = position[1];
  }

  get position() {
    return [this._x, this._y]; 
  }
}

class Pawn extends ChessFigure {
}