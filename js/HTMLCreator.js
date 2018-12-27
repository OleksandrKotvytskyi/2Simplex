function HTMLCreator(nVariables, nRestrictions) {
    this.nVariables = nVariables;
    this.nRestrictions = nRestrictions;
    this.sAimFunc = this.createNodeWithText('div', Text.aimFunction);
    this.sAimFuncSymb = this.createNodeWithText('span', Text.funcSymbolX);

    this.goalFuncInput = document.createElement('div');
    this.goalFuncInput.setAttribute('id', 'goalInput');

    this.goalRestrictionsInput = document.createElement('div');
    this.goalRestrictionsInput.setAttribute('id', 'restrictionsInput');
}

HTMLCreator.prototype.createAimFunctionView = function (bntStartConfirm) {
    var i, j, n,
        inputElem, xElem, plusElem, subElem, minElem,
        arrowElem = this.createNodeWithText('span', Text.arrow),
        body = document.body;

    arrowElem.setAttribute('class', 'arrow');

    if (bntStartConfirm) {
        bntStartConfirm.disabled = true;
    }

    this.sAimFuncSymb.setAttribute('class', 'fxSymbol');
    this.goalFuncInput.appendChild(this.sAimFunc);
    this.goalFuncInput.appendChild(this.sAimFuncSymb);

    for (i = 1; i <= +this.nVariables; i++) {
        inputElem = document.createElement('input');
        inputElem.setAttribute('type', 'text');
        inputElem.setAttribute('id', i.toString());
        xElem = this.createNodeWithText('span', Text.x);
        subElem = this.createNodeWithText('sub', i);
        plusElem = this.createNodeWithText('span', "+");
        minElem = this.createNodeWithText('span', "min");

        this.goalFuncInput.appendChild(inputElem);
        this.goalFuncInput.appendChild(xElem);
        this.goalFuncInput.appendChild(subElem);

        if (i != this.nVariables) {
            this.goalFuncInput.appendChild(plusElem)
        } else {
            this.goalFuncInput.appendChild(arrowElem);
            this.goalFuncInput.appendChild(minElem);
        }
    }

    body.appendChild(this.goalFuncInput);
    this.createRestrictionsView();
    //console.log(math.number(math.fraction('7/22')));
    //new Logic();
};

HTMLCreator.prototype.createRestrictionsView = function () {
    var i, j, inputElem, xElem, plusElem, subElem, equalElem, brElem,
        body = document.body,
        btnStart = document.createElement('button');

    btnStart.setAttribute('id', 'btnStart');
    btnStart.innerHTML = 'Start';

    for (i = 1; i <= +this.nRestrictions; i++) {
        for (j = 1; j <= +this.nVariables; j++) {
            inputElem = document.createElement('input');
            inputElem.setAttribute('type', 'text');
            inputElem.setAttribute('id', (i-1).toString() + (j-1).toString());
            xElem = this.createNodeWithText('span', Text.x);
            subElem = this.createNodeWithText('sub', j);
            plusElem = this.createNodeWithText('span', "+");
            equalElem = this.createNodeWithText('span', "=");

            this.goalRestrictionsInput.appendChild(inputElem);
            this.goalRestrictionsInput.appendChild(xElem);
            this.goalRestrictionsInput.appendChild(subElem);

            if (j != this.nVariables) {
                this.goalRestrictionsInput.appendChild(plusElem)
            } else {
                this.goalRestrictionsInput.appendChild(equalElem);
                inputElem = document.createElement('input');
                inputElem.setAttribute('type', 'text');
                inputElem.setAttribute('id', 'f'+i.toString());
                this.goalRestrictionsInput.appendChild(inputElem);
            }

        }
        brElem = document.createElement('br');
        this.goalRestrictionsInput.appendChild(brElem);
    }

    body.appendChild(this.goalRestrictionsInput);
    body.appendChild(btnStart);

    btnStart.addEventListener('click', this.onStartClick.bind(this));
};

HTMLCreator.prototype.onStartClick = function (e) {
    var i, j, k, childNode, fraction, logic, answer,
        goalFunc = [], freeItems = [], matrix = [], tmpArr = [],
        goalFuncInput = document.getElementById('goalInput'),
        restrictionsInput = document.getElementById('restrictionsInput');
    //this.disabled = true;
    for (j = 0; j < this.nRestrictions; j++) {

        for (k = 0; k < this.nVariables; k++) {
            tmpArr.push(0);
        }
        matrix.push(tmpArr);
        tmpArr = [];
    }

    for (i = 0; i < goalFuncInput.childNodes.length; i++) {
        childNode = goalFuncInput.childNodes[i];
        if (childNode.id) {
            // fraction = math.fraction(document.getElementById(childNode.id).value);
            // goalFunc.push(fraction.n/fraction.d * fraction.s);
            goalFunc.push(math.number(document.getElementById(childNode.id).value));
        }
    }

    for (i = 0; i < restrictionsInput.childNodes.length; i++) {
        childNode = restrictionsInput.childNodes[i];
        if (childNode.id) {
            //goalFunc.push(math.number(document.getElementById(childNode.id).value));
            if (childNode.id[0] === 'f') {
                fraction = math.fraction(document.getElementById(childNode.id).value);
                freeItems.push(fraction.n/fraction.d * fraction.s);
            } else {
                //debugger;
                fraction = math.fraction(document.getElementById(childNode.id).value);
                matrix[childNode.id[0]][childNode.id[1]] = fraction.n/fraction.d * fraction.s;
            }
        }
    }

    logic = new Logic(goalFunc, matrix, freeItems);
    answer = logic.doAlgorithm();
    alert("Значення функції цілі : " + answer.value + " Точка: " + answer.coords.toString());
};

HTMLCreator.prototype.createNodeWithText = function(sElem, sText) {
    var node = document.createElement(sElem);
    node.innerText = sText;
    return node;
};