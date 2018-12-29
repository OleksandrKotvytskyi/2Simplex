function Logic(goalFunc, matrix, freeItems) {
    var i;

    // this.goalFunc = [-1, -1, 0, 0, 0, 0];
    // this.matrix =[[0, 0, 1, -6, 1, 0], [0, 1, 0, 4/9, -1/9, 0], [1, 0, 0, 5/9, 1/9, 0], [0, 0, 0, -5/9, -1/9, 1]];
    // this.freeItems = [1, 23/9, 40/9, -4/9];

    this.goalFunc = goalFunc;
    this.matrix = matrix;
    this.freeItems = freeItems;

    this.basisIndexes = [];
    this.marks = [];
    this.goalFuncValue;

    this.convertedMatrix = [];
    this.convertedFreeItems = [];
    this.convertedMarks = [];
    this.convertedGoalFuncValue;

    for (i = 0; i < this.goalFunc.length; i++) {
        this.marks[i] = 0;
    }
}

Logic.prototype.doAlgorithm = function () {
    debugger;

    this.findBasisIndexes();
    this.calcMarks();
    this.findGoalFunctionMark();

    console.log('free items: ', this.checkFreeItems());
    console.log('marks: ', this.checkMarks());
    for(;;){
        if (!this.checkMarks()) {
            alert("Є додатні оцінки");
            break;
        }

        if (!this.checkElementsWithNegativeFreeItems() && this.checkFreeItems()) {
            alert("Навпроти від'ємного вільного члена не має від'ємних елементів");
            break;
        }

        if (!this.checkFreeItems()){
            alert("Немає від'ємних вільних членів");
            return this.getAnswer();
        }

        console.log(this.findNewBasis());
        this.doGauss();
    }
};

Logic.prototype.findGoalFunctionMark = function () {
    var i, j, mark = 0;

    for (i = 0; i < this.basisIndexes.length; i++) {
        mark += this.goalFunc[this.basisIndexes[i]] * this.freeItems[i];
    }

    this.goalFuncValue = mark;
};

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

Logic.prototype.checkElementsWithNegativeFreeItems = function () {
    var i, j,
        negativeFreeItemsIndexes = [];

    for (i = 0; i < this.freeItems.length; i++) {
        if (this.freeItems[i] < 0) {
            negativeFreeItemsIndexes.push(i);
            break;
        }
    }

    for (i = 0; i < negativeFreeItemsIndexes.length; i++) {
        for (j = 0; j < this.matrix[0].length; j++) {
            if (this.matrix[negativeFreeItemsIndexes[i]][j] < 0) {
                return true;
            }
        }
    }

    return false;
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
    col = arrayOfMinElems[0].col;

    for (i = 0; i < arrayOfMinElems.length; i++) {
        if (arrayOfMinElems[i].value < min) {
            min = arrayOfMinElems[i].value;
            col = arrayOfMinElems[i].col;
        }
    }

    this.basisIndexes[row] = col;

    return {row : row, col : col};
};

Logic.prototype.doGauss = function () {
    var i, j,
        tmpElem,
        basis = this.findNewBasis(),
        row = basis.row,
        col = basis.col,
        basisVariable = this.matrix[row][col];

    this.freeItems[row] /= basisVariable;

    for (i = 0; i < this.matrix[0].length; i++) {
        this.matrix[row][i] /= basisVariable;
    }

    for (i = 0; i < this.matrix.length; i++) {
        if (i !== row) {
            tmpElem = this.matrix[i][col];
            for (j = 0; j < this.matrix[0].length; j++) {
                this.matrix[i][j] = math.number(math.add(math.fraction(this.matrix[i][j]), math.fraction((this.matrix[row][j] * (-1)) * tmpElem)));
            }

            this.freeItems[i] = math.number(math.add(math.fraction(this.freeItems[i]), math.fraction((this.freeItems[row] * (-1)) * tmpElem)));
        }
    }

    tmpElem = this.marks[col];

    for (j = 0; j < this.marks.length; j++) {
        this.marks[j] = math.number(math.add(math.fraction(this.marks[j]), math.fraction((this.matrix[row][j] * (-1)) * tmpElem)));
    }

    this.goalFuncValue = math.number(math.add(math.fraction(this.goalFuncValue), math.fraction((this.freeItems[row] * (-1)) * tmpElem)));

    this.convertToFraction();

};

Logic.prototype.convertToFraction = function () {
    var i, j, fraction, fractionString,
        tmpArray = [];

    function getFraction(array) {
        var tmpArray = [];

        for (j = 0; j < array.length; j++) {
            fraction = math.fraction(array[j]);

            if (fraction.n === 0) {
                fractionString = "0";
            } else if (fraction.d === 1) {
                fractionString = fraction.n.toString();
            } else {
                fractionString = fraction.n.toString() + "/" + fraction.d.toString();
            }

            (fraction.s === -1) ? tmpArray.push("-" + fractionString) : tmpArray.push(fractionString);
        }

        return tmpArray;
    }

    for (i = 0; i < this.matrix.length; i++) {
        this.convertedMatrix[i] = getFraction(this.matrix[i]);
    }

    this.convertedFreeItems = getFraction(this.freeItems);
    this.convertedMarks = getFraction(this.marks);
    this.convertedGoalFuncValue = getFraction([this.goalFuncValue])[0];

    console.log(this.convertedMatrix, this.convertedFreeItems, this.convertedMarks, this.convertedGoalFuncValue);
    this.convertedMatrix = [];
};

Logic.prototype.getAnswer = function () {
    var i, j,
        answer = {},
        goalFuncAnswerIndexes = [];
    answer.coords = [];
    for (i = 0; i < this.goalFunc.length; i++) {
        if (this.goalFunc[i] !== 0) {
            goalFuncAnswerIndexes.push(i);
        }
    }

    for (i = 0; i < this.basisIndexes.length; i++) {
        for (j = 0; j < goalFuncAnswerIndexes.length; j++) {
            if (this.basisIndexes[i] === goalFuncAnswerIndexes[j]) {
                answer.coords.push(this.convertedFreeItems[i]);
            }
        }
    }

    answer.value = this.convertedGoalFuncValue;

    return answer;
};