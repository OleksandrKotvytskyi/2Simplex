function HTMLCreator(nVariables, nRestrictions) {
    this.nVariables = nVariables;
    this.nRestrictions = nRestrictions;
    this.sAimFunc = this.createNodeWithText('div', Text.aimFunction);
    this.sAimFuncSymb = this.createNodeWithText('span', Text.funcSymbolX);

    this.goalFuncInput = document.createElement('div');
    this.goalFuncInput.setAttribute('id', 'goalInput');
}

HTMLCreator.prototype.createAimFunctionView = function (bntStartConfirm) {
    var i, j, n,
        inputElem, xElem, plusElem, subElem,
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
        xElem = this.createNodeWithText('span', Text.x);
        subElem = this.createNodeWithText('sub', i);
        plusElem = this.createNodeWithText('span', "+");

        this.goalFuncInput.appendChild(inputElem);
        this.goalFuncInput.appendChild(xElem);
        this.goalFuncInput.appendChild(subElem);

        i != this.nVariables ? this.goalFuncInput.appendChild(plusElem) : this.goalFuncInput.appendChild(arrowElem)
    }

    body.appendChild(this.goalFuncInput);

    new Logic();
};

HTMLCreator.prototype.createNodeWithText = function(sElem, sText) {
    var node = document.createElement(sElem);
    node.innerText = sText;
    return node;
};