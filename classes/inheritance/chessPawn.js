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

  move() {};
}

class Pawn extends ChessFigure {
  constructor(x, color) {
    const pos = [x, color === 'white' ? 1 : 6];
    super(pos, color);
  }

  move() {
    const move = this.color === 'white' ? 1 : -1;
    this.position = [this.position[0], this.position[1] + move];
    super.move()
  }
}

const pownWhite = new Pawn(1, 'white');
const pownBlack = new Pawn(1, 'black');

