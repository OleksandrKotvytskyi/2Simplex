function Logic() {
    var i;

    this.goalFunc = [6, 8, 1, 1, 0, 0];
    this.matrix = [[-1, -2, 1, 0, 1, 0], [2, 1, 1, 1, 0, -1]];
    //this.matrix = [[-1, 1, 1, 0, 0], [3, 0, -2, 1, 0], [1, 0, 3, 0, 1]];
    this.freeItems = [-3, 2, 2];
    this.basisIndexes = [];
    this.marks = [];

    for (i = 0; i < this.goalFunc.length; i++) {
        this.marks[i] = 0;
    }

    this.findBasisIndexes();
    this.calcMarks();
    console.log('free items: ', this.checkFreeItems());
    console.log('marks: ', this.checkMarks());
    if (this.checkFreeItems() && this.checkMarks()) {
        this.findNewBasis();
    } else {
        alert("Оцінки додатні або немає від'ємних вільних членів");
    }
}

Logic.prototype.calcMarks = function () {
    var i, j, n, m;

    for (i = 0, n = this.matrix[0].length; i < n; i++) {
        for (j = 0, m = this.matrix.length; j < m; j++) {
            this.marks[i] += this.matrix[j][i] * this.goalFunc[this.basisIndexes[j]];
        }
        this.marks[i] -= this.goalFunc[i]
    }
};

Logic.prototype.findBasisIndexes = function () {
    var i, j, k, n, m, l,
        bFound = true;

    for (i = 0, n = this.matrix.length; i < n; i++) {
        for (j = 0, m = this.matrix[0].length; j < m; j++) {
            bFound = true;
            if (this.matrix[i][j] === 1) {
                for (k = 0, l = this.matrix.length; k < l; k++) {
                    if (this.matrix[k][j] !== 0 && k !== i) bFound = false;
                }

                if (bFound) {
                    this.basisIndexes.push(j);
                }
            }
        }
    }

    console.log('Basis indexes: ', this.basisIndexes);

    if (this.basisIndexes.length !== this.matrix.length) {
        alert("Не знайдено базисних змінних!");
    }
};

Logic.prototype.checkFreeItems = function () {
    var i,
        bFreeItems = false;

    for (i = 0; i < this.freeItems.length; i++) {
        if (this.freeItems[i] < 0) {
            bFreeItems = true;
            break;
        }
    }

    return bFreeItems;
};

Logic.prototype.checkMarks = function () {
    var i,
        bMarks = true;

    for (i = 0; i < this.marks.length; i++) {
        if (this.marks[i] > 0) {
            bMarks = false;
            break;
        }
    }

    return bMarks;
};

Logic.prototype.findNewBasis = function () {
    var i, j,
        row, col, arrayOfMinElems = [], oValueToPush = [], min;

    for (i = 0; i < this.freeItems.length; i++) {
        if (Math.min.apply(Math, this.freeItems) === this.freeItems[i]) {
            row = i;
        }
    }

    for (i = 0; i < this.marks.length; i++) {
        if (this.marks[i] <= 0 && this.matrix[row][i] < 0) {
            oValueToPush = {col : i, value : this.marks[i] / this.matrix[row][i]};
            arrayOfMinElems.push(oValueToPush);
        }
    }

    min = arrayOfMinElems[0].value;

    for (i = 0; i < arrayOfMinElems.length; i++) {
        if (arrayOfMinElems[i].value < min) {
            min = arrayOfMinElems[i].value;
            col = arrayOfMinElems[i].col;
        }
    }

    return {row : row, col : col};
};
